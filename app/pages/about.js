import React from 'react';
import { connect } from 'dva'
function about(props){
  return (
    <h3 onClick={props.history.goBack}>IM About</h3>
  )
}

export default connect()(about)