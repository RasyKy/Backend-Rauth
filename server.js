require("dotenv").config();
const app = require("./app");

const port = process.env.PORT || 3000;

if (require.main === module) {
  app.listen(port, () => {
    console.log(`E-learning server running on http://localhost:${port}`);
    console.log("Ready to handle requests!");
  });
}
