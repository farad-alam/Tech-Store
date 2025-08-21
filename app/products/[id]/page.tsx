import { Footer } from "@/components/footer";
import { Navbar } from "@/components/navbar";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { getProduct } from "@/lib/products";
import { ArrowLeft, Shield, Star, Truck } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

// export async function generateStaticParams() {
//   const products = getProducts(); // or fetch from API/DB
//   console.log(products);
//   return [{ id: "1" }, { id: "2" }, { id: "3" }];
// }

// export async function generateStaticParams() {
//   const products = await getProducts(); // call the function
//   // map to the format Next.js expects
//   return products.map((p) => ({ id: p.id }));
// }

// export default async function ProductDetailPage({
//   params,
// }: {
//   params: { id: string };
// }) {
//   const product = await getProduct(params.id);

//   if (!product) {
//     notFound();
//   }
// export async function generateStaticParams(): Promise<{ id: string }[]> {
//   const products = await getProducts(); // ✅ call the function
//   return products.map((p) => ({ id: p.id })); // ✅ return array of params
// }

export async function generateStaticParams(): Promise<{ id: string }[]> {
  return [
    { id: "1" },
    { id: "2" },
    { id: "3" }, // ✅ trailing comma is okay
  ]; // ✅ notice the semicolon and no extra braces
}

interface Params {
  params: { id: string };
}

export default async function ProductDetailPage({ params }: Params) {
  const product = await getProduct(params.id);

  if (!product) {
    notFound();
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <main className="flex-1 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="mb-6">
            <Button variant="ghost" asChild>
              <Link href="/products" className="flex items-center">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Products
              </Link>
            </Button>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Product Image */}
            <div className="space-y-4">
              <div className="aspect-square relative overflow-hidden rounded-lg">
                <Image
                  src={product.imageUrl || "/placeholder-product.jpg"}
                  alt={product.name}
                  fill
                  className="object-cover"
                  priority
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
              </div>
            </div>

            {/* Product Info */}
            <div className="space-y-6">
              <div>
                <h1 className="text-3xl sm:text-4xl font-bold text-foreground mb-2">
                  {product.name}
                </h1>
                <p className="text-3xl font-bold text-primary">
                  ${product.price}
                </p>
              </div>

              <div>
                <h2 className="text-xl font-semibold mb-2">Description</h2>
                <p className="text-muted-foreground leading-relaxed">
                  {product.description}
                </p>
              </div>

              <div className="space-y-4">
                <Button size="lg" className="w-full sm:w-auto">
                  Add to Cart
                </Button>
                <p className="text-sm text-muted-foreground">
                  Free shipping on orders over $100
                </p>
              </div>

              {/* Product Features */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-6">
                {[
                  {
                    icon: <Star className="h-5 w-5 text-primary" />,
                    title: "Premium Quality",
                    description: "Top-rated product",
                  },
                  {
                    icon: <Shield className="h-5 w-5 text-primary" />,
                    title: "2 Year Warranty",
                    description: "Full protection",
                  },
                  {
                    icon: <Truck className="h-5 w-5 text-primary" />,
                    title: "Free Shipping",
                    description: "Fast delivery",
                  },
                ].map((feature, index) => (
                  <Card key={index}>
                    <CardContent className="p-4 text-center space-y-2">
                      <div className="flex justify-center">{feature.icon}</div>
                      <h3 className="font-medium text-sm">{feature.title}</h3>
                      <p className="text-xs text-muted-foreground">
                        {feature.description}
                      </p>
                    </CardContent>
                  </Card>
                ))}
              </div>

              <div className="text-sm text-muted-foreground pt-4">
                Product ID: {product.id}
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
