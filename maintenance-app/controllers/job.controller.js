const Job = require('../models/job.model');

// CREATE - สร้างงานใหม่
exports.create = async (req, res) => {
  try {
    const job = new Job(req.body);
    const saved = await job.save();
    res.status(201).json(saved);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// READ ALL - ดูงานทั้งหมด (ไม่รวม archived)
// เรียงตาม status และ วันที่
exports.findAll = async (req, res) => {
  try {
    const { status } = req.query;
    
    let filter = { archived: false };
    
    // ถ้ามีการกรอง status
    if (status) {
      filter.status = status;
    }

    const jobs = await Job.find(filter)
      .sort({ status: 1, dateSubmitted: 1 });

    res.json(jobs);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// UPDATE ONE - อัปเดตงานชิ้นเดียว
exports.updateOne = async (req, res) => {
  try {
    const updated = await Job.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }         // คืนค่าที่อัปเดตแล้ว
    );
    res.json(updated);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// BATCH UPDATE - อัปเดต status หลายงานพร้อมกัน
exports.batchUpdate = async (req, res) => {
  try {
    const { ids, status } = req.body;
    // ids = array ของ job id
    // status = new status

    await Job.updateMany(
      { _id: { $in: ids } },
      { status: status }
    );
    res.json({ message: `Updated ${ids.length} jobs to "${status}"` });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// ARCHIVE - TRUE 
exports.archive = async (req, res) => {
  try {
    await Job.findByIdAndUpdate(
      req.params.id,
      { archived: true }
    );
    res.json({ message: 'Job archived' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};