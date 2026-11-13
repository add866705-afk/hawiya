import React from 'react';
export default class ErrorBoundary extends React.Component {
  constructor(props){super(props);this.state={failed:false};}
  static getDerivedStateFromError(){return {failed:true};}
  componentDidCatch(error,info){console.error('HOWIYA UI error:',error,info);}
  render(){
    if(this.state.failed)return <main role="alert" style={{minHeight:'70vh',display:'grid',placeContent:'center',padding:24,textAlign:'center',fontFamily:'sans-serif'}}><h1>حدث خطأ غير متوقع</h1><p>يرجى إعادة تحميل الصفحة. Unexpected application error.</p><button onClick={()=>window.location.reload()}>إعادة التحميل / Reload</button></main>;
    return this.props.children;
  }
}