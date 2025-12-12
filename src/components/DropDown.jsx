import { Label, Listbox, ListboxButton, ListboxOption, ListboxOptions } from '@headlessui/react'
import { ChevronUpDownIcon } from '@heroicons/react/16/solid'
import { CheckIcon } from '@heroicons/react/20/solid'

function DropDown({ name, onChange, value, label, listOptions, key }) {
  // Find the selected listOption object based on value (user_id)
  // Handle null/undefined value properly to avoid controlled/uncontrolled warning

  return (
    <Listbox 
      value={value}
      onChange={onChange}
    >
      <Label className="py-1 px-2 text-sm transition-all duration-300 ease-in-out text-text">
        {label}
      </Label>
      <div className="relative w-full">
        <ListboxButton className="grid w-full cursor-default grid-cols-1 py-2 pr-2 pl-3 text-left focus-visible:outline-2 focus-visible:-outline-offset-3 focus-visible:outline-border bg-gray-100 dark:bg-gray-900 rounded-xl focus:rounded-xl px-2 hover:outline-3 outline-border text-text-muted shadow-xs items-center outline-3">
          <span className="col-start-1 row-start-1 flex items-center gap-3 pr-6">
            <span className="block truncate">
              {name || (typeof value === 'string' ? value : value?.full_name) || "Select Option"}
            </span>
          </span>
          <ChevronUpDownIcon
            aria-hidden="true"
            className="col-start-1 row-start-1 size-5 self-center justify-self-end text-gray-400 sm:size-4"
          />
        </ListboxButton>

        <ListboxOptions
          transition
          className="absolute z-10 mt-1 max-h-56 w-full overflow-auto rounded-md bg-gray-100 dark:bg-gray-900 py-1 text-base outline-1 -outline-offset-1 outline-white/10 data-leave:transition data-leave:duration-100 data-leave:ease-in text-text-muted data-closed:data-leave:opacity-0 sm:text-sm"
        >
          {listOptions.map((listOption, index) => (
            <ListboxOption
              key={key || index}
              value={listOption} // Pass entire object, not just the name
              className="group relative cursor-default py-2 pr-9 pl-3 text-text-muted select-none data-focus:bg-primary-dark data-focus:outline-hidden"
            >
              <div className="flex items-center">
                <span className="ml-3 block truncate font-normal group-data-selected:font-semibold">
                  {typeof listOption === 'string' ? listOption : (listOption.full_name_display || listOption.full_name)}
                </span>
              </div>

              <span className="absolute inset-y-0 right-0 flex items-center pr-4 text-indigo-400 group-not-data-selected:hidden group-data-focus:text-white">
                <CheckIcon aria-hidden="true" className="size-5" />
              </span>
            </ListboxOption>
          ))}
        </ListboxOptions>
      </div>
    </Listbox>
  )
}

export default DropDown