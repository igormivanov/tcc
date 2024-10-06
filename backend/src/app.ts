import fastify from "fastify";
import { usersRoutes } from "./http/routes/users-routes";
import { ZodError } from "zod";
import fastifyJwt from "@fastify/jwt";
import { env } from "./env";
import { coursesRoutes } from "./http/routes/courses-routes";
import { interestsRoutes } from "./http/routes/interests-routes";
import { rideRoutes } from "./http/routes/ride-routes";
import { republicInterestRoutes } from "./http/routes/republic-interest-routes";
import { citiesRoutes } from "./http/routes/cities-routes";
import fastifyCors from "@fastify/cors";

export const app = fastify()

app.register(fastifyJwt, {
  secret: env.JWT_SECRET,
  sign: {
    expiresIn: '1h'
  }
})

app.register(fastifyCors, {
  origin: "*"
})

app.register(usersRoutes)
app.register(coursesRoutes)
app.register(interestsRoutes)
app.register(rideRoutes)
app.register(republicInterestRoutes)
app.register(citiesRoutes)


app.setErrorHandler((error, _request, reply) => {
  if (error instanceof ZodError) {
    return reply.status(400).send({message: 'Validation error', issues: error.format()})
  }

  return reply.status(500).send({ message: 'Internal server error.' , error: error.message})
})