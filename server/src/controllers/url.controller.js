import generateCode from "../utils/generateCode.js";
import urlModel from "../models/url.model.js";

const demo = (req, res) => {
  const code = generateCode();

  return res.status(200).json({
    code,
  });
};

const createUrlController = async (req, res) => {
  const { url } = req.body;

  if (!url) {
    return res.status(400).json({
      error: "Please enter a URL",
    });
  }

  if (
    url.startsWith("http://") == false &&
    url.startsWith("https://") == false
  ) {
    return res.status(400).json({
      error: "Please enter a valid URL starting with http:// or https://",
    });
  }

  if (url.length > 2048) {
    return res.status(400).json({
      error: "URL is too long",
    });
  }

  try {
    const code = generateCode();

    const newUrl = await urlModel.create({
      originalUrl: url,
      shortCode: code,
    });

    return res.status(201).json({
      message: "URL shortened successfully",
      data: {
        originalUrl: newUrl.originalUrl,
        shortCode: newUrl.shortCode,
      },
    });
  } catch (error) {
    console.log(`Error in create url controller ${error}`);

    return res.status(500).json({
      message: "Internal server error",
    });
  }
};

const getAllUrlController = async (req, res) => {
  try {
    const urls = await urlModel.find();

    return res.status(200).json({
      message: "URLs fetched successfully",
      data: urls,
    });
  } catch (error) {
    console.log(`Error in get all URL controller - ${error}`);

    return res.status(500).json({
      message: "Internal server error",
    });
  }
};

const redirectController = async (req, res) => {
  const { code } = req.params;

  const url = await urlModel.findOne({
    shortCode: code,
  });

  if (!url) {
    return res.status(404).json({
      message: "URL not found",
    });
  }

  res.redirect(302, url.originalUrl);

  await urlModel.findOneAndUpdate(
    {
      shortCode: code,
    },
    {
      $inc: { clicks: 1 },
    },
  );
};

const deleteUrlController = async (req, res) => {
  try {
    const { code } = req.params;

    if (!code) {
      return res.status(400).json({
        message: "Code invalid",
      });
    }

    const deletedUrl = await urlModel.findOneAndDelete({ shortCode: code });

    if (!deletedUrl) {
      return res.status(404).json({
        message: "URL not found",
      });
    }

    return res.status(200).json({
      message: "URL deleted successfully",
    });
  } catch (error) {
    console.log(`Error in delete url controller - ${error}`);

    return res.status(500).json({
      message: "Internal server error",
    });
  }
};

export {
  demo,
  createUrlController,
  getAllUrlController,
  redirectController,
  deleteUrlController,
};
