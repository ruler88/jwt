

module.exports = function(req, res) {
	var jobs = [
		'YOLO',
		'A JOB',
		'Lots of kittens'
	];

	res.json(jobs);
};