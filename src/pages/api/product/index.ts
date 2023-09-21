import { productData } from '@/utils/constant'
import type { NextApiRequest, NextApiResponse } from 'next'

 
export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<any>
) {
  res.status(200).json(productData)
}