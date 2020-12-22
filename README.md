# Sevashop

The service sector in India faces the following problems.

- Let’s say you want to book a slot at a barbershop near you. There is no easy way for Individuals like us to book a service near us.
- The easiest way for services to go online right now is to list on aggregators, but doing so destroys the business’s brand and reduces margins.
- Setting up your store with something like Shopify is possible, but it is a daunting task and quite expensive.
- Even the businesses who have gone online find it time-consuming to make digital marketing content.

SevaShop helps any service-based business build their online stores with a simple mobile app. Our B2B application will allow businesses like salons, car workshops, etc., to create an e-commerce store in 15 secs. With multilingual and vernacular language support, we will empower tier 2 and 3 market segments to go online with ease.

Checkout the [demo video](https://youtu.be/gWOxo-UuT28)
Also see our [mvp video](https://youtu.be/o4YRtYcPQ84)

Here is the final stack we used

#### Ecommerce framework

- [Vendure](vendure.io)
- Postgres

#### Dashboard of a tenant

- Nextjs
- React
- Chakra UI framework
- Firebase for phone auth
- GraphQL admin api of vendure

#### Storefront

- Nextjs
- React
- Chakra UI framework
- GraphQL shop api of vendure

#### Deployment

- Nginx for reverse proxy
- Digitalocean droplet for Vendure server
- Vercel for the storefront and dashboard

Thanks to all of the courses/blogs/docs mentioned below

- https://react2025.com/
- https://youtu.be/I6ypD7qv3Z8
- https://chakra-ui.com/docs/getting-started
- https://github.com/FormidableLabs/urql/discussions/1237
- https://www.coderrocketfuel.com/article/how-to-deploy-a-next-js-website-to-a-digital-ocean-server
- https://www.digitalocean.com/community/tutorials/how-to-set-up-a-node-js-application-for-production-on-ubuntu-18-04
