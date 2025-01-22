import Layout from "@/components/Layout";
import { getGeneral } from "@/sanity/utils";
import client from "@/shopify/client";
import Link from "next/link";
import Image from "next/image";

export default function Shop({ products, general }: { products: any[], general: any }) {

  console.log(products);

  const data = [
    {
      title: "Issue 1",
      price: "10.00",
      image: "/example.png"
    },
    {
      title: "Issue 2",
      price: "10.00",
      image: "/example.png"
    },
    {
      title: "T-shirt 1",
      price: "30.00",
      image: "/example.png"
    },
  ]

  return(
    <Layout metadata={general}>
      <div className="shop">
        {products.map((item, index) => (
          <Link 
            key={index} 
            href={`/shop/${item.handle}`} 
            className="shop-item"
          >
            <Image 
              src={item.images[0].src} 
              alt={item.title} 
              className="aspect-square object-cover" 
              width={960}
              height={960}
            />
            <div className="flex justify-between mt-1 font-medium">
              <p>{item.title}</p>
              <p>€{Number(item.variants[0].price.amount).toFixed(2)}</p>
            </div>
          </Link>
        ))}
      </div>
    </Layout>
  );
}

export async function getStaticProps(context: any) {
  const { locale } = context;
  const general = await getGeneral(locale);
  const products = await client.product.fetchAll();

  return {
    props: { 
      general,
      products: JSON.parse(JSON.stringify(products))
    },
    revalidate: 60
  };
}