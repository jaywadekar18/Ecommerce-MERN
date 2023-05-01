





<TextField
    variant="outlined"
    margin="normal"
    fullWidth
    name="image"
    type="file"
    inputRef={register({ required: true })}
    error={Boolean(errors.image)}
    helperText={errors.image && (errors.image.type === 'required' && "image is required*")}
    autoComplete="image"
/>
