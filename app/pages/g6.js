import React from 'react'
import G6 from '@antv/g6';


export default class G6Page extends React.Component {
  constructor() {
    super()
    this.data = {
      headers: [{
          fieldName: 'chnname',
          relationNoShow: false
        },
        {
          fieldName: 'name',
          relationNoShow: false
        },
        {
          fieldName: 'type',
          relationNoShow: false
        },
        {
          fieldName: 'pk',
          relationNoShow: false
        },
      ],
      fields: [{
          chnname: '姓名',
          name: 'NAME',
          type: 'String'
        },
        {
          chnname: '年龄',
          name: 'AGE',
          type: 'Integer'
        },
        {
          chnname: '性别',
          name: 'SEX',
          type: 'String'
        },
      ],
      data: {
        nodes: [{
            "shape": "customNode",
            "id": "node1",
            "x": 50,
            "y": 100,
          },
          {
            "shape": "customNode",
            "id": "node2",
            "x": 300,
            "y": 100,
          }
        ],
        edges: [{
          id: 'edge1',
          target: 'node2',
          source: 'node1',
        }],
        anchors:[[0, 0.5],
        [1, 0.5]]
      }
    }
  }
  componentDidMount() {
    const {data, fields, headers} = this.data
    // 注册鼠标进入节点变绿的行为
    G6.registerBehaviour('mouseEnterFillGreen', graph=>{
      graph.behaviourOn('node:mouseenter', ev=>{
        graph.update(ev.item, {
          show:true
        });
      });
    });
    // 注册鼠标移出节点变原色的行为
    G6.registerBehaviour('mouseLeaveResetFill', graph=>{
      graph.behaviourOn('node:mouseleave', ev=>{
        graph.update(ev.item, {
          show:false
        });
      });
    });
    G6.registerNode('customNode',{
      draw(item){
        const model = item.getModel();
        const group = item.getGraphicGroup();
        // console.log(item)
        // console.log('model',model)
        // console.log('group',group)
        // console.log(group)
        // group.addShape('circle', {
        //   attrs: {
        //     x: 0,
        //     y: 0,
        //     r: 4,
        //     fill: 'blue'
        //   }
        // });
        // console.log(item.bbox)
        group.addShape('circle', {
          attrs: {
            x: 0,
            y: 0,
            r: 8,
            fill: '#eee'
          }
        });
        if(model.show){
          console.log(model)
          group.addShape('text', {
            attrs: {
              x: 0,
              y: 0,
              fill: '#333',
              text: '我是一个自定义节点，\n有下面那个方形和我自己组成'
            }
          });
          group.addShape('circle', {
            attrs: {
              x: 50,
              y: 50,
              r:4,
              fill: 'red'
            }
          });
        }
        return group.addShape('rect', {
          attrs: {
            x: 0,
            y: 0,
            width: 100,
            height: 100,
            stroke: 'blue'
          }
        });
      },
      anchor(item) {
        return [
          [0, 0.5,{
            type:'锚点',
            shape:'dot'
          }],
          [1, 0.5,{
            type:'锚点',
            shape:'dot'
          }]
        ];
      }
    })
    G6.registerNode('dot',{
      draw(item){
        const group = item.getGraphicGroup();
        return group.addShape('circle', {
          attrs: {
            x: 0,
            y: 0,
            r: 8,
            fill: '#eee'
          }
        });
      }
    })
    let mode = 'green';
    const graph = new G6.Graph({
      container: 'mountNode',
      width: 800,
      height: 600,
      modes: {
        red: ['mouseEnterFillRed', 'mouseLeaveResetFill'],
        green: ['mouseEnterFillGreen', 'mouseLeaveResetFill']
      },
      mode,
    });
    graph.read(data);
    let nodes = graph.getNodes()
    nodes.forEach((e,i)=>{
      console.log(i,e.getAnchorPoints())
      e.getAnchorPoints().forEach(n=>{
        graph.add('node',n)
      })
    })
    graph.on('node:mouseenter', (ev)=>{
      console.log(ev.item.model)
      graph.update(ev.item.model.id, {
        fill:'red',
        r: 8
      });
    })
    console.log('nodes: ', nodes);
  }
  render() {
    return ( <div id="mountNode"></div>)
  }
}