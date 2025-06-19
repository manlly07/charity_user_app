const OrganizationForm = () => {
  // const form = useForm<z.infer<typeof OrganizationSchema>>({
  //   resolver: zodResolver(OrganizationSchema)
  // })
  // const [preview, setPreview] = useState<string | ArrayBuffer | null>('')

  // const onDrop = useCallback(
  //   (acceptedFiles: File[]) => {
  //     const reader = new FileReader()
  //     try {
  //       reader.onload = () => setPreview(reader.result)
  //       reader.readAsDataURL(acceptedFiles[0])
  //       form.setValue('certificate', acceptedFiles[0])
  //       form.clearErrors('certificate')
  //     } catch (error) {
  //       setPreview(null)
  //       form.resetField('certificate')
  //     }
  //   },
  //   [form]
  // )

  // const inputRef = useRef<HTMLInputElement | null>(null)

  // const { getRootProps, getInputProps, isDragActive, acceptedFiles } = useDropzone({
  //   onDrop,
  //   maxFiles: 1,
  //   maxSize: 1000000,
  //   accept: { 'image/png': [], 'image/jpg': [], 'image/jpeg': [] }
  // })

  return (
    <div className="shadow rounded-lg p-8 space-y-6">
      <p className="text-xl font-medium">Edit Personal Information</p>
      {/* <Form {...form}>
        <form onSubmit={form.handleSubmit((data) => console.log(data))} className=" flex gap-9">
          <div className="space-y-6 flex-1">
            <FormField
              control={form.control}
              name="fullName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Full Name</FormLabel>
                  <FormControl>
                    <InputCustom type="text" placeholder="Enter your name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email address</FormLabel>
                  <FormControl>
                    <InputCustom type="email" placeholder="Enter your email" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="phoneNumber"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Phone Number</FormLabel>
                  <FormControl>
                    <InputCustom type="text" placeholder="Enter your phone number" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button
              type="submit"
              size={'lg'}
              className="bg-primary-custom-color hover:bg-primary-custom-color/80 w-fit shadow-lg shadow-primary-custom-color/20"
            >
              Save Changes
            </Button>
          </div>
          <FormField
            control={form.control}
            name="image"
            render={({ field }) => (
              <FormItem className="flex flex-col gap-3">
                <div className="w-[276px] h-[300px] rounded-lg border border-dotted">
                  <FormControl>
                    <div
                      {...getRootProps()}
                      className="flex items-center justify-center gap-4 h-full relative"
                    >
                      {preview && (
                        <div>
                          <img
                            src={preview as string}
                            alt="Uploaded image"
                            className="absolute z-10 top-0 left-0 right-0 bottom-0 w-full h-full object-cover"
                          />
                          <div className="absolute top-0 left-0 right-0 bottom-0 w-full h-full z-20 group">
                            <div className="hidden w-full h-full items-center justify-center morphing group-hover:flex">
                              <Button
                                variant={'ghost'}
                                size={'icon'}
                                onClick={() => {
                                  form.resetField('image')
                                  setPreview('')
                                }}
                                type="button"
                              >
                                <TrashIcon width={32} height={32} className="text-destructive" />
                              </Button>
                            </div>
                          </div>
                        </div>
                      )}
                      <div>
                        <input {...getInputProps()} type="file" ref={inputRef} />
                      </div>
                      {isDragActive ? (
                        <div className="bg-[#F3F4F6] w-20 h-20 rounded-full flex items-center justify-center">
                          <ImageIcon width={32} height={32} />
                        </div>
                      ) : (
                        <div className="space-y-4 flex flex-col items-center justify-center">
                          <div className="bg-[#F3F4F6] w-20 h-20 rounded-full flex items-center justify-center">
                            <PersonIcon width={32} height={32} />
                          </div>
                          <Input {...getInputProps()} type="file" />
                          <Button
                            variant={'outline'}
                            type="button"
                            onClick={() => {
                              inputRef.current?.click()
                            }}
                          >
                            <ImageIcon />
                            Upload Photo
                          </Button>
                        </div>
                      )}
                    </div>
                  </FormControl>
                </div>
                <FormMessage />
              </FormItem>
            )}
          />
        </form>
      </Form> */}
    </div>
  )
}

export default OrganizationForm
