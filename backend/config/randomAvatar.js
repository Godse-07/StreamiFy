const getRandomAvatar = () => {
  const randomNum = Math.floor(Math.random() * 100) + 1;
  return `https://avatar.iran.liara.run/public/${randomNum}`;
};

module.exports = getRandomAvatar;