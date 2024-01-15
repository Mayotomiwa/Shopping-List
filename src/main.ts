import './css/style.css';
import FullList from './model/FullList';
import ListItem from './model/ListItem';
import ListTemplate from './templates/ListTemplate';

const initApp = (): void => {
  const fullList = FullList.instance
  const Template = ListTemplate.instance

  const ItemForm = document.getElementById('itemEntryForm') as HTMLFormElement
  ItemForm.addEventListener('submit', (event: SubmitEvent): void => {
    event.preventDefault()

    const input = document.getElementById('newItem') as HTMLInputElement
    const newEntryText: string = input.value.trim()
    if (!newEntryText.length) { return }

    // Calculating itemId took the last item and calculated one more than it to get the fullList
    const itemId: number = fullList.list.length ? parseInt(fullList.list[
      fullList.list.length - 1].id) + 1 : 1 //

    const newItem = new ListItem(itemId.toString(), newEntryText)

    fullList.addItem(newItem)

    Template.render(fullList)

    input.value = ''
  },)
  const clearItems = document.getElementById('clearItemsButton') as HTMLButtonElement

  clearItems.addEventListener('click', (): void => {
    fullList.clear()
    Template.clear()
  })

  fullList.load()
  Template.render(fullList)

}

document.addEventListener('DOMContentLoaded', initApp)