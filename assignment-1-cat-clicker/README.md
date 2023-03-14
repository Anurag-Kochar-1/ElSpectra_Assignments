# Cat Clicker - Assignment 1 

### LIVE : https://el-spectra-assignment-1-cat-clicker.vercel.app/
### Demo Video : https://youtu.be/L2pNeEVKXhE

### Tech Stack
1. React JS 
2. Firebase
3. TypeScript
4. Redux
5. Material UI (as mentioned in the PDF)


# Components
- [Animal Card](#AnimalCard)
- [Gallery](#Gallery)
- [Toast](#Toast)
- [App Modal](#AppModal)


## AnimalCard

| Prop  | Description                                | Type                                |
| ----- | ------------------------------------------ | ----------------------------------- |
| cat*  | Cat object                                 | ICat Interface from "../interfaces" |
| page* | On which page you want to render this card | string : "HOMEPAGE" or "CATPAGE"    |


## Gallery
| Prop     | Description                                   | Type                                   |
| -------- | --------------------------------------------- | -------------------------------------- |
| allCats* | allCats object                                | ICat [] Interface from "../interfaces" |
| page*    | On which page you want to render this gallery | string : "HOMEPAGE" or "CATPAGE"       |
| title*   | Title of the image gallery                    | string or number                       |

## Image
| Prop    | Description            | Type   |
| ------- | ---------------------- | ------ |
| src*    | Source of the image    | string |
| alt*    | Alt text for the image | string |
| width*  | Width of the image     | string |
| height* | Height of the image    | string |



## Toast
| Prop              | Description                                                     | Type                         |
| ----------------- | --------------------------------------------------------------- | ---------------------------- |
| isSnackbarOpen*   | React State                                                     | boolean                      |
| handleToastClick* | Function to set the state to true                               | () => void                   |
| handleToastClose* | Function to set the state to false                              | (event: React.SyntheticEvent | Event, reason?: string) => void |
| message*          | Message or label for the toast                                  | string or number             |
| autoHideDuration* | For closing the toast after X milliseconds (by default 3500 ms) | number                       |


## AppModal
| Prop              | Description                           | Type        |
| ----------------- | ------------------------------------- | ----------- |
| isModalOpen*      | React State which is false by default | boolean     |
| handleModalClose* | Function to set the state to false    | ()  => void |