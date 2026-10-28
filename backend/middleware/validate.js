import asyncHandler from './asyncHandler.js'

export default function validate(schema, source = 'body') {
  return asyncHandler(async (req, _res, next) => {
    const parsed = schema.parse(source === 'query' ? req.query : req.body)
    if (source === 'query') req.validatedQuery = parsed
    else req.validatedBody = parsed
    next()
  })
}
