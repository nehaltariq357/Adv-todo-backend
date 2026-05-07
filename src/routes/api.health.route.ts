
import {Router} from "express" 
import { healthCheck } from "../controller/api.health"
const router = Router()

router.get("/health",healthCheck)

export default router