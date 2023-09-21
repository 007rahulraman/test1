import { Product as ProductType } from "@/utils/types"
import { useEffect, useState } from "react"
import { useRouter } from "next/router"
import 'bootstrap/dist/css/bootstrap.min.css';

export default function Product() {
  const router = useRouter()

  const [products,setProducts] = useState<ProductType[]>([])
  useEffect(()=>{
    (async()=>{

      const response = await fetch("/api/product")
      const data = await response.json()
      if(data.products && data.products.length){
        
        return setProducts(data.products.map((ele:ProductType)=>{
          return {...ele,dicountedPrice: ((100-ele.discountPercentage)*0.01*ele.price).toFixed(2)}
        }))
      }
      return setProducts([])
    })()
  },[])
  const routeToProduct = (id:number):void=>{
    router.push('/product/'+id)
    console.log(id)
  }
  return (  
    <>
      <div className="listing-section">
        {
          products.map((ele)=>{
            return <div className="product" onClick={(e)=>routeToProduct(ele.id)} >
            <div className="image-box">
              <div className="images" style={{'backgroundImage':`url(${ele.images[0]||ele.thumbnail})`}}></div>
            </div>
            <div className="text-box">
              <h2 className="item">{ele.title}</h2>
              <h3 className="price"><b>$ {ele.dicountedPrice}</b> <s>$ {ele.price}</s> </h3>
              <p className="description">{ele.description}</p>
                <button type="button" className="btn btn-primary">See Details</button>
            </div>
          </div>
          })
        }
      </div>
    </>
  )
}
