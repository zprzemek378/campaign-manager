import express from "express";
import {
  createCampaign,
  getCampaigns,
  getCampaign,
  updateCampaign,
  deleteCampaign,
} from "../controllers/campaign.controller";

const router = express.Router();

router.route("/").get(getCampaigns).post(createCampaign);

router
  .route("/:id")
  .get(getCampaign)
  .put(updateCampaign)
  .delete(deleteCampaign);

export default router;
