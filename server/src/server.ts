import express from "express";
import cors from "cors";
import fileUpload from "express-fileupload";
import morgan from "morgan";
import { publisher } from "./publisher";

const app = express();

const env = "dev";

app.use(cors());

app.use(
  fileUpload({
    createParentPath: true,
  })
);

app.use(morgan(env));

const port = 3001;

app.get("/", async (req, res) => {
  res.send("This is pdf-converter server.");
});

app.post("/pdf/upload", (req, res) => {
  try {
    if (!req.files) {
      res.send({
        status: false,
        message: "No file uploaded",
      });
      return;
    }

    const fileList = [];
    const result: Record<any, any> = [];

    if (!Array.isArray(req.files.data)) {
      fileList.push(req.files.data);
    } else {
      fileList.push(...req.files.data);
    }

    fileList.forEach((file) => {
      const { name, mimetype, size } = file;

      file.mv("uploads/" + name);
      publisher.send(name);
      result.push({ name, mimetype, size });
    });

    res.send({ result });
  } catch (err) {
    res.status(500).send(err);
  }
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
