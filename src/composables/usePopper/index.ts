import {
  ref, Ref
} from 'vue'

import {
  createPopper, preventOverflow, flip, Instance, Options, StrictModifiers
} from '@popperjs/core'

export interface UsePopperOptions extends Partial < Options > {
  enableListeners?: boolean
}

export interface UsePopperReturn {
  isShown: Ref<boolean>
  popper: Ref<Instance | null>
  create: () => void
  update: () => void
  forceUpdate: () => void
  show: () => void
  hide: () => void
  toggle: () => void
}

export const usePopper = (
  reference: Ref<HTMLElement | null>,
  tooltip: Ref<HTMLElement | null>,
  options: UsePopperOptions
): UsePopperReturn => {
  const { placement = 'top', modifiers = [preventOverflow, flip], strategy = 'fixed', enableListeners = true } = options

  const popperInstance = ref<Instance | null>(null)

  const create = () => {
    if (reference.value && tooltip.value) {
      popperInstance.value = createPopper<StrictModifiers>(reference.value, tooltip.value, {
        placement,
        modifiers,
        strategy
      })
    }
  }

  const update = () => {
    if (popperInstance.value) {
      popperInstance.value.update()
    }
  }

  const forceUpdate = () => {
    if (popperInstance.value) {
      popperInstance.value.forceUpdate()
    }
  }

  const isShown = ref(false)

  // Show the tooltip:
  const show = () => {
    if (popperInstance.value && reference.value && tooltip.value) {
      isShown.value = true

      tooltip.value.setAttribute('data-show', '')

      // Enable the event listeners on show for optimization:
      popperInstance.value.setOptions(options => ({
        ...options,
        modifiers: [...modifiers, {
          name: 'eventListeners',
          enabled: enableListeners
        }]
      }))

      // We need to tell Popper to update the tooltip position
      // after we show the tooltip, otherwise it will be incorrect
      forceUpdate()
    }
  }

  // Hide the tooltip:
  const hide = () => {
    if (popperInstance.value && reference.value && tooltip.value) {
      isShown.value = false

      tooltip.value.removeAttribute('data-show')

      // We can disable the event listeners when the tooltip is hidden to optimize it:
      popperInstance.value.setOptions(options => ({
        ...options,
        modifiers: [...modifiers, {
          name: 'eventListeners',
          enabled: enableListeners
        }]
      }))
    }
  }

  const toggle = () => {
    if (isShown.value) {
      hide()
    } else {
      show()
    }
  }

  return {
    isShown,
    popper: popperInstance,
    create,
    update,
    forceUpdate,
    show,
    hide,
    toggle
  }
}