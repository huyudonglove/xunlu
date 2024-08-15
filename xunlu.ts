import { _decorator, Component, Node, UITransform ,EventTouch, Vec3} from "cc";
const { ccclass, property } = _decorator;

@ccclass("xunlu")
export class xunlu extends Component {
  @property(Node)
  bg: Node = null;
  @property(Node)
  ren :Node = null;
  allArr=[];
  luxianArr = [];
  goStatus=false;
  arrCurrent=0;
  start() {
    this.shuju()
  }

  update(deltaTime: number) {
    this.kaishi(deltaTime)
  }
  shuju(){
      //console.log(this.bg.getComponent(UITransform).width,this.bg.getComponent(UITransform).height);
      let arr=[];
      let a= Math.ceil(this.bg.getComponent(UITransform).width);
      let b= Math.ceil(this.bg.getComponent(UITransform).height);
      for(let i=0;i<a;i++){
        arr[i] = [];
        for(let n=0;n<b;n++){
          arr[i][n]=0;
        }
      }
      this.allArr=arr;
      //console.log(arr);
      this.bg.children.map((v,index)=>{
        if(v.name!="ren"){
          this.childNode(v,arr)
        }
      })
  }
  childNode(node:Node,arr){
    let pos= node.position;
    let a=Math.ceil(pos.x);
    let b=Math.ceil(pos.y);
    let w=Math.ceil(node.getComponent(UITransform).width);
    let h=Math.ceil(node.getComponent(UITransform).height);
    let as =[];
    for(let i=0;i<a+w/2;i++){
      if(i>a-w/2){
        as.push(i)
      }
    }
    let bs= [];
    for(let i=0;i<b+h/2;i++){
      if(i>b-h/2){
        bs.push(i)
      }
    }
    //console.log(bs)
    bs.map(v=>{
      as.map(j=>{
        arr[v*1][j*1] =1
      })
    })
    //console.log(arr);
  }
  goTo(e:EventTouch){
    let node = e.currentTarget as Node;
    console.log(e,55)
    let endPos = node.position;
    let startPos = this.ren.position;
    let K=((endPos.y-startPos.y)/(endPos.x-startPos.x)).toFixed(2);
    let N=startPos.y-startPos.x*K;
    //console.log(K,N);
    let startPosX =startPos.x;
    let endPosX=endPos.x;
    for(let i =Math.ceil(endPosX) ;i<startPosX;i++){
        let y=Math.ceil(i*K+N);
        //console.log(i,y);
        let c=0; 
        let self = this 
        function ap(){
          if(self.allArr[y+c][i+c]!=1){
              self.allArr[y+c][i+c] =2;
              self.luxianArr.push([i+c,y+c])
          }else{
            c++;
            return ap()
          }
        }
        ap()
    }
    this.luxianArr = this.luxianArr.reverse();
    this.goStatus = true;
    //console.log(this.luxianArr,555555);
    //this.luxianData()
  }
  luxianData(){
    let arr=[];
    this.allArr.map((v,index1)=>{
      v.map((n,index2)=>{
        if(n==2){
          let a=[index1,index2]
          arr.push(a)
        }
        
      })
    })
    //console.log(arr);
    let sortArr=[];
    for(let i=0;i<arr.length;i++){
      if(i!=0){
        console.log(7777)
        let y1=arr[i][1];
        let y2=arr[i-1][1];
        if(y1>y2){
          let b=i-1;
          function aa(){
            //console.log(b,555);
            //console.log(sortArr,123);
            if(b<0){
              return
            }else{
              if(sortArr[b][1]<y1){
                  b--;
                  return aa()
              }else{
                let tem= sortArr[b];
                sortArr[b]=arr[i];
                sortArr[i]=tem;
              }
            }
            
          }
          aa()
        }else{
          sortArr.push(arr[i]);
        }
      }else{
        sortArr.push(arr[0])
        //console.log(sortArr,123);
      }
     
      
    }
    console.log(sortArr);
  }
  kaishi(time){

    if(this.goStatus){
      if(this.arrCurrent<this.luxianArr.length){
        this.ren.setPosition(new Vec3(this.luxianArr[this.arrCurrent][0],this.luxianArr[this.arrCurrent][1],0));
        this.arrCurrent++;
      }else{
        this.goStatus = false;
        this.arrCurrent =0;
      }
      
    }
  }
}
