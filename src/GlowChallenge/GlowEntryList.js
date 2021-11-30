import { React } from "react";
import { connect } from "react-redux";
import getComponentData from "./selector";
function GlowEntryList(props) {
  const {
    view,
    edit
  } = props

  return (
    <div>
      <h1>Glow Challenge Entries</h1>
      {view && <div>view permission </div>}
      {edit && <div>edit permission </div>}
    </div>
  );
}

export default connect(getComponentData)(GlowEntryList);
