import { categories } from './categories.js'
import DropDown from './DropDown.jsx'

function CategoryDropDown({ value, onChange }) {
  return (
    <DropDown
        label="Category *"
        listOptions={categories}
        value={value || null}
        onChange={(newCategory) => onChange && onChange(newCategory)}
        name={value || "Select a category..."}
    />
  )
}

export default CategoryDropDown
