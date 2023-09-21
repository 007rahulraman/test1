import { productData } from '@/utils/constant'
import type { NextApiRequest, NextApiResponse } from 'next'
 
export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<any>
) {
  const id:number  = Number(req.query.index||0)
  const products = productData.products

  res.status(200).json(products.find((ele)=> ele.id ==id))
}