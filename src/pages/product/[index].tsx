import { Product as ProductType } from "@/utils/types"
import { useEffect, useState } from "react"
import { useRouter } from "next/router"
import Container from 'react-bootstrap/Container';
import Carousel from 'react-bootstrap/Carousel';
import '../../styles/product-detail.module.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import { BiSolidStarHalf, BiSolidStar, BiStar,BiArrowBack } from 'react-icons/bi';
import { BsBoxSeamFill } from 'react-icons/bs';
import { features } from "process";

export default function Product() {
  const router = useRouter()
  
  const [ratingStar, setRatingStar] = useState<string>('zero,zero,zero,zero,zero')
  const [product, setProduct] = useState<ProductType | null>(null)
  useEffect(() => {
    (async () => {
      try {
        if (!router.query.index) return;
        const response = await fetch("/api/product/" + router.query.index)
        const data: ProductType = await response.json()
        if (data.id) {
          data.dicountedPrice = Number((100 - data.discountPercentage) * 0.01 * data.price)
          manageRatingStar(data.rating||0)
          return setProduct(data)
        }
        return setProduct(null)
      } catch (error) {
        console.log(error)
      }
    })()
  }, [router.query.index])
  const manageRatingStar = (num: number) => {
    let d = []
    for (let i = 1; i <= 5; i++) {
      if (i - num >= 1) {
        d.push('zero')
      }
      else if (i - num > 0 && i - num < 1) {
        d.push('half')
      }

      else {
        d.push('full')
      }
    }
    setRatingStar(d.join(','))
  }
  return (
    <>
      <Container>
        
      <BiArrowBack size={36} onClick={(e:Event)=> router.back()}/>
        {product &&

          <section id="head">
            <div className="container">
              <div className="row">
                <div className="col-md-6">
                  <Carousel >
                    {
                      product && product.images.filter((ele:string)=>!ele.includes('thumbnail') ).map((ele: string, index: number) => {
                        return <Carousel.Item key={index}>
                          <img
                            className="d-block w-100"
                            src={ele}
                            alt="First slide"
                          />
                        </Carousel.Item>
                      })
                    }

                  </Carousel>
                </div>
                <div className="col-md-6 head-text">
                  <h6>{product.brand}</h6>
                  <h1>{product.title}</h1>
                  <p>{product.description}</p>
                  <div className="price-box">
                    
                    <div className="starting">
                      <BsBoxSeamFill size={24} color={'green'}/> &nbsp;&nbsp; {product.stock} (in-stock)
                    </div>
                    <div className="price-des">$ {product.dicountedPrice?.toFixed(2)} &nbsp; <span>  <s>$ {product.price.toFixed(2)}</s></span></div></div>
                  <div className="">
                    {
                      ratingStar.split(',').map((str) => {
                        if (str == 'zero') {
                          return <BiStar className="rating" size={24} />
                        }
                        else if (str == 'half') {
                          return <BiSolidStarHalf className="rating" size={24} fill={'yellow'} />
                        }
                        return <BiSolidStar className="rating" size={24} fill={'yellow'} />
                      })
                    }
                  </div>
                  <button className="btn btn-primary mt-2" onClick={(e)=> alert("features coming !!!!")}> Shop Now</button>
                </div>
              </div>
            </div>
          </section>
        }
      </Container>
    </>
  )
}
