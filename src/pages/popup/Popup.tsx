import Activity_item from "@src/components/Activity_Item";
import { ActivityData } from "@src/data/data";


export default function Popup() {
    console.log(ActivityData);
    return (
      <>
        <Activity_item activity={ActivityData[0]}></Activity_item>
    </>
    )
  }