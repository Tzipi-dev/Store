import AspectRatio from '@mui/joy/AspectRatio';
import Box from '@mui/joy/Box';
import Card from '@mui/joy/Card';
import CardCover from '@mui/joy/CardCover';
import IconButton from '@mui/joy/IconButton';
import Typography from '@mui/joy/Typography';
import Link from '@mui/joy/Link';
import Favorite from '@mui/icons-material/Favorite';
import StarIcon from '@mui/icons-material/Star';
import CreateNewFolder from '@mui/icons-material/CreateNewFolder';
import { useGetAllProductsQuery, useUpdateProductMutation } from '../Redux/api/products/endPointsProducts';
import type { Product } from '../interfaces/interfaces';
import { useEffect } from 'react';

const keep = () => {
    const { data: AllProducts, isError, isLoading } = useGetAllProductsQuery();
      const [UpdateProduct]=useUpdateProductMutation()
      const handleAddLove=async (product: Product,p0: number)=>{
        console.log("loveee");
        const Update_Product:Product={
          _id: product._id,
          name: product.name,
          price: product.price,
          rating: product.rating,
          amountOfBuys: product.amountOfBuys,
          description: product.description,
          category: product.category,
          color: product.color,
          imageUrl: product.imageUrl,
          dateOfStart: product.dateOfStart,
          views: p0,
          comments: product.comments,
          sales: product.sales,
        }
       const res=await UpdateProduct(Update_Product)
       console.log(res);
       
      }
  return (
    <div>
         <>
      <div style={{ display: "flex", flexWrap: "wrap", marginLeft: "10vw" }}>
        {
          AllProducts?.map(product => (
            <div key={product._id} style={{ width: "20vw", height: "53vh" }}>
              <Card variant="plain">
                <Box sx={{ position: 'relative' }}>
                  <AspectRatio ratio="4/3">
                    <figure>
                      <img
                        src="https://images.unsplash.com/photo-1515825838458-f2a94b20105a?auto=format&fit=crop&w=300"
                        srcSet="https://images.unsplash.com/photo-1515825838458-f2a94b20105a?auto=format&fit=crop&w=300&dpr=2 2x"
                        loading="lazy"
                        alt="Yosemite by Casey Horner"
                      />
                    </figure>
                  </AspectRatio>

                  <CardCover
                    className="gradient-cover"
                    sx={{
                      '&:hover, &:focus-within': { opacity: 1 },
                      opacity: 0,
                      transition: '0.1s ease-in',
                      background:
                        'linear-gradient(180deg, transparent 62%, rgba(0,0,0,0.0035) 63.94%, rgba(0,0,0,0.0142) 65.89%, rgba(0,0,0,0.0326) 67.83%, rgba(0,0,0,0.0589) 69.78%, rgba(0,0,0,0.0927) 71.72%, rgba(0,0,0,0.1328) 73.67%, rgba(0,0,0,0.1771) 75.61%, rgba(0,0,0,0.2229) 77.56%, rgba(0,0,0,0.2672) 79.5%, rgba(0,0,0,0.3073) 81.44%, rgba(0,0,0,0.3410) 83.39%, rgba(0,0,0,0.3673) 85.33%, rgba(0,0,0,0.3858) 87.28%, rgba(0,0,0,0.3965) 89.22%, rgba(0,0,0,0.4) 91.17%)',
                    }}
                  >
                    <div>
                      <Box
                        sx={{
                          p: 2,
                          display: 'flex',
                          alignItems: 'center',
                          gap: 1.5,
                          flexGrow: 1,
                          alignSelf: 'flex-end',
                        }}
                      >
                        <Typography level="h2" noWrap sx={{ fontSize: 'lg' }}>
                          <Link
                            href="#dribbble-shot"
                            overlay
                            underline="none"
                            sx={{
                              color: '#fff',
                              textOverflow: 'ellipsis',
                              overflow: 'hidden',
                              display: 'block',
                            }}
                          >
                            {product.name}
                          </Link>
                        </Typography>
                        {/* <IconButton
                          size="sm"
                          variant="solid"
                          color="neutral"
                          sx={{ ml: 'auto', bgcolor: 'rgba(0 0 0 / 0.2)' }}
                        >
                          <CreateNewFolder />
                        </IconButton> */}
                        <IconButton
                     onClick={() => handleAddLove(product,product.views+1)}
                          size="sm"
                          variant="solid"
                          color="neutral"
                          sx={{ bgcolor: 'rgba(0 0 0 / 0.2)' }}
                        >
                          <Favorite />
                        </IconButton>
                      </Box>
                    </div>
                  </CardCover>
                </Box>

                <Box sx={{ display: 'flex', gap: 1, alignItems: 'center' }}>
                  <Typography sx={{ fontSize: 'sm', fontWeight: 'md' }}>
                    {product.name}
                  </Typography>
                   <Favorite />
                   <Typography sx={{color:"black"}}>{product.views}</Typography>
                   
                    <StarIcon />
                    {product.rating}
                </Box>
              </Card>
            </div>
          ))
        }
      </div>
    </>
    </div>
  )
}

export default keep