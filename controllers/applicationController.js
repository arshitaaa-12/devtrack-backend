const Application = require('../models/Application');
const { asyncHandler } = require('../middleware/errorHandler');

exports.createApplication = asyncHandler(async (req, res) => {
  const { company, role, status, appliedDate, notes } = req.body;

  if (!company || !role) {
    return res.status(400).json({ message: 'Company and role are required' });
  }

  const application = await Application.create({
    company,
    role,
    status,
    appliedDate,
    notes,
    user: req.user._id
  });

  res.status(201).json(application);
});

exports.getApplications = asyncHandler(async (req, res) => {
  const filter = { user: req.user._id };

  if (req.query.status) filter.status = req.query.status;
  if (req.query.search) {
    filter.company = { $regex: req.query.search, $options: 'i' };
  }

  const applications = await Application.find(filter).sort({ createdAt: -1 });
  res.json(applications);
});

exports.getStats = asyncHandler(async (req, res) => {
  const stats = await Application.aggregate([
    { $match: { user: req.user._id } },
    { $group: { _id: '$status', count: { $sum: 1 } } }
  ]);

  const result = { Applied: 0, Interview: 0, Offer: 0, Rejected: 0 };
  stats.forEach(s => { result[s._id] = s.count; });
  result.total = Object.values(result).reduce((a, b) => a + b, 0);

  res.json(result);
});

exports.getApplication = asyncHandler(async (req, res) => {
  const application = await Application.findOne({
    _id: req.params.id,
    user: req.user._id
  });

  if (!application) {
    return res.status(404).json({ message: 'Application not found' });
  }

  res.json(application);
});

exports.updateApplication = asyncHandler(async (req, res) => {
  const application = await Application.findOneAndUpdate(
    { _id: req.params.id, user: req.user._id },
    req.body,
    { new: true, runValidators: true }
  );

  if (!application) {
    return res.status(404).json({ message: 'Application not found' });
  }

  res.json(application);
});

exports.deleteApplication = asyncHandler(async (req, res) => {
  const application = await Application.findOneAndDelete({
    _id: req.params.id,
    user: req.user._id
  });

  if (!application) {
    return res.status(404).json({ message: 'Application not found' });
  }

  res.json({ message: 'Application deleted' });
});