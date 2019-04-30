import React from 'react';
import { connect } from 'dva';
import { Link } from 'dva/router';
import styles from './index.less';
import {Button} from 'antd'
function IndexPage(props) {
  function click(){
    props.history.push('/about')
  }
  return (
    <div className={styles.normal}>
      <h1 className={styles.title} onClick={click}>HEIHEIHEI! Welcome to dva!</h1>
      <div className={styles.welcome} />
      <Button type="primary">Button</Button>
      <ul className={styles.list}>
        <Link to="/form">表单</Link> 
        <Link to="/G6">G6</Link> 
        <li><a href="https://github.com/dvajs/dva-docs/blob/master/v1/en-us/getting-started.md">Getting Started</a></li>
      </ul>
    </div>
  );
}

IndexPage.propTypes = {
  
};

export default connect()(IndexPage);