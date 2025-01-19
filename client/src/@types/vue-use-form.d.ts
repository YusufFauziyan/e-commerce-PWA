declare module 'vue-use-form' {
  export function useForm<T>(options?: any): {
    handleSubmit: (callback: (data: T) => void) => (event: Event) => void
    formState: {
      errors: Record<string, any>
    }
  }
}
