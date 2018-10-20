const express = require("express");

function server() {
  const PORT = process.env.PORT || 3000;

  const server = express();

  return {
    server,
    start: () =>{
      server.listen(PORT, () => {
        console.info(`Server listening on http://localhost:${PORT}/`);
      });
    }
  };
}

module.exports = server();
