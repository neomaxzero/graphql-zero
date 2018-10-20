const videoA = {
  id: "1",
  title: "Tonta",
  duration: 123,
  watched: false
};

const videoB = {
  id: "2",
  title: "Karina",
  duration: 234,
  watched: true
};

const videos = [videoA, videoB]

function getVideoById(id) {
  if (!id) return Promise.resolve(videos);
  return Promise.resolve(videos.filter(v => v.id !== id));
}

function createVideo({ title, duration, released }) {
  const video = { 
    id: (new Buffer(title, 'utf8')).toString('base64'),
    title,
    duration,
    released
  }
  videos.push(video);

  return video;
};

module.exports = {
  getVideoById,
  createVideo
};
