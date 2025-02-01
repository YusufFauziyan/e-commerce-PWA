import { definePreset } from '@primevue/themes'
import Aura from '@primevue/themes/aura'

export const MyPreset = definePreset(Aura, {
  semantic: {
    primary: {
      50: '{neutral.50}',
      100: '{neutral.100}',
      200: '{neutral.200}',
      300: '{neutral.300}',
      400: '{neutral.400}',
      500: '{neutral.500}',
      600: '{neutral.600}',
      700: '{neutral.700}',
      800: '{neutral.800}',
      900: '{neutral.900}',
      950: '{neutral.950}',
    },
  },
  components: {
    button: {
      default: {
        color: '{primary.500}',
        backgroundColor: '{primary.950}',
        borderColor: '{neutral.100}',
      },
      hover: {
        color: '{primary.500}',
        backgroundColor: '{neutral.200}',
        borderColor: '{neutral.200}',
      },
      focus: {
        color: '{primary.500}',
        backgroundColor: '{neutral.200}',
        borderColor: '{neutral.200}',
      },
      active: {
        color: '{primary.500}',
        backgroundColor: '{neutral.300}',
        borderColor: '{neutral.300}',
      },
      disabled: {
        color: '{neutral.600}',
        backgroundColor: '{neutral.100}',
        borderColor: '{neutral.100}',
      },
    },
  },
})
