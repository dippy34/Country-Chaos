(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const i of document.querySelectorAll('link[rel="modulepreload"]'))n(i);new MutationObserver(i=>{for(const r of i)if(r.type==="childList")for(const o of r.addedNodes)o.tagName==="LINK"&&o.rel==="modulepreload"&&n(o)}).observe(document,{childList:!0,subtree:!0});function t(i){const r={};return i.integrity&&(r.integrity=i.integrity),i.referrerPolicy&&(r.referrerPolicy=i.referrerPolicy),i.crossOrigin==="use-credentials"?r.credentials="include":i.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function n(i){if(i.ep)return;i.ep=!0;const r=t(i);fetch(i.href,r)}})();/**
 * @license
 * Copyright 2010-2025 Three.js Authors
 * SPDX-License-Identifier: MIT
 */const Pl="180",Tf=0,pc=1,Ef=2,eh=1,wf=2,Gn=3,Yn=0,Lt=1,cn=2,ui=0,Ri=1,nr=2,mc=3,gc=4,th=5,li=100,Af=101,Rf=102,Cf=103,Pf=104,Lf=200,nh=201,If=202,Df=203,Ca=204,go=205,Nf=206,Uf=207,Ff=208,Of=209,kf=210,Bf=211,zf=212,Hf=213,Vf=214,Pa=0,La=1,Ia=2,us=3,Da=4,Na=5,Ua=6,Fa=7,ih=0,Gf=1,Wf=2,hi=0,Xf=1,qf=2,Kf=3,sh=4,$f=5,rh=6,oh=7,vc="attached",Yf="detached",ah=300,hs=301,fs=302,Oa=303,ka=304,bo=306,Pi=1e3,qn=1001,vo=1002,Vt=1003,lh=1004,Xs=1005,_t=1006,oo=1007,tn=1008,yn=1009,ch=1010,uh=1011,ir=1012,Ll=1013,Li=1014,gn=1015,nn=1016,Il=1017,Dl=1018,sr=1020,hh=35902,fh=35899,dh=1021,ph=1022,Nt=1023,rr=1026,or=1027,To=1028,Nl=1029,mh=1030,Ul=1031,Fl=1033,ao=33776,lo=33777,co=33778,uo=33779,Ba=35840,za=35841,Ha=35842,Va=35843,Ga=36196,Wa=37492,Xa=37496,qa=37808,Ka=37809,$a=37810,Ya=37811,ja=37812,Za=37813,Ja=37814,Qa=37815,el=37816,tl=37817,nl=37818,il=37819,sl=37820,rl=37821,ol=36492,al=36494,ll=36495,cl=36283,ul=36284,hl=36285,fl=36286,ar=2300,lr=2301,No=2302,xc=2400,_c=2401,yc=2402,jf=2500,Zf=0,gh=1,dl=2,Jf=3200,Qf=3201,vh=0,ed=1,ci="",St="srgb",Wt="srgb-linear",xo="linear",ct="srgb",Fi=7680,Mc=519,td=512,nd=513,id=514,xh=515,sd=516,rd=517,od=518,ad=519,pl=35044,ml="300 es",Cn=2e3,_o=2001;class Ms{addEventListener(e,t){this._listeners===void 0&&(this._listeners={});const n=this._listeners;n[e]===void 0&&(n[e]=[]),n[e].indexOf(t)===-1&&n[e].push(t)}hasEventListener(e,t){const n=this._listeners;return n===void 0?!1:n[e]!==void 0&&n[e].indexOf(t)!==-1}removeEventListener(e,t){const n=this._listeners;if(n===void 0)return;const i=n[e];if(i!==void 0){const r=i.indexOf(t);r!==-1&&i.splice(r,1)}}dispatchEvent(e){const t=this._listeners;if(t===void 0)return;const n=t[e.type];if(n!==void 0){e.target=this;const i=n.slice(0);for(let r=0,o=i.length;r<o;r++)i[r].call(this,e);e.target=null}}}const Ut=["00","01","02","03","04","05","06","07","08","09","0a","0b","0c","0d","0e","0f","10","11","12","13","14","15","16","17","18","19","1a","1b","1c","1d","1e","1f","20","21","22","23","24","25","26","27","28","29","2a","2b","2c","2d","2e","2f","30","31","32","33","34","35","36","37","38","39","3a","3b","3c","3d","3e","3f","40","41","42","43","44","45","46","47","48","49","4a","4b","4c","4d","4e","4f","50","51","52","53","54","55","56","57","58","59","5a","5b","5c","5d","5e","5f","60","61","62","63","64","65","66","67","68","69","6a","6b","6c","6d","6e","6f","70","71","72","73","74","75","76","77","78","79","7a","7b","7c","7d","7e","7f","80","81","82","83","84","85","86","87","88","89","8a","8b","8c","8d","8e","8f","90","91","92","93","94","95","96","97","98","99","9a","9b","9c","9d","9e","9f","a0","a1","a2","a3","a4","a5","a6","a7","a8","a9","aa","ab","ac","ad","ae","af","b0","b1","b2","b3","b4","b5","b6","b7","b8","b9","ba","bb","bc","bd","be","bf","c0","c1","c2","c3","c4","c5","c6","c7","c8","c9","ca","cb","cc","cd","ce","cf","d0","d1","d2","d3","d4","d5","d6","d7","d8","d9","da","db","dc","dd","de","df","e0","e1","e2","e3","e4","e5","e6","e7","e8","e9","ea","eb","ec","ed","ee","ef","f0","f1","f2","f3","f4","f5","f6","f7","f8","f9","fa","fb","fc","fd","fe","ff"];let Sc=1234567;const $s=Math.PI/180,ds=180/Math.PI;function hn(){const s=Math.random()*4294967295|0,e=Math.random()*4294967295|0,t=Math.random()*4294967295|0,n=Math.random()*4294967295|0;return(Ut[s&255]+Ut[s>>8&255]+Ut[s>>16&255]+Ut[s>>24&255]+"-"+Ut[e&255]+Ut[e>>8&255]+"-"+Ut[e>>16&15|64]+Ut[e>>24&255]+"-"+Ut[t&63|128]+Ut[t>>8&255]+"-"+Ut[t>>16&255]+Ut[t>>24&255]+Ut[n&255]+Ut[n>>8&255]+Ut[n>>16&255]+Ut[n>>24&255]).toLowerCase()}function $e(s,e,t){return Math.max(e,Math.min(t,s))}function Ol(s,e){return(s%e+e)%e}function ld(s,e,t,n,i){return n+(s-e)*(i-n)/(t-e)}function cd(s,e,t){return s!==e?(t-s)/(e-s):0}function Ys(s,e,t){return(1-t)*s+t*e}function ud(s,e,t,n){return Ys(s,e,1-Math.exp(-t*n))}function hd(s,e=1){return e-Math.abs(Ol(s,e*2)-e)}function fd(s,e,t){return s<=e?0:s>=t?1:(s=(s-e)/(t-e),s*s*(3-2*s))}function dd(s,e,t){return s<=e?0:s>=t?1:(s=(s-e)/(t-e),s*s*s*(s*(s*6-15)+10))}function pd(s,e){return s+Math.floor(Math.random()*(e-s+1))}function md(s,e){return s+Math.random()*(e-s)}function gd(s){return s*(.5-Math.random())}function vd(s){s!==void 0&&(Sc=s);let e=Sc+=1831565813;return e=Math.imul(e^e>>>15,e|1),e^=e+Math.imul(e^e>>>7,e|61),((e^e>>>14)>>>0)/4294967296}function xd(s){return s*$s}function _d(s){return s*ds}function yd(s){return(s&s-1)===0&&s!==0}function Md(s){return Math.pow(2,Math.ceil(Math.log(s)/Math.LN2))}function Sd(s){return Math.pow(2,Math.floor(Math.log(s)/Math.LN2))}function bd(s,e,t,n,i){const r=Math.cos,o=Math.sin,a=r(t/2),l=o(t/2),c=r((e+n)/2),u=o((e+n)/2),h=r((e-n)/2),f=o((e-n)/2),d=r((n-e)/2),p=o((n-e)/2);switch(i){case"XYX":s.set(a*u,l*h,l*f,a*c);break;case"YZY":s.set(l*f,a*u,l*h,a*c);break;case"ZXZ":s.set(l*h,l*f,a*u,a*c);break;case"XZX":s.set(a*u,l*p,l*d,a*c);break;case"YXY":s.set(l*d,a*u,l*p,a*c);break;case"ZYZ":s.set(l*p,l*d,a*u,a*c);break;default:console.warn("THREE.MathUtils: .setQuaternionFromProperEuler() encountered an unknown order: "+i)}}function mn(s,e){switch(e.constructor){case Float32Array:return s;case Uint32Array:return s/4294967295;case Uint16Array:return s/65535;case Uint8Array:return s/255;case Int32Array:return Math.max(s/2147483647,-1);case Int16Array:return Math.max(s/32767,-1);case Int8Array:return Math.max(s/127,-1);default:throw new Error("Invalid component type.")}}function st(s,e){switch(e.constructor){case Float32Array:return s;case Uint32Array:return Math.round(s*4294967295);case Uint16Array:return Math.round(s*65535);case Uint8Array:return Math.round(s*255);case Int32Array:return Math.round(s*2147483647);case Int16Array:return Math.round(s*32767);case Int8Array:return Math.round(s*127);default:throw new Error("Invalid component type.")}}const $t={DEG2RAD:$s,RAD2DEG:ds,generateUUID:hn,clamp:$e,euclideanModulo:Ol,mapLinear:ld,inverseLerp:cd,lerp:Ys,damp:ud,pingpong:hd,smoothstep:fd,smootherstep:dd,randInt:pd,randFloat:md,randFloatSpread:gd,seededRandom:vd,degToRad:xd,radToDeg:_d,isPowerOfTwo:yd,ceilPowerOfTwo:Md,floorPowerOfTwo:Sd,setQuaternionFromProperEuler:bd,normalize:st,denormalize:mn};class ne{constructor(e=0,t=0){ne.prototype.isVector2=!0,this.x=e,this.y=t}get width(){return this.x}set width(e){this.x=e}get height(){return this.y}set height(e){this.y=e}set(e,t){return this.x=e,this.y=t,this}setScalar(e){return this.x=e,this.y=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y)}copy(e){return this.x=e.x,this.y=e.y,this}add(e){return this.x+=e.x,this.y+=e.y,this}addScalar(e){return this.x+=e,this.y+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this}subScalar(e){return this.x-=e,this.y-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this}multiply(e){return this.x*=e.x,this.y*=e.y,this}multiplyScalar(e){return this.x*=e,this.y*=e,this}divide(e){return this.x/=e.x,this.y/=e.y,this}divideScalar(e){return this.multiplyScalar(1/e)}applyMatrix3(e){const t=this.x,n=this.y,i=e.elements;return this.x=i[0]*t+i[3]*n+i[6],this.y=i[1]*t+i[4]*n+i[7],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this}clamp(e,t){return this.x=$e(this.x,e.x,t.x),this.y=$e(this.y,e.y,t.y),this}clampScalar(e,t){return this.x=$e(this.x,e,t),this.y=$e(this.y,e,t),this}clampLength(e,t){const n=this.length();return this.divideScalar(n||1).multiplyScalar($e(n,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this}negate(){return this.x=-this.x,this.y=-this.y,this}dot(e){return this.x*e.x+this.y*e.y}cross(e){return this.x*e.y-this.y*e.x}lengthSq(){return this.x*this.x+this.y*this.y}length(){return Math.sqrt(this.x*this.x+this.y*this.y)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)}normalize(){return this.divideScalar(this.length()||1)}angle(){return Math.atan2(-this.y,-this.x)+Math.PI}angleTo(e){const t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;const n=this.dot(e)/t;return Math.acos($e(n,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){const t=this.x-e.x,n=this.y-e.y;return t*t+n*n}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this}equals(e){return e.x===this.x&&e.y===this.y}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this}rotateAround(e,t){const n=Math.cos(t),i=Math.sin(t),r=this.x-e.x,o=this.y-e.y;return this.x=r*n-o*i+e.x,this.y=r*i+o*n+e.y,this}random(){return this.x=Math.random(),this.y=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y}}class Yt{constructor(e=0,t=0,n=0,i=1){this.isQuaternion=!0,this._x=e,this._y=t,this._z=n,this._w=i}static slerpFlat(e,t,n,i,r,o,a){let l=n[i+0],c=n[i+1],u=n[i+2],h=n[i+3];const f=r[o+0],d=r[o+1],p=r[o+2],v=r[o+3];if(a===0){e[t+0]=l,e[t+1]=c,e[t+2]=u,e[t+3]=h;return}if(a===1){e[t+0]=f,e[t+1]=d,e[t+2]=p,e[t+3]=v;return}if(h!==v||l!==f||c!==d||u!==p){let g=1-a;const m=l*f+c*d+u*p+h*v,_=m>=0?1:-1,y=1-m*m;if(y>Number.EPSILON){const E=Math.sqrt(y),A=Math.atan2(E,m*_);g=Math.sin(g*A)/E,a=Math.sin(a*A)/E}const x=a*_;if(l=l*g+f*x,c=c*g+d*x,u=u*g+p*x,h=h*g+v*x,g===1-a){const E=1/Math.sqrt(l*l+c*c+u*u+h*h);l*=E,c*=E,u*=E,h*=E}}e[t]=l,e[t+1]=c,e[t+2]=u,e[t+3]=h}static multiplyQuaternionsFlat(e,t,n,i,r,o){const a=n[i],l=n[i+1],c=n[i+2],u=n[i+3],h=r[o],f=r[o+1],d=r[o+2],p=r[o+3];return e[t]=a*p+u*h+l*d-c*f,e[t+1]=l*p+u*f+c*h-a*d,e[t+2]=c*p+u*d+a*f-l*h,e[t+3]=u*p-a*h-l*f-c*d,e}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get w(){return this._w}set w(e){this._w=e,this._onChangeCallback()}set(e,t,n,i){return this._x=e,this._y=t,this._z=n,this._w=i,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._w)}copy(e){return this._x=e.x,this._y=e.y,this._z=e.z,this._w=e.w,this._onChangeCallback(),this}setFromEuler(e,t=!0){const n=e._x,i=e._y,r=e._z,o=e._order,a=Math.cos,l=Math.sin,c=a(n/2),u=a(i/2),h=a(r/2),f=l(n/2),d=l(i/2),p=l(r/2);switch(o){case"XYZ":this._x=f*u*h+c*d*p,this._y=c*d*h-f*u*p,this._z=c*u*p+f*d*h,this._w=c*u*h-f*d*p;break;case"YXZ":this._x=f*u*h+c*d*p,this._y=c*d*h-f*u*p,this._z=c*u*p-f*d*h,this._w=c*u*h+f*d*p;break;case"ZXY":this._x=f*u*h-c*d*p,this._y=c*d*h+f*u*p,this._z=c*u*p+f*d*h,this._w=c*u*h-f*d*p;break;case"ZYX":this._x=f*u*h-c*d*p,this._y=c*d*h+f*u*p,this._z=c*u*p-f*d*h,this._w=c*u*h+f*d*p;break;case"YZX":this._x=f*u*h+c*d*p,this._y=c*d*h+f*u*p,this._z=c*u*p-f*d*h,this._w=c*u*h-f*d*p;break;case"XZY":this._x=f*u*h-c*d*p,this._y=c*d*h-f*u*p,this._z=c*u*p+f*d*h,this._w=c*u*h+f*d*p;break;default:console.warn("THREE.Quaternion: .setFromEuler() encountered an unknown order: "+o)}return t===!0&&this._onChangeCallback(),this}setFromAxisAngle(e,t){const n=t/2,i=Math.sin(n);return this._x=e.x*i,this._y=e.y*i,this._z=e.z*i,this._w=Math.cos(n),this._onChangeCallback(),this}setFromRotationMatrix(e){const t=e.elements,n=t[0],i=t[4],r=t[8],o=t[1],a=t[5],l=t[9],c=t[2],u=t[6],h=t[10],f=n+a+h;if(f>0){const d=.5/Math.sqrt(f+1);this._w=.25/d,this._x=(u-l)*d,this._y=(r-c)*d,this._z=(o-i)*d}else if(n>a&&n>h){const d=2*Math.sqrt(1+n-a-h);this._w=(u-l)/d,this._x=.25*d,this._y=(i+o)/d,this._z=(r+c)/d}else if(a>h){const d=2*Math.sqrt(1+a-n-h);this._w=(r-c)/d,this._x=(i+o)/d,this._y=.25*d,this._z=(l+u)/d}else{const d=2*Math.sqrt(1+h-n-a);this._w=(o-i)/d,this._x=(r+c)/d,this._y=(l+u)/d,this._z=.25*d}return this._onChangeCallback(),this}setFromUnitVectors(e,t){let n=e.dot(t)+1;return n<1e-8?(n=0,Math.abs(e.x)>Math.abs(e.z)?(this._x=-e.y,this._y=e.x,this._z=0,this._w=n):(this._x=0,this._y=-e.z,this._z=e.y,this._w=n)):(this._x=e.y*t.z-e.z*t.y,this._y=e.z*t.x-e.x*t.z,this._z=e.x*t.y-e.y*t.x,this._w=n),this.normalize()}angleTo(e){return 2*Math.acos(Math.abs($e(this.dot(e),-1,1)))}rotateTowards(e,t){const n=this.angleTo(e);if(n===0)return this;const i=Math.min(1,t/n);return this.slerp(e,i),this}identity(){return this.set(0,0,0,1)}invert(){return this.conjugate()}conjugate(){return this._x*=-1,this._y*=-1,this._z*=-1,this._onChangeCallback(),this}dot(e){return this._x*e._x+this._y*e._y+this._z*e._z+this._w*e._w}lengthSq(){return this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w}length(){return Math.sqrt(this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w)}normalize(){let e=this.length();return e===0?(this._x=0,this._y=0,this._z=0,this._w=1):(e=1/e,this._x=this._x*e,this._y=this._y*e,this._z=this._z*e,this._w=this._w*e),this._onChangeCallback(),this}multiply(e){return this.multiplyQuaternions(this,e)}premultiply(e){return this.multiplyQuaternions(e,this)}multiplyQuaternions(e,t){const n=e._x,i=e._y,r=e._z,o=e._w,a=t._x,l=t._y,c=t._z,u=t._w;return this._x=n*u+o*a+i*c-r*l,this._y=i*u+o*l+r*a-n*c,this._z=r*u+o*c+n*l-i*a,this._w=o*u-n*a-i*l-r*c,this._onChangeCallback(),this}slerp(e,t){if(t===0)return this;if(t===1)return this.copy(e);const n=this._x,i=this._y,r=this._z,o=this._w;let a=o*e._w+n*e._x+i*e._y+r*e._z;if(a<0?(this._w=-e._w,this._x=-e._x,this._y=-e._y,this._z=-e._z,a=-a):this.copy(e),a>=1)return this._w=o,this._x=n,this._y=i,this._z=r,this;const l=1-a*a;if(l<=Number.EPSILON){const d=1-t;return this._w=d*o+t*this._w,this._x=d*n+t*this._x,this._y=d*i+t*this._y,this._z=d*r+t*this._z,this.normalize(),this}const c=Math.sqrt(l),u=Math.atan2(c,a),h=Math.sin((1-t)*u)/c,f=Math.sin(t*u)/c;return this._w=o*h+this._w*f,this._x=n*h+this._x*f,this._y=i*h+this._y*f,this._z=r*h+this._z*f,this._onChangeCallback(),this}slerpQuaternions(e,t,n){return this.copy(e).slerp(t,n)}random(){const e=2*Math.PI*Math.random(),t=2*Math.PI*Math.random(),n=Math.random(),i=Math.sqrt(1-n),r=Math.sqrt(n);return this.set(i*Math.sin(e),i*Math.cos(e),r*Math.sin(t),r*Math.cos(t))}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._w===this._w}fromArray(e,t=0){return this._x=e[t],this._y=e[t+1],this._z=e[t+2],this._w=e[t+3],this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._w,e}fromBufferAttribute(e,t){return this._x=e.getX(t),this._y=e.getY(t),this._z=e.getZ(t),this._w=e.getW(t),this._onChangeCallback(),this}toJSON(){return this.toArray()}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._w}}class w{constructor(e=0,t=0,n=0){w.prototype.isVector3=!0,this.x=e,this.y=t,this.z=n}set(e,t,n){return n===void 0&&(n=this.z),this.x=e,this.y=t,this.z=n,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this}multiplyVectors(e,t){return this.x=e.x*t.x,this.y=e.y*t.y,this.z=e.z*t.z,this}applyEuler(e){return this.applyQuaternion(bc.setFromEuler(e))}applyAxisAngle(e,t){return this.applyQuaternion(bc.setFromAxisAngle(e,t))}applyMatrix3(e){const t=this.x,n=this.y,i=this.z,r=e.elements;return this.x=r[0]*t+r[3]*n+r[6]*i,this.y=r[1]*t+r[4]*n+r[7]*i,this.z=r[2]*t+r[5]*n+r[8]*i,this}applyNormalMatrix(e){return this.applyMatrix3(e).normalize()}applyMatrix4(e){const t=this.x,n=this.y,i=this.z,r=e.elements,o=1/(r[3]*t+r[7]*n+r[11]*i+r[15]);return this.x=(r[0]*t+r[4]*n+r[8]*i+r[12])*o,this.y=(r[1]*t+r[5]*n+r[9]*i+r[13])*o,this.z=(r[2]*t+r[6]*n+r[10]*i+r[14])*o,this}applyQuaternion(e){const t=this.x,n=this.y,i=this.z,r=e.x,o=e.y,a=e.z,l=e.w,c=2*(o*i-a*n),u=2*(a*t-r*i),h=2*(r*n-o*t);return this.x=t+l*c+o*h-a*u,this.y=n+l*u+a*c-r*h,this.z=i+l*h+r*u-o*c,this}project(e){return this.applyMatrix4(e.matrixWorldInverse).applyMatrix4(e.projectionMatrix)}unproject(e){return this.applyMatrix4(e.projectionMatrixInverse).applyMatrix4(e.matrixWorld)}transformDirection(e){const t=this.x,n=this.y,i=this.z,r=e.elements;return this.x=r[0]*t+r[4]*n+r[8]*i,this.y=r[1]*t+r[5]*n+r[9]*i,this.z=r[2]*t+r[6]*n+r[10]*i,this.normalize()}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this}divideScalar(e){return this.multiplyScalar(1/e)}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this}clamp(e,t){return this.x=$e(this.x,e.x,t.x),this.y=$e(this.y,e.y,t.y),this.z=$e(this.z,e.z,t.z),this}clampScalar(e,t){return this.x=$e(this.x,e,t),this.y=$e(this.y,e,t),this.z=$e(this.z,e,t),this}clampLength(e,t){const n=this.length();return this.divideScalar(n||1).multiplyScalar($e(n,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this.z=e.z+(t.z-e.z)*n,this}cross(e){return this.crossVectors(this,e)}crossVectors(e,t){const n=e.x,i=e.y,r=e.z,o=t.x,a=t.y,l=t.z;return this.x=i*l-r*a,this.y=r*o-n*l,this.z=n*a-i*o,this}projectOnVector(e){const t=e.lengthSq();if(t===0)return this.set(0,0,0);const n=e.dot(this)/t;return this.copy(e).multiplyScalar(n)}projectOnPlane(e){return Uo.copy(this).projectOnVector(e),this.sub(Uo)}reflect(e){return this.sub(Uo.copy(e).multiplyScalar(2*this.dot(e)))}angleTo(e){const t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;const n=this.dot(e)/t;return Math.acos($e(n,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){const t=this.x-e.x,n=this.y-e.y,i=this.z-e.z;return t*t+n*n+i*i}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)+Math.abs(this.z-e.z)}setFromSpherical(e){return this.setFromSphericalCoords(e.radius,e.phi,e.theta)}setFromSphericalCoords(e,t,n){const i=Math.sin(t)*e;return this.x=i*Math.sin(n),this.y=Math.cos(t)*e,this.z=i*Math.cos(n),this}setFromCylindrical(e){return this.setFromCylindricalCoords(e.radius,e.theta,e.y)}setFromCylindricalCoords(e,t,n){return this.x=e*Math.sin(t),this.y=n,this.z=e*Math.cos(t),this}setFromMatrixPosition(e){const t=e.elements;return this.x=t[12],this.y=t[13],this.z=t[14],this}setFromMatrixScale(e){const t=this.setFromMatrixColumn(e,0).length(),n=this.setFromMatrixColumn(e,1).length(),i=this.setFromMatrixColumn(e,2).length();return this.x=t,this.y=n,this.z=i,this}setFromMatrixColumn(e,t){return this.fromArray(e.elements,t*4)}setFromMatrix3Column(e,t){return this.fromArray(e.elements,t*3)}setFromEuler(e){return this.x=e._x,this.y=e._y,this.z=e._z,this}setFromColor(e){return this.x=e.r,this.y=e.g,this.z=e.b,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this}randomDirection(){const e=Math.random()*Math.PI*2,t=Math.random()*2-1,n=Math.sqrt(1-t*t);return this.x=n*Math.cos(e),this.y=t,this.z=n*Math.sin(e),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z}}const Uo=new w,bc=new Yt;class Ce{constructor(e,t,n,i,r,o,a,l,c){Ce.prototype.isMatrix3=!0,this.elements=[1,0,0,0,1,0,0,0,1],e!==void 0&&this.set(e,t,n,i,r,o,a,l,c)}set(e,t,n,i,r,o,a,l,c){const u=this.elements;return u[0]=e,u[1]=i,u[2]=a,u[3]=t,u[4]=r,u[5]=l,u[6]=n,u[7]=o,u[8]=c,this}identity(){return this.set(1,0,0,0,1,0,0,0,1),this}copy(e){const t=this.elements,n=e.elements;return t[0]=n[0],t[1]=n[1],t[2]=n[2],t[3]=n[3],t[4]=n[4],t[5]=n[5],t[6]=n[6],t[7]=n[7],t[8]=n[8],this}extractBasis(e,t,n){return e.setFromMatrix3Column(this,0),t.setFromMatrix3Column(this,1),n.setFromMatrix3Column(this,2),this}setFromMatrix4(e){const t=e.elements;return this.set(t[0],t[4],t[8],t[1],t[5],t[9],t[2],t[6],t[10]),this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){const n=e.elements,i=t.elements,r=this.elements,o=n[0],a=n[3],l=n[6],c=n[1],u=n[4],h=n[7],f=n[2],d=n[5],p=n[8],v=i[0],g=i[3],m=i[6],_=i[1],y=i[4],x=i[7],E=i[2],A=i[5],R=i[8];return r[0]=o*v+a*_+l*E,r[3]=o*g+a*y+l*A,r[6]=o*m+a*x+l*R,r[1]=c*v+u*_+h*E,r[4]=c*g+u*y+h*A,r[7]=c*m+u*x+h*R,r[2]=f*v+d*_+p*E,r[5]=f*g+d*y+p*A,r[8]=f*m+d*x+p*R,this}multiplyScalar(e){const t=this.elements;return t[0]*=e,t[3]*=e,t[6]*=e,t[1]*=e,t[4]*=e,t[7]*=e,t[2]*=e,t[5]*=e,t[8]*=e,this}determinant(){const e=this.elements,t=e[0],n=e[1],i=e[2],r=e[3],o=e[4],a=e[5],l=e[6],c=e[7],u=e[8];return t*o*u-t*a*c-n*r*u+n*a*l+i*r*c-i*o*l}invert(){const e=this.elements,t=e[0],n=e[1],i=e[2],r=e[3],o=e[4],a=e[5],l=e[6],c=e[7],u=e[8],h=u*o-a*c,f=a*l-u*r,d=c*r-o*l,p=t*h+n*f+i*d;if(p===0)return this.set(0,0,0,0,0,0,0,0,0);const v=1/p;return e[0]=h*v,e[1]=(i*c-u*n)*v,e[2]=(a*n-i*o)*v,e[3]=f*v,e[4]=(u*t-i*l)*v,e[5]=(i*r-a*t)*v,e[6]=d*v,e[7]=(n*l-c*t)*v,e[8]=(o*t-n*r)*v,this}transpose(){let e;const t=this.elements;return e=t[1],t[1]=t[3],t[3]=e,e=t[2],t[2]=t[6],t[6]=e,e=t[5],t[5]=t[7],t[7]=e,this}getNormalMatrix(e){return this.setFromMatrix4(e).invert().transpose()}transposeIntoArray(e){const t=this.elements;return e[0]=t[0],e[1]=t[3],e[2]=t[6],e[3]=t[1],e[4]=t[4],e[5]=t[7],e[6]=t[2],e[7]=t[5],e[8]=t[8],this}setUvTransform(e,t,n,i,r,o,a){const l=Math.cos(r),c=Math.sin(r);return this.set(n*l,n*c,-n*(l*o+c*a)+o+e,-i*c,i*l,-i*(-c*o+l*a)+a+t,0,0,1),this}scale(e,t){return this.premultiply(Fo.makeScale(e,t)),this}rotate(e){return this.premultiply(Fo.makeRotation(-e)),this}translate(e,t){return this.premultiply(Fo.makeTranslation(e,t)),this}makeTranslation(e,t){return e.isVector2?this.set(1,0,e.x,0,1,e.y,0,0,1):this.set(1,0,e,0,1,t,0,0,1),this}makeRotation(e){const t=Math.cos(e),n=Math.sin(e);return this.set(t,-n,0,n,t,0,0,0,1),this}makeScale(e,t){return this.set(e,0,0,0,t,0,0,0,1),this}equals(e){const t=this.elements,n=e.elements;for(let i=0;i<9;i++)if(t[i]!==n[i])return!1;return!0}fromArray(e,t=0){for(let n=0;n<9;n++)this.elements[n]=e[n+t];return this}toArray(e=[],t=0){const n=this.elements;return e[t]=n[0],e[t+1]=n[1],e[t+2]=n[2],e[t+3]=n[3],e[t+4]=n[4],e[t+5]=n[5],e[t+6]=n[6],e[t+7]=n[7],e[t+8]=n[8],e}clone(){return new this.constructor().fromArray(this.elements)}}const Fo=new Ce;function _h(s){for(let e=s.length-1;e>=0;--e)if(s[e]>=65535)return!0;return!1}function cr(s){return document.createElementNS("http://www.w3.org/1999/xhtml",s)}function Td(){const s=cr("canvas");return s.style.display="block",s}const Tc={};function ur(s){s in Tc||(Tc[s]=!0,console.warn(s))}function Ed(s,e,t){return new Promise(function(n,i){function r(){switch(s.clientWaitSync(e,s.SYNC_FLUSH_COMMANDS_BIT,0)){case s.WAIT_FAILED:i();break;case s.TIMEOUT_EXPIRED:setTimeout(r,t);break;default:n()}}setTimeout(r,t)})}const Ec=new Ce().set(.4123908,.3575843,.1804808,.212639,.7151687,.0721923,.0193308,.1191948,.9505322),wc=new Ce().set(3.2409699,-1.5373832,-.4986108,-.9692436,1.8759675,.0415551,.0556301,-.203977,1.0569715);function wd(){const s={enabled:!0,workingColorSpace:Wt,spaces:{},convert:function(i,r,o){return this.enabled===!1||r===o||!r||!o||(this.spaces[r].transfer===ct&&(i.r=$n(i.r),i.g=$n(i.g),i.b=$n(i.b)),this.spaces[r].primaries!==this.spaces[o].primaries&&(i.applyMatrix3(this.spaces[r].toXYZ),i.applyMatrix3(this.spaces[o].fromXYZ)),this.spaces[o].transfer===ct&&(i.r=as(i.r),i.g=as(i.g),i.b=as(i.b))),i},workingToColorSpace:function(i,r){return this.convert(i,this.workingColorSpace,r)},colorSpaceToWorking:function(i,r){return this.convert(i,r,this.workingColorSpace)},getPrimaries:function(i){return this.spaces[i].primaries},getTransfer:function(i){return i===ci?xo:this.spaces[i].transfer},getToneMappingMode:function(i){return this.spaces[i].outputColorSpaceConfig.toneMappingMode||"standard"},getLuminanceCoefficients:function(i,r=this.workingColorSpace){return i.fromArray(this.spaces[r].luminanceCoefficients)},define:function(i){Object.assign(this.spaces,i)},_getMatrix:function(i,r,o){return i.copy(this.spaces[r].toXYZ).multiply(this.spaces[o].fromXYZ)},_getDrawingBufferColorSpace:function(i){return this.spaces[i].outputColorSpaceConfig.drawingBufferColorSpace},_getUnpackColorSpace:function(i=this.workingColorSpace){return this.spaces[i].workingColorSpaceConfig.unpackColorSpace},fromWorkingColorSpace:function(i,r){return ur("THREE.ColorManagement: .fromWorkingColorSpace() has been renamed to .workingToColorSpace()."),s.workingToColorSpace(i,r)},toWorkingColorSpace:function(i,r){return ur("THREE.ColorManagement: .toWorkingColorSpace() has been renamed to .colorSpaceToWorking()."),s.colorSpaceToWorking(i,r)}},e=[.64,.33,.3,.6,.15,.06],t=[.2126,.7152,.0722],n=[.3127,.329];return s.define({[Wt]:{primaries:e,whitePoint:n,transfer:xo,toXYZ:Ec,fromXYZ:wc,luminanceCoefficients:t,workingColorSpaceConfig:{unpackColorSpace:St},outputColorSpaceConfig:{drawingBufferColorSpace:St}},[St]:{primaries:e,whitePoint:n,transfer:ct,toXYZ:Ec,fromXYZ:wc,luminanceCoefficients:t,outputColorSpaceConfig:{drawingBufferColorSpace:St}}}),s}const et=wd();function $n(s){return s<.04045?s*.0773993808:Math.pow(s*.9478672986+.0521327014,2.4)}function as(s){return s<.0031308?s*12.92:1.055*Math.pow(s,.41666)-.055}let Oi;class Ad{static getDataURL(e,t="image/png"){if(/^data:/i.test(e.src)||typeof HTMLCanvasElement>"u")return e.src;let n;if(e instanceof HTMLCanvasElement)n=e;else{Oi===void 0&&(Oi=cr("canvas")),Oi.width=e.width,Oi.height=e.height;const i=Oi.getContext("2d");e instanceof ImageData?i.putImageData(e,0,0):i.drawImage(e,0,0,e.width,e.height),n=Oi}return n.toDataURL(t)}static sRGBToLinear(e){if(typeof HTMLImageElement<"u"&&e instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&e instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&e instanceof ImageBitmap){const t=cr("canvas");t.width=e.width,t.height=e.height;const n=t.getContext("2d");n.drawImage(e,0,0,e.width,e.height);const i=n.getImageData(0,0,e.width,e.height),r=i.data;for(let o=0;o<r.length;o++)r[o]=$n(r[o]/255)*255;return n.putImageData(i,0,0),t}else if(e.data){const t=e.data.slice(0);for(let n=0;n<t.length;n++)t instanceof Uint8Array||t instanceof Uint8ClampedArray?t[n]=Math.floor($n(t[n]/255)*255):t[n]=$n(t[n]);return{data:t,width:e.width,height:e.height}}else return console.warn("THREE.ImageUtils.sRGBToLinear(): Unsupported image type. No color space conversion applied."),e}}let Rd=0;class kl{constructor(e=null){this.isSource=!0,Object.defineProperty(this,"id",{value:Rd++}),this.uuid=hn(),this.data=e,this.dataReady=!0,this.version=0}getSize(e){const t=this.data;return typeof HTMLVideoElement<"u"&&t instanceof HTMLVideoElement?e.set(t.videoWidth,t.videoHeight,0):t instanceof VideoFrame?e.set(t.displayHeight,t.displayWidth,0):t!==null?e.set(t.width,t.height,t.depth||0):e.set(0,0,0),e}set needsUpdate(e){e===!0&&this.version++}toJSON(e){const t=e===void 0||typeof e=="string";if(!t&&e.images[this.uuid]!==void 0)return e.images[this.uuid];const n={uuid:this.uuid,url:""},i=this.data;if(i!==null){let r;if(Array.isArray(i)){r=[];for(let o=0,a=i.length;o<a;o++)i[o].isDataTexture?r.push(Oo(i[o].image)):r.push(Oo(i[o]))}else r=Oo(i);n.url=r}return t||(e.images[this.uuid]=n),n}}function Oo(s){return typeof HTMLImageElement<"u"&&s instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&s instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&s instanceof ImageBitmap?Ad.getDataURL(s):s.data?{data:Array.from(s.data),width:s.width,height:s.height,type:s.data.constructor.name}:(console.warn("THREE.Texture: Unable to serialize Texture."),{})}let Cd=0;const ko=new w;class At extends Ms{constructor(e=At.DEFAULT_IMAGE,t=At.DEFAULT_MAPPING,n=qn,i=qn,r=_t,o=tn,a=Nt,l=yn,c=At.DEFAULT_ANISOTROPY,u=ci){super(),this.isTexture=!0,Object.defineProperty(this,"id",{value:Cd++}),this.uuid=hn(),this.name="",this.source=new kl(e),this.mipmaps=[],this.mapping=t,this.channel=0,this.wrapS=n,this.wrapT=i,this.magFilter=r,this.minFilter=o,this.anisotropy=c,this.format=a,this.internalFormat=null,this.type=l,this.offset=new ne(0,0),this.repeat=new ne(1,1),this.center=new ne(0,0),this.rotation=0,this.matrixAutoUpdate=!0,this.matrix=new Ce,this.generateMipmaps=!0,this.premultiplyAlpha=!1,this.flipY=!0,this.unpackAlignment=4,this.colorSpace=u,this.userData={},this.updateRanges=[],this.version=0,this.onUpdate=null,this.renderTarget=null,this.isRenderTargetTexture=!1,this.isArrayTexture=!!(e&&e.depth&&e.depth>1),this.pmremVersion=0}get width(){return this.source.getSize(ko).x}get height(){return this.source.getSize(ko).y}get depth(){return this.source.getSize(ko).z}get image(){return this.source.data}set image(e=null){this.source.data=e}updateMatrix(){this.matrix.setUvTransform(this.offset.x,this.offset.y,this.repeat.x,this.repeat.y,this.rotation,this.center.x,this.center.y)}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}clone(){return new this.constructor().copy(this)}copy(e){return this.name=e.name,this.source=e.source,this.mipmaps=e.mipmaps.slice(0),this.mapping=e.mapping,this.channel=e.channel,this.wrapS=e.wrapS,this.wrapT=e.wrapT,this.magFilter=e.magFilter,this.minFilter=e.minFilter,this.anisotropy=e.anisotropy,this.format=e.format,this.internalFormat=e.internalFormat,this.type=e.type,this.offset.copy(e.offset),this.repeat.copy(e.repeat),this.center.copy(e.center),this.rotation=e.rotation,this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrix.copy(e.matrix),this.generateMipmaps=e.generateMipmaps,this.premultiplyAlpha=e.premultiplyAlpha,this.flipY=e.flipY,this.unpackAlignment=e.unpackAlignment,this.colorSpace=e.colorSpace,this.renderTarget=e.renderTarget,this.isRenderTargetTexture=e.isRenderTargetTexture,this.isArrayTexture=e.isArrayTexture,this.userData=JSON.parse(JSON.stringify(e.userData)),this.needsUpdate=!0,this}setValues(e){for(const t in e){const n=e[t];if(n===void 0){console.warn(`THREE.Texture.setValues(): parameter '${t}' has value of undefined.`);continue}const i=this[t];if(i===void 0){console.warn(`THREE.Texture.setValues(): property '${t}' does not exist.`);continue}i&&n&&i.isVector2&&n.isVector2||i&&n&&i.isVector3&&n.isVector3||i&&n&&i.isMatrix3&&n.isMatrix3?i.copy(n):this[t]=n}}toJSON(e){const t=e===void 0||typeof e=="string";if(!t&&e.textures[this.uuid]!==void 0)return e.textures[this.uuid];const n={metadata:{version:4.7,type:"Texture",generator:"Texture.toJSON"},uuid:this.uuid,name:this.name,image:this.source.toJSON(e).uuid,mapping:this.mapping,channel:this.channel,repeat:[this.repeat.x,this.repeat.y],offset:[this.offset.x,this.offset.y],center:[this.center.x,this.center.y],rotation:this.rotation,wrap:[this.wrapS,this.wrapT],format:this.format,internalFormat:this.internalFormat,type:this.type,colorSpace:this.colorSpace,minFilter:this.minFilter,magFilter:this.magFilter,anisotropy:this.anisotropy,flipY:this.flipY,generateMipmaps:this.generateMipmaps,premultiplyAlpha:this.premultiplyAlpha,unpackAlignment:this.unpackAlignment};return Object.keys(this.userData).length>0&&(n.userData=this.userData),t||(e.textures[this.uuid]=n),n}dispose(){this.dispatchEvent({type:"dispose"})}transformUv(e){if(this.mapping!==ah)return e;if(e.applyMatrix3(this.matrix),e.x<0||e.x>1)switch(this.wrapS){case Pi:e.x=e.x-Math.floor(e.x);break;case qn:e.x=e.x<0?0:1;break;case vo:Math.abs(Math.floor(e.x)%2)===1?e.x=Math.ceil(e.x)-e.x:e.x=e.x-Math.floor(e.x);break}if(e.y<0||e.y>1)switch(this.wrapT){case Pi:e.y=e.y-Math.floor(e.y);break;case qn:e.y=e.y<0?0:1;break;case vo:Math.abs(Math.floor(e.y)%2)===1?e.y=Math.ceil(e.y)-e.y:e.y=e.y-Math.floor(e.y);break}return this.flipY&&(e.y=1-e.y),e}set needsUpdate(e){e===!0&&(this.version++,this.source.needsUpdate=!0)}set needsPMREMUpdate(e){e===!0&&this.pmremVersion++}}At.DEFAULT_IMAGE=null;At.DEFAULT_MAPPING=ah;At.DEFAULT_ANISOTROPY=1;class He{constructor(e=0,t=0,n=0,i=1){He.prototype.isVector4=!0,this.x=e,this.y=t,this.z=n,this.w=i}get width(){return this.z}set width(e){this.z=e}get height(){return this.w}set height(e){this.w=e}set(e,t,n,i){return this.x=e,this.y=t,this.z=n,this.w=i,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this.w=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setW(e){return this.w=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;case 3:this.w=t;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;case 3:return this.w;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z,this.w)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this.w=e.w!==void 0?e.w:1,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this.w+=e.w,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this.w+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this.w=e.w+t.w,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this.w+=e.w*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this.w-=e.w,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this.w-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this.w=e.w-t.w,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this.w*=e.w,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this.w*=e,this}applyMatrix4(e){const t=this.x,n=this.y,i=this.z,r=this.w,o=e.elements;return this.x=o[0]*t+o[4]*n+o[8]*i+o[12]*r,this.y=o[1]*t+o[5]*n+o[9]*i+o[13]*r,this.z=o[2]*t+o[6]*n+o[10]*i+o[14]*r,this.w=o[3]*t+o[7]*n+o[11]*i+o[15]*r,this}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this.w/=e.w,this}divideScalar(e){return this.multiplyScalar(1/e)}setAxisAngleFromQuaternion(e){this.w=2*Math.acos(e.w);const t=Math.sqrt(1-e.w*e.w);return t<1e-4?(this.x=1,this.y=0,this.z=0):(this.x=e.x/t,this.y=e.y/t,this.z=e.z/t),this}setAxisAngleFromRotationMatrix(e){let t,n,i,r;const l=e.elements,c=l[0],u=l[4],h=l[8],f=l[1],d=l[5],p=l[9],v=l[2],g=l[6],m=l[10];if(Math.abs(u-f)<.01&&Math.abs(h-v)<.01&&Math.abs(p-g)<.01){if(Math.abs(u+f)<.1&&Math.abs(h+v)<.1&&Math.abs(p+g)<.1&&Math.abs(c+d+m-3)<.1)return this.set(1,0,0,0),this;t=Math.PI;const y=(c+1)/2,x=(d+1)/2,E=(m+1)/2,A=(u+f)/4,R=(h+v)/4,L=(p+g)/4;return y>x&&y>E?y<.01?(n=0,i=.707106781,r=.707106781):(n=Math.sqrt(y),i=A/n,r=R/n):x>E?x<.01?(n=.707106781,i=0,r=.707106781):(i=Math.sqrt(x),n=A/i,r=L/i):E<.01?(n=.707106781,i=.707106781,r=0):(r=Math.sqrt(E),n=R/r,i=L/r),this.set(n,i,r,t),this}let _=Math.sqrt((g-p)*(g-p)+(h-v)*(h-v)+(f-u)*(f-u));return Math.abs(_)<.001&&(_=1),this.x=(g-p)/_,this.y=(h-v)/_,this.z=(f-u)/_,this.w=Math.acos((c+d+m-1)/2),this}setFromMatrixPosition(e){const t=e.elements;return this.x=t[12],this.y=t[13],this.z=t[14],this.w=t[15],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this.w=Math.min(this.w,e.w),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this.w=Math.max(this.w,e.w),this}clamp(e,t){return this.x=$e(this.x,e.x,t.x),this.y=$e(this.y,e.y,t.y),this.z=$e(this.z,e.z,t.z),this.w=$e(this.w,e.w,t.w),this}clampScalar(e,t){return this.x=$e(this.x,e,t),this.y=$e(this.y,e,t),this.z=$e(this.z,e,t),this.w=$e(this.w,e,t),this}clampLength(e,t){const n=this.length();return this.divideScalar(n||1).multiplyScalar($e(n,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this.w=Math.floor(this.w),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this.w=Math.ceil(this.w),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this.w=Math.round(this.w),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this.w=Math.trunc(this.w),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this.w=-this.w,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z+this.w*e.w}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)+Math.abs(this.w)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this.w+=(e.w-this.w)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this.z=e.z+(t.z-e.z)*n,this.w=e.w+(t.w-e.w)*n,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z&&e.w===this.w}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this.w=e[t+3],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e[t+3]=this.w,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this.w=e.getW(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this.w=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z,yield this.w}}class Pd extends Ms{constructor(e=1,t=1,n={}){super(),n=Object.assign({generateMipmaps:!1,internalFormat:null,minFilter:_t,depthBuffer:!0,stencilBuffer:!1,resolveDepthBuffer:!0,resolveStencilBuffer:!0,depthTexture:null,samples:0,count:1,depth:1,multiview:!1},n),this.isRenderTarget=!0,this.width=e,this.height=t,this.depth=n.depth,this.scissor=new He(0,0,e,t),this.scissorTest=!1,this.viewport=new He(0,0,e,t);const i={width:e,height:t,depth:n.depth},r=new At(i);this.textures=[];const o=n.count;for(let a=0;a<o;a++)this.textures[a]=r.clone(),this.textures[a].isRenderTargetTexture=!0,this.textures[a].renderTarget=this;this._setTextureOptions(n),this.depthBuffer=n.depthBuffer,this.stencilBuffer=n.stencilBuffer,this.resolveDepthBuffer=n.resolveDepthBuffer,this.resolveStencilBuffer=n.resolveStencilBuffer,this._depthTexture=null,this.depthTexture=n.depthTexture,this.samples=n.samples,this.multiview=n.multiview}_setTextureOptions(e={}){const t={minFilter:_t,generateMipmaps:!1,flipY:!1,internalFormat:null};e.mapping!==void 0&&(t.mapping=e.mapping),e.wrapS!==void 0&&(t.wrapS=e.wrapS),e.wrapT!==void 0&&(t.wrapT=e.wrapT),e.wrapR!==void 0&&(t.wrapR=e.wrapR),e.magFilter!==void 0&&(t.magFilter=e.magFilter),e.minFilter!==void 0&&(t.minFilter=e.minFilter),e.format!==void 0&&(t.format=e.format),e.type!==void 0&&(t.type=e.type),e.anisotropy!==void 0&&(t.anisotropy=e.anisotropy),e.colorSpace!==void 0&&(t.colorSpace=e.colorSpace),e.flipY!==void 0&&(t.flipY=e.flipY),e.generateMipmaps!==void 0&&(t.generateMipmaps=e.generateMipmaps),e.internalFormat!==void 0&&(t.internalFormat=e.internalFormat);for(let n=0;n<this.textures.length;n++)this.textures[n].setValues(t)}get texture(){return this.textures[0]}set texture(e){this.textures[0]=e}set depthTexture(e){this._depthTexture!==null&&(this._depthTexture.renderTarget=null),e!==null&&(e.renderTarget=this),this._depthTexture=e}get depthTexture(){return this._depthTexture}setSize(e,t,n=1){if(this.width!==e||this.height!==t||this.depth!==n){this.width=e,this.height=t,this.depth=n;for(let i=0,r=this.textures.length;i<r;i++)this.textures[i].image.width=e,this.textures[i].image.height=t,this.textures[i].image.depth=n,this.textures[i].isArrayTexture=this.textures[i].image.depth>1;this.dispose()}this.viewport.set(0,0,e,t),this.scissor.set(0,0,e,t)}clone(){return new this.constructor().copy(this)}copy(e){this.width=e.width,this.height=e.height,this.depth=e.depth,this.scissor.copy(e.scissor),this.scissorTest=e.scissorTest,this.viewport.copy(e.viewport),this.textures.length=0;for(let t=0,n=e.textures.length;t<n;t++){this.textures[t]=e.textures[t].clone(),this.textures[t].isRenderTargetTexture=!0,this.textures[t].renderTarget=this;const i=Object.assign({},e.textures[t].image);this.textures[t].source=new kl(i)}return this.depthBuffer=e.depthBuffer,this.stencilBuffer=e.stencilBuffer,this.resolveDepthBuffer=e.resolveDepthBuffer,this.resolveStencilBuffer=e.resolveStencilBuffer,e.depthTexture!==null&&(this.depthTexture=e.depthTexture.clone()),this.samples=e.samples,this}dispose(){this.dispatchEvent({type:"dispose"})}}class Ln extends Pd{constructor(e=1,t=1,n={}){super(e,t,n),this.isWebGLRenderTarget=!0}}class yh extends At{constructor(e=null,t=1,n=1,i=1){super(null),this.isDataArrayTexture=!0,this.image={data:e,width:t,height:n,depth:i},this.magFilter=Vt,this.minFilter=Vt,this.wrapR=qn,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1,this.layerUpdates=new Set}addLayerUpdate(e){this.layerUpdates.add(e)}clearLayerUpdates(){this.layerUpdates.clear()}}class Ld extends At{constructor(e=null,t=1,n=1,i=1){super(null),this.isData3DTexture=!0,this.image={data:e,width:t,height:n,depth:i},this.magFilter=Vt,this.minFilter=Vt,this.wrapR=qn,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}class Jn{constructor(e=new w(1/0,1/0,1/0),t=new w(-1/0,-1/0,-1/0)){this.isBox3=!0,this.min=e,this.max=t}set(e,t){return this.min.copy(e),this.max.copy(t),this}setFromArray(e){this.makeEmpty();for(let t=0,n=e.length;t<n;t+=3)this.expandByPoint(fn.fromArray(e,t));return this}setFromBufferAttribute(e){this.makeEmpty();for(let t=0,n=e.count;t<n;t++)this.expandByPoint(fn.fromBufferAttribute(e,t));return this}setFromPoints(e){this.makeEmpty();for(let t=0,n=e.length;t<n;t++)this.expandByPoint(e[t]);return this}setFromCenterAndSize(e,t){const n=fn.copy(t).multiplyScalar(.5);return this.min.copy(e).sub(n),this.max.copy(e).add(n),this}setFromObject(e,t=!1){return this.makeEmpty(),this.expandByObject(e,t)}clone(){return new this.constructor().copy(this)}copy(e){return this.min.copy(e.min),this.max.copy(e.max),this}makeEmpty(){return this.min.x=this.min.y=this.min.z=1/0,this.max.x=this.max.y=this.max.z=-1/0,this}isEmpty(){return this.max.x<this.min.x||this.max.y<this.min.y||this.max.z<this.min.z}getCenter(e){return this.isEmpty()?e.set(0,0,0):e.addVectors(this.min,this.max).multiplyScalar(.5)}getSize(e){return this.isEmpty()?e.set(0,0,0):e.subVectors(this.max,this.min)}expandByPoint(e){return this.min.min(e),this.max.max(e),this}expandByVector(e){return this.min.sub(e),this.max.add(e),this}expandByScalar(e){return this.min.addScalar(-e),this.max.addScalar(e),this}expandByObject(e,t=!1){e.updateWorldMatrix(!1,!1);const n=e.geometry;if(n!==void 0){const r=n.getAttribute("position");if(t===!0&&r!==void 0&&e.isInstancedMesh!==!0)for(let o=0,a=r.count;o<a;o++)e.isMesh===!0?e.getVertexPosition(o,fn):fn.fromBufferAttribute(r,o),fn.applyMatrix4(e.matrixWorld),this.expandByPoint(fn);else e.boundingBox!==void 0?(e.boundingBox===null&&e.computeBoundingBox(),Mr.copy(e.boundingBox)):(n.boundingBox===null&&n.computeBoundingBox(),Mr.copy(n.boundingBox)),Mr.applyMatrix4(e.matrixWorld),this.union(Mr)}const i=e.children;for(let r=0,o=i.length;r<o;r++)this.expandByObject(i[r],t);return this}containsPoint(e){return e.x>=this.min.x&&e.x<=this.max.x&&e.y>=this.min.y&&e.y<=this.max.y&&e.z>=this.min.z&&e.z<=this.max.z}containsBox(e){return this.min.x<=e.min.x&&e.max.x<=this.max.x&&this.min.y<=e.min.y&&e.max.y<=this.max.y&&this.min.z<=e.min.z&&e.max.z<=this.max.z}getParameter(e,t){return t.set((e.x-this.min.x)/(this.max.x-this.min.x),(e.y-this.min.y)/(this.max.y-this.min.y),(e.z-this.min.z)/(this.max.z-this.min.z))}intersectsBox(e){return e.max.x>=this.min.x&&e.min.x<=this.max.x&&e.max.y>=this.min.y&&e.min.y<=this.max.y&&e.max.z>=this.min.z&&e.min.z<=this.max.z}intersectsSphere(e){return this.clampPoint(e.center,fn),fn.distanceToSquared(e.center)<=e.radius*e.radius}intersectsPlane(e){let t,n;return e.normal.x>0?(t=e.normal.x*this.min.x,n=e.normal.x*this.max.x):(t=e.normal.x*this.max.x,n=e.normal.x*this.min.x),e.normal.y>0?(t+=e.normal.y*this.min.y,n+=e.normal.y*this.max.y):(t+=e.normal.y*this.max.y,n+=e.normal.y*this.min.y),e.normal.z>0?(t+=e.normal.z*this.min.z,n+=e.normal.z*this.max.z):(t+=e.normal.z*this.max.z,n+=e.normal.z*this.min.z),t<=-e.constant&&n>=-e.constant}intersectsTriangle(e){if(this.isEmpty())return!1;this.getCenter(Rs),Sr.subVectors(this.max,Rs),ki.subVectors(e.a,Rs),Bi.subVectors(e.b,Rs),zi.subVectors(e.c,Rs),ei.subVectors(Bi,ki),ti.subVectors(zi,Bi),gi.subVectors(ki,zi);let t=[0,-ei.z,ei.y,0,-ti.z,ti.y,0,-gi.z,gi.y,ei.z,0,-ei.x,ti.z,0,-ti.x,gi.z,0,-gi.x,-ei.y,ei.x,0,-ti.y,ti.x,0,-gi.y,gi.x,0];return!Bo(t,ki,Bi,zi,Sr)||(t=[1,0,0,0,1,0,0,0,1],!Bo(t,ki,Bi,zi,Sr))?!1:(br.crossVectors(ei,ti),t=[br.x,br.y,br.z],Bo(t,ki,Bi,zi,Sr))}clampPoint(e,t){return t.copy(e).clamp(this.min,this.max)}distanceToPoint(e){return this.clampPoint(e,fn).distanceTo(e)}getBoundingSphere(e){return this.isEmpty()?e.makeEmpty():(this.getCenter(e.center),e.radius=this.getSize(fn).length()*.5),e}intersect(e){return this.min.max(e.min),this.max.min(e.max),this.isEmpty()&&this.makeEmpty(),this}union(e){return this.min.min(e.min),this.max.max(e.max),this}applyMatrix4(e){return this.isEmpty()?this:(Fn[0].set(this.min.x,this.min.y,this.min.z).applyMatrix4(e),Fn[1].set(this.min.x,this.min.y,this.max.z).applyMatrix4(e),Fn[2].set(this.min.x,this.max.y,this.min.z).applyMatrix4(e),Fn[3].set(this.min.x,this.max.y,this.max.z).applyMatrix4(e),Fn[4].set(this.max.x,this.min.y,this.min.z).applyMatrix4(e),Fn[5].set(this.max.x,this.min.y,this.max.z).applyMatrix4(e),Fn[6].set(this.max.x,this.max.y,this.min.z).applyMatrix4(e),Fn[7].set(this.max.x,this.max.y,this.max.z).applyMatrix4(e),this.setFromPoints(Fn),this)}translate(e){return this.min.add(e),this.max.add(e),this}equals(e){return e.min.equals(this.min)&&e.max.equals(this.max)}toJSON(){return{min:this.min.toArray(),max:this.max.toArray()}}fromJSON(e){return this.min.fromArray(e.min),this.max.fromArray(e.max),this}}const Fn=[new w,new w,new w,new w,new w,new w,new w,new w],fn=new w,Mr=new Jn,ki=new w,Bi=new w,zi=new w,ei=new w,ti=new w,gi=new w,Rs=new w,Sr=new w,br=new w,vi=new w;function Bo(s,e,t,n,i){for(let r=0,o=s.length-3;r<=o;r+=3){vi.fromArray(s,r);const a=i.x*Math.abs(vi.x)+i.y*Math.abs(vi.y)+i.z*Math.abs(vi.z),l=e.dot(vi),c=t.dot(vi),u=n.dot(vi);if(Math.max(-Math.max(l,c,u),Math.min(l,c,u))>a)return!1}return!0}const Id=new Jn,Cs=new w,zo=new w;class In{constructor(e=new w,t=-1){this.isSphere=!0,this.center=e,this.radius=t}set(e,t){return this.center.copy(e),this.radius=t,this}setFromPoints(e,t){const n=this.center;t!==void 0?n.copy(t):Id.setFromPoints(e).getCenter(n);let i=0;for(let r=0,o=e.length;r<o;r++)i=Math.max(i,n.distanceToSquared(e[r]));return this.radius=Math.sqrt(i),this}copy(e){return this.center.copy(e.center),this.radius=e.radius,this}isEmpty(){return this.radius<0}makeEmpty(){return this.center.set(0,0,0),this.radius=-1,this}containsPoint(e){return e.distanceToSquared(this.center)<=this.radius*this.radius}distanceToPoint(e){return e.distanceTo(this.center)-this.radius}intersectsSphere(e){const t=this.radius+e.radius;return e.center.distanceToSquared(this.center)<=t*t}intersectsBox(e){return e.intersectsSphere(this)}intersectsPlane(e){return Math.abs(e.distanceToPoint(this.center))<=this.radius}clampPoint(e,t){const n=this.center.distanceToSquared(e);return t.copy(e),n>this.radius*this.radius&&(t.sub(this.center).normalize(),t.multiplyScalar(this.radius).add(this.center)),t}getBoundingBox(e){return this.isEmpty()?(e.makeEmpty(),e):(e.set(this.center,this.center),e.expandByScalar(this.radius),e)}applyMatrix4(e){return this.center.applyMatrix4(e),this.radius=this.radius*e.getMaxScaleOnAxis(),this}translate(e){return this.center.add(e),this}expandByPoint(e){if(this.isEmpty())return this.center.copy(e),this.radius=0,this;Cs.subVectors(e,this.center);const t=Cs.lengthSq();if(t>this.radius*this.radius){const n=Math.sqrt(t),i=(n-this.radius)*.5;this.center.addScaledVector(Cs,i/n),this.radius+=i}return this}union(e){return e.isEmpty()?this:this.isEmpty()?(this.copy(e),this):(this.center.equals(e.center)===!0?this.radius=Math.max(this.radius,e.radius):(zo.subVectors(e.center,this.center).setLength(e.radius),this.expandByPoint(Cs.copy(e.center).add(zo)),this.expandByPoint(Cs.copy(e.center).sub(zo))),this)}equals(e){return e.center.equals(this.center)&&e.radius===this.radius}clone(){return new this.constructor().copy(this)}toJSON(){return{radius:this.radius,center:this.center.toArray()}}fromJSON(e){return this.radius=e.radius,this.center.fromArray(e.center),this}}const On=new w,Ho=new w,Tr=new w,ni=new w,Vo=new w,Er=new w,Go=new w;class gr{constructor(e=new w,t=new w(0,0,-1)){this.origin=e,this.direction=t}set(e,t){return this.origin.copy(e),this.direction.copy(t),this}copy(e){return this.origin.copy(e.origin),this.direction.copy(e.direction),this}at(e,t){return t.copy(this.origin).addScaledVector(this.direction,e)}lookAt(e){return this.direction.copy(e).sub(this.origin).normalize(),this}recast(e){return this.origin.copy(this.at(e,On)),this}closestPointToPoint(e,t){t.subVectors(e,this.origin);const n=t.dot(this.direction);return n<0?t.copy(this.origin):t.copy(this.origin).addScaledVector(this.direction,n)}distanceToPoint(e){return Math.sqrt(this.distanceSqToPoint(e))}distanceSqToPoint(e){const t=On.subVectors(e,this.origin).dot(this.direction);return t<0?this.origin.distanceToSquared(e):(On.copy(this.origin).addScaledVector(this.direction,t),On.distanceToSquared(e))}distanceSqToSegment(e,t,n,i){Ho.copy(e).add(t).multiplyScalar(.5),Tr.copy(t).sub(e).normalize(),ni.copy(this.origin).sub(Ho);const r=e.distanceTo(t)*.5,o=-this.direction.dot(Tr),a=ni.dot(this.direction),l=-ni.dot(Tr),c=ni.lengthSq(),u=Math.abs(1-o*o);let h,f,d,p;if(u>0)if(h=o*l-a,f=o*a-l,p=r*u,h>=0)if(f>=-p)if(f<=p){const v=1/u;h*=v,f*=v,d=h*(h+o*f+2*a)+f*(o*h+f+2*l)+c}else f=r,h=Math.max(0,-(o*f+a)),d=-h*h+f*(f+2*l)+c;else f=-r,h=Math.max(0,-(o*f+a)),d=-h*h+f*(f+2*l)+c;else f<=-p?(h=Math.max(0,-(-o*r+a)),f=h>0?-r:Math.min(Math.max(-r,-l),r),d=-h*h+f*(f+2*l)+c):f<=p?(h=0,f=Math.min(Math.max(-r,-l),r),d=f*(f+2*l)+c):(h=Math.max(0,-(o*r+a)),f=h>0?r:Math.min(Math.max(-r,-l),r),d=-h*h+f*(f+2*l)+c);else f=o>0?-r:r,h=Math.max(0,-(o*f+a)),d=-h*h+f*(f+2*l)+c;return n&&n.copy(this.origin).addScaledVector(this.direction,h),i&&i.copy(Ho).addScaledVector(Tr,f),d}intersectSphere(e,t){On.subVectors(e.center,this.origin);const n=On.dot(this.direction),i=On.dot(On)-n*n,r=e.radius*e.radius;if(i>r)return null;const o=Math.sqrt(r-i),a=n-o,l=n+o;return l<0?null:a<0?this.at(l,t):this.at(a,t)}intersectsSphere(e){return e.radius<0?!1:this.distanceSqToPoint(e.center)<=e.radius*e.radius}distanceToPlane(e){const t=e.normal.dot(this.direction);if(t===0)return e.distanceToPoint(this.origin)===0?0:null;const n=-(this.origin.dot(e.normal)+e.constant)/t;return n>=0?n:null}intersectPlane(e,t){const n=this.distanceToPlane(e);return n===null?null:this.at(n,t)}intersectsPlane(e){const t=e.distanceToPoint(this.origin);return t===0||e.normal.dot(this.direction)*t<0}intersectBox(e,t){let n,i,r,o,a,l;const c=1/this.direction.x,u=1/this.direction.y,h=1/this.direction.z,f=this.origin;return c>=0?(n=(e.min.x-f.x)*c,i=(e.max.x-f.x)*c):(n=(e.max.x-f.x)*c,i=(e.min.x-f.x)*c),u>=0?(r=(e.min.y-f.y)*u,o=(e.max.y-f.y)*u):(r=(e.max.y-f.y)*u,o=(e.min.y-f.y)*u),n>o||r>i||((r>n||isNaN(n))&&(n=r),(o<i||isNaN(i))&&(i=o),h>=0?(a=(e.min.z-f.z)*h,l=(e.max.z-f.z)*h):(a=(e.max.z-f.z)*h,l=(e.min.z-f.z)*h),n>l||a>i)||((a>n||n!==n)&&(n=a),(l<i||i!==i)&&(i=l),i<0)?null:this.at(n>=0?n:i,t)}intersectsBox(e){return this.intersectBox(e,On)!==null}intersectTriangle(e,t,n,i,r){Vo.subVectors(t,e),Er.subVectors(n,e),Go.crossVectors(Vo,Er);let o=this.direction.dot(Go),a;if(o>0){if(i)return null;a=1}else if(o<0)a=-1,o=-o;else return null;ni.subVectors(this.origin,e);const l=a*this.direction.dot(Er.crossVectors(ni,Er));if(l<0)return null;const c=a*this.direction.dot(Vo.cross(ni));if(c<0||l+c>o)return null;const u=-a*ni.dot(Go);return u<0?null:this.at(u/o,r)}applyMatrix4(e){return this.origin.applyMatrix4(e),this.direction.transformDirection(e),this}equals(e){return e.origin.equals(this.origin)&&e.direction.equals(this.direction)}clone(){return new this.constructor().copy(this)}}class Le{constructor(e,t,n,i,r,o,a,l,c,u,h,f,d,p,v,g){Le.prototype.isMatrix4=!0,this.elements=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],e!==void 0&&this.set(e,t,n,i,r,o,a,l,c,u,h,f,d,p,v,g)}set(e,t,n,i,r,o,a,l,c,u,h,f,d,p,v,g){const m=this.elements;return m[0]=e,m[4]=t,m[8]=n,m[12]=i,m[1]=r,m[5]=o,m[9]=a,m[13]=l,m[2]=c,m[6]=u,m[10]=h,m[14]=f,m[3]=d,m[7]=p,m[11]=v,m[15]=g,this}identity(){return this.set(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1),this}clone(){return new Le().fromArray(this.elements)}copy(e){const t=this.elements,n=e.elements;return t[0]=n[0],t[1]=n[1],t[2]=n[2],t[3]=n[3],t[4]=n[4],t[5]=n[5],t[6]=n[6],t[7]=n[7],t[8]=n[8],t[9]=n[9],t[10]=n[10],t[11]=n[11],t[12]=n[12],t[13]=n[13],t[14]=n[14],t[15]=n[15],this}copyPosition(e){const t=this.elements,n=e.elements;return t[12]=n[12],t[13]=n[13],t[14]=n[14],this}setFromMatrix3(e){const t=e.elements;return this.set(t[0],t[3],t[6],0,t[1],t[4],t[7],0,t[2],t[5],t[8],0,0,0,0,1),this}extractBasis(e,t,n){return e.setFromMatrixColumn(this,0),t.setFromMatrixColumn(this,1),n.setFromMatrixColumn(this,2),this}makeBasis(e,t,n){return this.set(e.x,t.x,n.x,0,e.y,t.y,n.y,0,e.z,t.z,n.z,0,0,0,0,1),this}extractRotation(e){const t=this.elements,n=e.elements,i=1/Hi.setFromMatrixColumn(e,0).length(),r=1/Hi.setFromMatrixColumn(e,1).length(),o=1/Hi.setFromMatrixColumn(e,2).length();return t[0]=n[0]*i,t[1]=n[1]*i,t[2]=n[2]*i,t[3]=0,t[4]=n[4]*r,t[5]=n[5]*r,t[6]=n[6]*r,t[7]=0,t[8]=n[8]*o,t[9]=n[9]*o,t[10]=n[10]*o,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromEuler(e){const t=this.elements,n=e.x,i=e.y,r=e.z,o=Math.cos(n),a=Math.sin(n),l=Math.cos(i),c=Math.sin(i),u=Math.cos(r),h=Math.sin(r);if(e.order==="XYZ"){const f=o*u,d=o*h,p=a*u,v=a*h;t[0]=l*u,t[4]=-l*h,t[8]=c,t[1]=d+p*c,t[5]=f-v*c,t[9]=-a*l,t[2]=v-f*c,t[6]=p+d*c,t[10]=o*l}else if(e.order==="YXZ"){const f=l*u,d=l*h,p=c*u,v=c*h;t[0]=f+v*a,t[4]=p*a-d,t[8]=o*c,t[1]=o*h,t[5]=o*u,t[9]=-a,t[2]=d*a-p,t[6]=v+f*a,t[10]=o*l}else if(e.order==="ZXY"){const f=l*u,d=l*h,p=c*u,v=c*h;t[0]=f-v*a,t[4]=-o*h,t[8]=p+d*a,t[1]=d+p*a,t[5]=o*u,t[9]=v-f*a,t[2]=-o*c,t[6]=a,t[10]=o*l}else if(e.order==="ZYX"){const f=o*u,d=o*h,p=a*u,v=a*h;t[0]=l*u,t[4]=p*c-d,t[8]=f*c+v,t[1]=l*h,t[5]=v*c+f,t[9]=d*c-p,t[2]=-c,t[6]=a*l,t[10]=o*l}else if(e.order==="YZX"){const f=o*l,d=o*c,p=a*l,v=a*c;t[0]=l*u,t[4]=v-f*h,t[8]=p*h+d,t[1]=h,t[5]=o*u,t[9]=-a*u,t[2]=-c*u,t[6]=d*h+p,t[10]=f-v*h}else if(e.order==="XZY"){const f=o*l,d=o*c,p=a*l,v=a*c;t[0]=l*u,t[4]=-h,t[8]=c*u,t[1]=f*h+v,t[5]=o*u,t[9]=d*h-p,t[2]=p*h-d,t[6]=a*u,t[10]=v*h+f}return t[3]=0,t[7]=0,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromQuaternion(e){return this.compose(Dd,e,Nd)}lookAt(e,t,n){const i=this.elements;return Qt.subVectors(e,t),Qt.lengthSq()===0&&(Qt.z=1),Qt.normalize(),ii.crossVectors(n,Qt),ii.lengthSq()===0&&(Math.abs(n.z)===1?Qt.x+=1e-4:Qt.z+=1e-4,Qt.normalize(),ii.crossVectors(n,Qt)),ii.normalize(),wr.crossVectors(Qt,ii),i[0]=ii.x,i[4]=wr.x,i[8]=Qt.x,i[1]=ii.y,i[5]=wr.y,i[9]=Qt.y,i[2]=ii.z,i[6]=wr.z,i[10]=Qt.z,this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){const n=e.elements,i=t.elements,r=this.elements,o=n[0],a=n[4],l=n[8],c=n[12],u=n[1],h=n[5],f=n[9],d=n[13],p=n[2],v=n[6],g=n[10],m=n[14],_=n[3],y=n[7],x=n[11],E=n[15],A=i[0],R=i[4],L=i[8],b=i[12],M=i[1],P=i[5],D=i[9],O=i[13],V=i[2],B=i[6],W=i[10],K=i[14],G=i[3],le=i[7],de=i[11],pe=i[15];return r[0]=o*A+a*M+l*V+c*G,r[4]=o*R+a*P+l*B+c*le,r[8]=o*L+a*D+l*W+c*de,r[12]=o*b+a*O+l*K+c*pe,r[1]=u*A+h*M+f*V+d*G,r[5]=u*R+h*P+f*B+d*le,r[9]=u*L+h*D+f*W+d*de,r[13]=u*b+h*O+f*K+d*pe,r[2]=p*A+v*M+g*V+m*G,r[6]=p*R+v*P+g*B+m*le,r[10]=p*L+v*D+g*W+m*de,r[14]=p*b+v*O+g*K+m*pe,r[3]=_*A+y*M+x*V+E*G,r[7]=_*R+y*P+x*B+E*le,r[11]=_*L+y*D+x*W+E*de,r[15]=_*b+y*O+x*K+E*pe,this}multiplyScalar(e){const t=this.elements;return t[0]*=e,t[4]*=e,t[8]*=e,t[12]*=e,t[1]*=e,t[5]*=e,t[9]*=e,t[13]*=e,t[2]*=e,t[6]*=e,t[10]*=e,t[14]*=e,t[3]*=e,t[7]*=e,t[11]*=e,t[15]*=e,this}determinant(){const e=this.elements,t=e[0],n=e[4],i=e[8],r=e[12],o=e[1],a=e[5],l=e[9],c=e[13],u=e[2],h=e[6],f=e[10],d=e[14],p=e[3],v=e[7],g=e[11],m=e[15];return p*(+r*l*h-i*c*h-r*a*f+n*c*f+i*a*d-n*l*d)+v*(+t*l*d-t*c*f+r*o*f-i*o*d+i*c*u-r*l*u)+g*(+t*c*h-t*a*d-r*o*h+n*o*d+r*a*u-n*c*u)+m*(-i*a*u-t*l*h+t*a*f+i*o*h-n*o*f+n*l*u)}transpose(){const e=this.elements;let t;return t=e[1],e[1]=e[4],e[4]=t,t=e[2],e[2]=e[8],e[8]=t,t=e[6],e[6]=e[9],e[9]=t,t=e[3],e[3]=e[12],e[12]=t,t=e[7],e[7]=e[13],e[13]=t,t=e[11],e[11]=e[14],e[14]=t,this}setPosition(e,t,n){const i=this.elements;return e.isVector3?(i[12]=e.x,i[13]=e.y,i[14]=e.z):(i[12]=e,i[13]=t,i[14]=n),this}invert(){const e=this.elements,t=e[0],n=e[1],i=e[2],r=e[3],o=e[4],a=e[5],l=e[6],c=e[7],u=e[8],h=e[9],f=e[10],d=e[11],p=e[12],v=e[13],g=e[14],m=e[15],_=h*g*c-v*f*c+v*l*d-a*g*d-h*l*m+a*f*m,y=p*f*c-u*g*c-p*l*d+o*g*d+u*l*m-o*f*m,x=u*v*c-p*h*c+p*a*d-o*v*d-u*a*m+o*h*m,E=p*h*l-u*v*l-p*a*f+o*v*f+u*a*g-o*h*g,A=t*_+n*y+i*x+r*E;if(A===0)return this.set(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);const R=1/A;return e[0]=_*R,e[1]=(v*f*r-h*g*r-v*i*d+n*g*d+h*i*m-n*f*m)*R,e[2]=(a*g*r-v*l*r+v*i*c-n*g*c-a*i*m+n*l*m)*R,e[3]=(h*l*r-a*f*r-h*i*c+n*f*c+a*i*d-n*l*d)*R,e[4]=y*R,e[5]=(u*g*r-p*f*r+p*i*d-t*g*d-u*i*m+t*f*m)*R,e[6]=(p*l*r-o*g*r-p*i*c+t*g*c+o*i*m-t*l*m)*R,e[7]=(o*f*r-u*l*r+u*i*c-t*f*c-o*i*d+t*l*d)*R,e[8]=x*R,e[9]=(p*h*r-u*v*r-p*n*d+t*v*d+u*n*m-t*h*m)*R,e[10]=(o*v*r-p*a*r+p*n*c-t*v*c-o*n*m+t*a*m)*R,e[11]=(u*a*r-o*h*r-u*n*c+t*h*c+o*n*d-t*a*d)*R,e[12]=E*R,e[13]=(u*v*i-p*h*i+p*n*f-t*v*f-u*n*g+t*h*g)*R,e[14]=(p*a*i-o*v*i-p*n*l+t*v*l+o*n*g-t*a*g)*R,e[15]=(o*h*i-u*a*i+u*n*l-t*h*l-o*n*f+t*a*f)*R,this}scale(e){const t=this.elements,n=e.x,i=e.y,r=e.z;return t[0]*=n,t[4]*=i,t[8]*=r,t[1]*=n,t[5]*=i,t[9]*=r,t[2]*=n,t[6]*=i,t[10]*=r,t[3]*=n,t[7]*=i,t[11]*=r,this}getMaxScaleOnAxis(){const e=this.elements,t=e[0]*e[0]+e[1]*e[1]+e[2]*e[2],n=e[4]*e[4]+e[5]*e[5]+e[6]*e[6],i=e[8]*e[8]+e[9]*e[9]+e[10]*e[10];return Math.sqrt(Math.max(t,n,i))}makeTranslation(e,t,n){return e.isVector3?this.set(1,0,0,e.x,0,1,0,e.y,0,0,1,e.z,0,0,0,1):this.set(1,0,0,e,0,1,0,t,0,0,1,n,0,0,0,1),this}makeRotationX(e){const t=Math.cos(e),n=Math.sin(e);return this.set(1,0,0,0,0,t,-n,0,0,n,t,0,0,0,0,1),this}makeRotationY(e){const t=Math.cos(e),n=Math.sin(e);return this.set(t,0,n,0,0,1,0,0,-n,0,t,0,0,0,0,1),this}makeRotationZ(e){const t=Math.cos(e),n=Math.sin(e);return this.set(t,-n,0,0,n,t,0,0,0,0,1,0,0,0,0,1),this}makeRotationAxis(e,t){const n=Math.cos(t),i=Math.sin(t),r=1-n,o=e.x,a=e.y,l=e.z,c=r*o,u=r*a;return this.set(c*o+n,c*a-i*l,c*l+i*a,0,c*a+i*l,u*a+n,u*l-i*o,0,c*l-i*a,u*l+i*o,r*l*l+n,0,0,0,0,1),this}makeScale(e,t,n){return this.set(e,0,0,0,0,t,0,0,0,0,n,0,0,0,0,1),this}makeShear(e,t,n,i,r,o){return this.set(1,n,r,0,e,1,o,0,t,i,1,0,0,0,0,1),this}compose(e,t,n){const i=this.elements,r=t._x,o=t._y,a=t._z,l=t._w,c=r+r,u=o+o,h=a+a,f=r*c,d=r*u,p=r*h,v=o*u,g=o*h,m=a*h,_=l*c,y=l*u,x=l*h,E=n.x,A=n.y,R=n.z;return i[0]=(1-(v+m))*E,i[1]=(d+x)*E,i[2]=(p-y)*E,i[3]=0,i[4]=(d-x)*A,i[5]=(1-(f+m))*A,i[6]=(g+_)*A,i[7]=0,i[8]=(p+y)*R,i[9]=(g-_)*R,i[10]=(1-(f+v))*R,i[11]=0,i[12]=e.x,i[13]=e.y,i[14]=e.z,i[15]=1,this}decompose(e,t,n){const i=this.elements;let r=Hi.set(i[0],i[1],i[2]).length();const o=Hi.set(i[4],i[5],i[6]).length(),a=Hi.set(i[8],i[9],i[10]).length();this.determinant()<0&&(r=-r),e.x=i[12],e.y=i[13],e.z=i[14],dn.copy(this);const c=1/r,u=1/o,h=1/a;return dn.elements[0]*=c,dn.elements[1]*=c,dn.elements[2]*=c,dn.elements[4]*=u,dn.elements[5]*=u,dn.elements[6]*=u,dn.elements[8]*=h,dn.elements[9]*=h,dn.elements[10]*=h,t.setFromRotationMatrix(dn),n.x=r,n.y=o,n.z=a,this}makePerspective(e,t,n,i,r,o,a=Cn,l=!1){const c=this.elements,u=2*r/(t-e),h=2*r/(n-i),f=(t+e)/(t-e),d=(n+i)/(n-i);let p,v;if(l)p=r/(o-r),v=o*r/(o-r);else if(a===Cn)p=-(o+r)/(o-r),v=-2*o*r/(o-r);else if(a===_o)p=-o/(o-r),v=-o*r/(o-r);else throw new Error("THREE.Matrix4.makePerspective(): Invalid coordinate system: "+a);return c[0]=u,c[4]=0,c[8]=f,c[12]=0,c[1]=0,c[5]=h,c[9]=d,c[13]=0,c[2]=0,c[6]=0,c[10]=p,c[14]=v,c[3]=0,c[7]=0,c[11]=-1,c[15]=0,this}makeOrthographic(e,t,n,i,r,o,a=Cn,l=!1){const c=this.elements,u=2/(t-e),h=2/(n-i),f=-(t+e)/(t-e),d=-(n+i)/(n-i);let p,v;if(l)p=1/(o-r),v=o/(o-r);else if(a===Cn)p=-2/(o-r),v=-(o+r)/(o-r);else if(a===_o)p=-1/(o-r),v=-r/(o-r);else throw new Error("THREE.Matrix4.makeOrthographic(): Invalid coordinate system: "+a);return c[0]=u,c[4]=0,c[8]=0,c[12]=f,c[1]=0,c[5]=h,c[9]=0,c[13]=d,c[2]=0,c[6]=0,c[10]=p,c[14]=v,c[3]=0,c[7]=0,c[11]=0,c[15]=1,this}equals(e){const t=this.elements,n=e.elements;for(let i=0;i<16;i++)if(t[i]!==n[i])return!1;return!0}fromArray(e,t=0){for(let n=0;n<16;n++)this.elements[n]=e[n+t];return this}toArray(e=[],t=0){const n=this.elements;return e[t]=n[0],e[t+1]=n[1],e[t+2]=n[2],e[t+3]=n[3],e[t+4]=n[4],e[t+5]=n[5],e[t+6]=n[6],e[t+7]=n[7],e[t+8]=n[8],e[t+9]=n[9],e[t+10]=n[10],e[t+11]=n[11],e[t+12]=n[12],e[t+13]=n[13],e[t+14]=n[14],e[t+15]=n[15],e}}const Hi=new w,dn=new Le,Dd=new w(0,0,0),Nd=new w(1,1,1),ii=new w,wr=new w,Qt=new w,Ac=new Le,Rc=new Yt;class Xt{constructor(e=0,t=0,n=0,i=Xt.DEFAULT_ORDER){this.isEuler=!0,this._x=e,this._y=t,this._z=n,this._order=i}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get order(){return this._order}set order(e){this._order=e,this._onChangeCallback()}set(e,t,n,i=this._order){return this._x=e,this._y=t,this._z=n,this._order=i,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._order)}copy(e){return this._x=e._x,this._y=e._y,this._z=e._z,this._order=e._order,this._onChangeCallback(),this}setFromRotationMatrix(e,t=this._order,n=!0){const i=e.elements,r=i[0],o=i[4],a=i[8],l=i[1],c=i[5],u=i[9],h=i[2],f=i[6],d=i[10];switch(t){case"XYZ":this._y=Math.asin($e(a,-1,1)),Math.abs(a)<.9999999?(this._x=Math.atan2(-u,d),this._z=Math.atan2(-o,r)):(this._x=Math.atan2(f,c),this._z=0);break;case"YXZ":this._x=Math.asin(-$e(u,-1,1)),Math.abs(u)<.9999999?(this._y=Math.atan2(a,d),this._z=Math.atan2(l,c)):(this._y=Math.atan2(-h,r),this._z=0);break;case"ZXY":this._x=Math.asin($e(f,-1,1)),Math.abs(f)<.9999999?(this._y=Math.atan2(-h,d),this._z=Math.atan2(-o,c)):(this._y=0,this._z=Math.atan2(l,r));break;case"ZYX":this._y=Math.asin(-$e(h,-1,1)),Math.abs(h)<.9999999?(this._x=Math.atan2(f,d),this._z=Math.atan2(l,r)):(this._x=0,this._z=Math.atan2(-o,c));break;case"YZX":this._z=Math.asin($e(l,-1,1)),Math.abs(l)<.9999999?(this._x=Math.atan2(-u,c),this._y=Math.atan2(-h,r)):(this._x=0,this._y=Math.atan2(a,d));break;case"XZY":this._z=Math.asin(-$e(o,-1,1)),Math.abs(o)<.9999999?(this._x=Math.atan2(f,c),this._y=Math.atan2(a,r)):(this._x=Math.atan2(-u,d),this._y=0);break;default:console.warn("THREE.Euler: .setFromRotationMatrix() encountered an unknown order: "+t)}return this._order=t,n===!0&&this._onChangeCallback(),this}setFromQuaternion(e,t,n){return Ac.makeRotationFromQuaternion(e),this.setFromRotationMatrix(Ac,t,n)}setFromVector3(e,t=this._order){return this.set(e.x,e.y,e.z,t)}reorder(e){return Rc.setFromEuler(this),this.setFromQuaternion(Rc,e)}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._order===this._order}fromArray(e){return this._x=e[0],this._y=e[1],this._z=e[2],e[3]!==void 0&&(this._order=e[3]),this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._order,e}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._order}}Xt.DEFAULT_ORDER="XYZ";class Bl{constructor(){this.mask=1}set(e){this.mask=(1<<e|0)>>>0}enable(e){this.mask|=1<<e|0}enableAll(){this.mask=-1}toggle(e){this.mask^=1<<e|0}disable(e){this.mask&=~(1<<e|0)}disableAll(){this.mask=0}test(e){return(this.mask&e.mask)!==0}isEnabled(e){return(this.mask&(1<<e|0))!==0}}let Ud=0;const Cc=new w,Vi=new Yt,kn=new Le,Ar=new w,Ps=new w,Fd=new w,Od=new Yt,Pc=new w(1,0,0),Lc=new w(0,1,0),Ic=new w(0,0,1),Dc={type:"added"},kd={type:"removed"},Gi={type:"childadded",child:null},Wo={type:"childremoved",child:null};class dt extends Ms{constructor(){super(),this.isObject3D=!0,Object.defineProperty(this,"id",{value:Ud++}),this.uuid=hn(),this.name="",this.type="Object3D",this.parent=null,this.children=[],this.up=dt.DEFAULT_UP.clone();const e=new w,t=new Xt,n=new Yt,i=new w(1,1,1);function r(){n.setFromEuler(t,!1)}function o(){t.setFromQuaternion(n,void 0,!1)}t._onChange(r),n._onChange(o),Object.defineProperties(this,{position:{configurable:!0,enumerable:!0,value:e},rotation:{configurable:!0,enumerable:!0,value:t},quaternion:{configurable:!0,enumerable:!0,value:n},scale:{configurable:!0,enumerable:!0,value:i},modelViewMatrix:{value:new Le},normalMatrix:{value:new Ce}}),this.matrix=new Le,this.matrixWorld=new Le,this.matrixAutoUpdate=dt.DEFAULT_MATRIX_AUTO_UPDATE,this.matrixWorldAutoUpdate=dt.DEFAULT_MATRIX_WORLD_AUTO_UPDATE,this.matrixWorldNeedsUpdate=!1,this.layers=new Bl,this.visible=!0,this.castShadow=!1,this.receiveShadow=!1,this.frustumCulled=!0,this.renderOrder=0,this.animations=[],this.customDepthMaterial=void 0,this.customDistanceMaterial=void 0,this.userData={}}onBeforeShadow(){}onAfterShadow(){}onBeforeRender(){}onAfterRender(){}applyMatrix4(e){this.matrixAutoUpdate&&this.updateMatrix(),this.matrix.premultiply(e),this.matrix.decompose(this.position,this.quaternion,this.scale)}applyQuaternion(e){return this.quaternion.premultiply(e),this}setRotationFromAxisAngle(e,t){this.quaternion.setFromAxisAngle(e,t)}setRotationFromEuler(e){this.quaternion.setFromEuler(e,!0)}setRotationFromMatrix(e){this.quaternion.setFromRotationMatrix(e)}setRotationFromQuaternion(e){this.quaternion.copy(e)}rotateOnAxis(e,t){return Vi.setFromAxisAngle(e,t),this.quaternion.multiply(Vi),this}rotateOnWorldAxis(e,t){return Vi.setFromAxisAngle(e,t),this.quaternion.premultiply(Vi),this}rotateX(e){return this.rotateOnAxis(Pc,e)}rotateY(e){return this.rotateOnAxis(Lc,e)}rotateZ(e){return this.rotateOnAxis(Ic,e)}translateOnAxis(e,t){return Cc.copy(e).applyQuaternion(this.quaternion),this.position.add(Cc.multiplyScalar(t)),this}translateX(e){return this.translateOnAxis(Pc,e)}translateY(e){return this.translateOnAxis(Lc,e)}translateZ(e){return this.translateOnAxis(Ic,e)}localToWorld(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(this.matrixWorld)}worldToLocal(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(kn.copy(this.matrixWorld).invert())}lookAt(e,t,n){e.isVector3?Ar.copy(e):Ar.set(e,t,n);const i=this.parent;this.updateWorldMatrix(!0,!1),Ps.setFromMatrixPosition(this.matrixWorld),this.isCamera||this.isLight?kn.lookAt(Ps,Ar,this.up):kn.lookAt(Ar,Ps,this.up),this.quaternion.setFromRotationMatrix(kn),i&&(kn.extractRotation(i.matrixWorld),Vi.setFromRotationMatrix(kn),this.quaternion.premultiply(Vi.invert()))}add(e){if(arguments.length>1){for(let t=0;t<arguments.length;t++)this.add(arguments[t]);return this}return e===this?(console.error("THREE.Object3D.add: object can't be added as a child of itself.",e),this):(e&&e.isObject3D?(e.removeFromParent(),e.parent=this,this.children.push(e),e.dispatchEvent(Dc),Gi.child=e,this.dispatchEvent(Gi),Gi.child=null):console.error("THREE.Object3D.add: object not an instance of THREE.Object3D.",e),this)}remove(e){if(arguments.length>1){for(let n=0;n<arguments.length;n++)this.remove(arguments[n]);return this}const t=this.children.indexOf(e);return t!==-1&&(e.parent=null,this.children.splice(t,1),e.dispatchEvent(kd),Wo.child=e,this.dispatchEvent(Wo),Wo.child=null),this}removeFromParent(){const e=this.parent;return e!==null&&e.remove(this),this}clear(){return this.remove(...this.children)}attach(e){return this.updateWorldMatrix(!0,!1),kn.copy(this.matrixWorld).invert(),e.parent!==null&&(e.parent.updateWorldMatrix(!0,!1),kn.multiply(e.parent.matrixWorld)),e.applyMatrix4(kn),e.removeFromParent(),e.parent=this,this.children.push(e),e.updateWorldMatrix(!1,!0),e.dispatchEvent(Dc),Gi.child=e,this.dispatchEvent(Gi),Gi.child=null,this}getObjectById(e){return this.getObjectByProperty("id",e)}getObjectByName(e){return this.getObjectByProperty("name",e)}getObjectByProperty(e,t){if(this[e]===t)return this;for(let n=0,i=this.children.length;n<i;n++){const o=this.children[n].getObjectByProperty(e,t);if(o!==void 0)return o}}getObjectsByProperty(e,t,n=[]){this[e]===t&&n.push(this);const i=this.children;for(let r=0,o=i.length;r<o;r++)i[r].getObjectsByProperty(e,t,n);return n}getWorldPosition(e){return this.updateWorldMatrix(!0,!1),e.setFromMatrixPosition(this.matrixWorld)}getWorldQuaternion(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(Ps,e,Fd),e}getWorldScale(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(Ps,Od,e),e}getWorldDirection(e){this.updateWorldMatrix(!0,!1);const t=this.matrixWorld.elements;return e.set(t[8],t[9],t[10]).normalize()}raycast(){}traverse(e){e(this);const t=this.children;for(let n=0,i=t.length;n<i;n++)t[n].traverse(e)}traverseVisible(e){if(this.visible===!1)return;e(this);const t=this.children;for(let n=0,i=t.length;n<i;n++)t[n].traverseVisible(e)}traverseAncestors(e){const t=this.parent;t!==null&&(e(t),t.traverseAncestors(e))}updateMatrix(){this.matrix.compose(this.position,this.quaternion,this.scale),this.matrixWorldNeedsUpdate=!0}updateMatrixWorld(e){this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||e)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,e=!0);const t=this.children;for(let n=0,i=t.length;n<i;n++)t[n].updateMatrixWorld(e)}updateWorldMatrix(e,t){const n=this.parent;if(e===!0&&n!==null&&n.updateWorldMatrix(!0,!1),this.matrixAutoUpdate&&this.updateMatrix(),this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),t===!0){const i=this.children;for(let r=0,o=i.length;r<o;r++)i[r].updateWorldMatrix(!1,!0)}}toJSON(e){const t=e===void 0||typeof e=="string",n={};t&&(e={geometries:{},materials:{},textures:{},images:{},shapes:{},skeletons:{},animations:{},nodes:{}},n.metadata={version:4.7,type:"Object",generator:"Object3D.toJSON"});const i={};i.uuid=this.uuid,i.type=this.type,this.name!==""&&(i.name=this.name),this.castShadow===!0&&(i.castShadow=!0),this.receiveShadow===!0&&(i.receiveShadow=!0),this.visible===!1&&(i.visible=!1),this.frustumCulled===!1&&(i.frustumCulled=!1),this.renderOrder!==0&&(i.renderOrder=this.renderOrder),Object.keys(this.userData).length>0&&(i.userData=this.userData),i.layers=this.layers.mask,i.matrix=this.matrix.toArray(),i.up=this.up.toArray(),this.matrixAutoUpdate===!1&&(i.matrixAutoUpdate=!1),this.isInstancedMesh&&(i.type="InstancedMesh",i.count=this.count,i.instanceMatrix=this.instanceMatrix.toJSON(),this.instanceColor!==null&&(i.instanceColor=this.instanceColor.toJSON())),this.isBatchedMesh&&(i.type="BatchedMesh",i.perObjectFrustumCulled=this.perObjectFrustumCulled,i.sortObjects=this.sortObjects,i.drawRanges=this._drawRanges,i.reservedRanges=this._reservedRanges,i.geometryInfo=this._geometryInfo.map(a=>({...a,boundingBox:a.boundingBox?a.boundingBox.toJSON():void 0,boundingSphere:a.boundingSphere?a.boundingSphere.toJSON():void 0})),i.instanceInfo=this._instanceInfo.map(a=>({...a})),i.availableInstanceIds=this._availableInstanceIds.slice(),i.availableGeometryIds=this._availableGeometryIds.slice(),i.nextIndexStart=this._nextIndexStart,i.nextVertexStart=this._nextVertexStart,i.geometryCount=this._geometryCount,i.maxInstanceCount=this._maxInstanceCount,i.maxVertexCount=this._maxVertexCount,i.maxIndexCount=this._maxIndexCount,i.geometryInitialized=this._geometryInitialized,i.matricesTexture=this._matricesTexture.toJSON(e),i.indirectTexture=this._indirectTexture.toJSON(e),this._colorsTexture!==null&&(i.colorsTexture=this._colorsTexture.toJSON(e)),this.boundingSphere!==null&&(i.boundingSphere=this.boundingSphere.toJSON()),this.boundingBox!==null&&(i.boundingBox=this.boundingBox.toJSON()));function r(a,l){return a[l.uuid]===void 0&&(a[l.uuid]=l.toJSON(e)),l.uuid}if(this.isScene)this.background&&(this.background.isColor?i.background=this.background.toJSON():this.background.isTexture&&(i.background=this.background.toJSON(e).uuid)),this.environment&&this.environment.isTexture&&this.environment.isRenderTargetTexture!==!0&&(i.environment=this.environment.toJSON(e).uuid);else if(this.isMesh||this.isLine||this.isPoints){i.geometry=r(e.geometries,this.geometry);const a=this.geometry.parameters;if(a!==void 0&&a.shapes!==void 0){const l=a.shapes;if(Array.isArray(l))for(let c=0,u=l.length;c<u;c++){const h=l[c];r(e.shapes,h)}else r(e.shapes,l)}}if(this.isSkinnedMesh&&(i.bindMode=this.bindMode,i.bindMatrix=this.bindMatrix.toArray(),this.skeleton!==void 0&&(r(e.skeletons,this.skeleton),i.skeleton=this.skeleton.uuid)),this.material!==void 0)if(Array.isArray(this.material)){const a=[];for(let l=0,c=this.material.length;l<c;l++)a.push(r(e.materials,this.material[l]));i.material=a}else i.material=r(e.materials,this.material);if(this.children.length>0){i.children=[];for(let a=0;a<this.children.length;a++)i.children.push(this.children[a].toJSON(e).object)}if(this.animations.length>0){i.animations=[];for(let a=0;a<this.animations.length;a++){const l=this.animations[a];i.animations.push(r(e.animations,l))}}if(t){const a=o(e.geometries),l=o(e.materials),c=o(e.textures),u=o(e.images),h=o(e.shapes),f=o(e.skeletons),d=o(e.animations),p=o(e.nodes);a.length>0&&(n.geometries=a),l.length>0&&(n.materials=l),c.length>0&&(n.textures=c),u.length>0&&(n.images=u),h.length>0&&(n.shapes=h),f.length>0&&(n.skeletons=f),d.length>0&&(n.animations=d),p.length>0&&(n.nodes=p)}return n.object=i,n;function o(a){const l=[];for(const c in a){const u=a[c];delete u.metadata,l.push(u)}return l}}clone(e){return new this.constructor().copy(this,e)}copy(e,t=!0){if(this.name=e.name,this.up.copy(e.up),this.position.copy(e.position),this.rotation.order=e.rotation.order,this.quaternion.copy(e.quaternion),this.scale.copy(e.scale),this.matrix.copy(e.matrix),this.matrixWorld.copy(e.matrixWorld),this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrixWorldAutoUpdate=e.matrixWorldAutoUpdate,this.matrixWorldNeedsUpdate=e.matrixWorldNeedsUpdate,this.layers.mask=e.layers.mask,this.visible=e.visible,this.castShadow=e.castShadow,this.receiveShadow=e.receiveShadow,this.frustumCulled=e.frustumCulled,this.renderOrder=e.renderOrder,this.animations=e.animations.slice(),this.userData=JSON.parse(JSON.stringify(e.userData)),t===!0)for(let n=0;n<e.children.length;n++){const i=e.children[n];this.add(i.clone())}return this}}dt.DEFAULT_UP=new w(0,1,0);dt.DEFAULT_MATRIX_AUTO_UPDATE=!0;dt.DEFAULT_MATRIX_WORLD_AUTO_UPDATE=!0;const pn=new w,Bn=new w,Xo=new w,zn=new w,Wi=new w,Xi=new w,Nc=new w,qo=new w,Ko=new w,$o=new w,Yo=new He,jo=new He,Zo=new He;class un{constructor(e=new w,t=new w,n=new w){this.a=e,this.b=t,this.c=n}static getNormal(e,t,n,i){i.subVectors(n,t),pn.subVectors(e,t),i.cross(pn);const r=i.lengthSq();return r>0?i.multiplyScalar(1/Math.sqrt(r)):i.set(0,0,0)}static getBarycoord(e,t,n,i,r){pn.subVectors(i,t),Bn.subVectors(n,t),Xo.subVectors(e,t);const o=pn.dot(pn),a=pn.dot(Bn),l=pn.dot(Xo),c=Bn.dot(Bn),u=Bn.dot(Xo),h=o*c-a*a;if(h===0)return r.set(0,0,0),null;const f=1/h,d=(c*l-a*u)*f,p=(o*u-a*l)*f;return r.set(1-d-p,p,d)}static containsPoint(e,t,n,i){return this.getBarycoord(e,t,n,i,zn)===null?!1:zn.x>=0&&zn.y>=0&&zn.x+zn.y<=1}static getInterpolation(e,t,n,i,r,o,a,l){return this.getBarycoord(e,t,n,i,zn)===null?(l.x=0,l.y=0,"z"in l&&(l.z=0),"w"in l&&(l.w=0),null):(l.setScalar(0),l.addScaledVector(r,zn.x),l.addScaledVector(o,zn.y),l.addScaledVector(a,zn.z),l)}static getInterpolatedAttribute(e,t,n,i,r,o){return Yo.setScalar(0),jo.setScalar(0),Zo.setScalar(0),Yo.fromBufferAttribute(e,t),jo.fromBufferAttribute(e,n),Zo.fromBufferAttribute(e,i),o.setScalar(0),o.addScaledVector(Yo,r.x),o.addScaledVector(jo,r.y),o.addScaledVector(Zo,r.z),o}static isFrontFacing(e,t,n,i){return pn.subVectors(n,t),Bn.subVectors(e,t),pn.cross(Bn).dot(i)<0}set(e,t,n){return this.a.copy(e),this.b.copy(t),this.c.copy(n),this}setFromPointsAndIndices(e,t,n,i){return this.a.copy(e[t]),this.b.copy(e[n]),this.c.copy(e[i]),this}setFromAttributeAndIndices(e,t,n,i){return this.a.fromBufferAttribute(e,t),this.b.fromBufferAttribute(e,n),this.c.fromBufferAttribute(e,i),this}clone(){return new this.constructor().copy(this)}copy(e){return this.a.copy(e.a),this.b.copy(e.b),this.c.copy(e.c),this}getArea(){return pn.subVectors(this.c,this.b),Bn.subVectors(this.a,this.b),pn.cross(Bn).length()*.5}getMidpoint(e){return e.addVectors(this.a,this.b).add(this.c).multiplyScalar(1/3)}getNormal(e){return un.getNormal(this.a,this.b,this.c,e)}getPlane(e){return e.setFromCoplanarPoints(this.a,this.b,this.c)}getBarycoord(e,t){return un.getBarycoord(e,this.a,this.b,this.c,t)}getInterpolation(e,t,n,i,r){return un.getInterpolation(e,this.a,this.b,this.c,t,n,i,r)}containsPoint(e){return un.containsPoint(e,this.a,this.b,this.c)}isFrontFacing(e){return un.isFrontFacing(this.a,this.b,this.c,e)}intersectsBox(e){return e.intersectsTriangle(this)}closestPointToPoint(e,t){const n=this.a,i=this.b,r=this.c;let o,a;Wi.subVectors(i,n),Xi.subVectors(r,n),qo.subVectors(e,n);const l=Wi.dot(qo),c=Xi.dot(qo);if(l<=0&&c<=0)return t.copy(n);Ko.subVectors(e,i);const u=Wi.dot(Ko),h=Xi.dot(Ko);if(u>=0&&h<=u)return t.copy(i);const f=l*h-u*c;if(f<=0&&l>=0&&u<=0)return o=l/(l-u),t.copy(n).addScaledVector(Wi,o);$o.subVectors(e,r);const d=Wi.dot($o),p=Xi.dot($o);if(p>=0&&d<=p)return t.copy(r);const v=d*c-l*p;if(v<=0&&c>=0&&p<=0)return a=c/(c-p),t.copy(n).addScaledVector(Xi,a);const g=u*p-d*h;if(g<=0&&h-u>=0&&d-p>=0)return Nc.subVectors(r,i),a=(h-u)/(h-u+(d-p)),t.copy(i).addScaledVector(Nc,a);const m=1/(g+v+f);return o=v*m,a=f*m,t.copy(n).addScaledVector(Wi,o).addScaledVector(Xi,a)}equals(e){return e.a.equals(this.a)&&e.b.equals(this.b)&&e.c.equals(this.c)}}const Mh={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074},si={h:0,s:0,l:0},Rr={h:0,s:0,l:0};function Jo(s,e,t){return t<0&&(t+=1),t>1&&(t-=1),t<1/6?s+(e-s)*6*t:t<1/2?e:t<2/3?s+(e-s)*6*(2/3-t):s}class Ue{constructor(e,t,n){return this.isColor=!0,this.r=1,this.g=1,this.b=1,this.set(e,t,n)}set(e,t,n){if(t===void 0&&n===void 0){const i=e;i&&i.isColor?this.copy(i):typeof i=="number"?this.setHex(i):typeof i=="string"&&this.setStyle(i)}else this.setRGB(e,t,n);return this}setScalar(e){return this.r=e,this.g=e,this.b=e,this}setHex(e,t=St){return e=Math.floor(e),this.r=(e>>16&255)/255,this.g=(e>>8&255)/255,this.b=(e&255)/255,et.colorSpaceToWorking(this,t),this}setRGB(e,t,n,i=et.workingColorSpace){return this.r=e,this.g=t,this.b=n,et.colorSpaceToWorking(this,i),this}setHSL(e,t,n,i=et.workingColorSpace){if(e=Ol(e,1),t=$e(t,0,1),n=$e(n,0,1),t===0)this.r=this.g=this.b=n;else{const r=n<=.5?n*(1+t):n+t-n*t,o=2*n-r;this.r=Jo(o,r,e+1/3),this.g=Jo(o,r,e),this.b=Jo(o,r,e-1/3)}return et.colorSpaceToWorking(this,i),this}setStyle(e,t=St){function n(r){r!==void 0&&parseFloat(r)<1&&console.warn("THREE.Color: Alpha component of "+e+" will be ignored.")}let i;if(i=/^(\w+)\(([^\)]*)\)/.exec(e)){let r;const o=i[1],a=i[2];switch(o){case"rgb":case"rgba":if(r=/^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a))return n(r[4]),this.setRGB(Math.min(255,parseInt(r[1],10))/255,Math.min(255,parseInt(r[2],10))/255,Math.min(255,parseInt(r[3],10))/255,t);if(r=/^\s*(\d+)\%\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a))return n(r[4]),this.setRGB(Math.min(100,parseInt(r[1],10))/100,Math.min(100,parseInt(r[2],10))/100,Math.min(100,parseInt(r[3],10))/100,t);break;case"hsl":case"hsla":if(r=/^\s*(\d*\.?\d+)\s*,\s*(\d*\.?\d+)\%\s*,\s*(\d*\.?\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a))return n(r[4]),this.setHSL(parseFloat(r[1])/360,parseFloat(r[2])/100,parseFloat(r[3])/100,t);break;default:console.warn("THREE.Color: Unknown color model "+e)}}else if(i=/^\#([A-Fa-f\d]+)$/.exec(e)){const r=i[1],o=r.length;if(o===3)return this.setRGB(parseInt(r.charAt(0),16)/15,parseInt(r.charAt(1),16)/15,parseInt(r.charAt(2),16)/15,t);if(o===6)return this.setHex(parseInt(r,16),t);console.warn("THREE.Color: Invalid hex color "+e)}else if(e&&e.length>0)return this.setColorName(e,t);return this}setColorName(e,t=St){const n=Mh[e.toLowerCase()];return n!==void 0?this.setHex(n,t):console.warn("THREE.Color: Unknown color "+e),this}clone(){return new this.constructor(this.r,this.g,this.b)}copy(e){return this.r=e.r,this.g=e.g,this.b=e.b,this}copySRGBToLinear(e){return this.r=$n(e.r),this.g=$n(e.g),this.b=$n(e.b),this}copyLinearToSRGB(e){return this.r=as(e.r),this.g=as(e.g),this.b=as(e.b),this}convertSRGBToLinear(){return this.copySRGBToLinear(this),this}convertLinearToSRGB(){return this.copyLinearToSRGB(this),this}getHex(e=St){return et.workingToColorSpace(Ft.copy(this),e),Math.round($e(Ft.r*255,0,255))*65536+Math.round($e(Ft.g*255,0,255))*256+Math.round($e(Ft.b*255,0,255))}getHexString(e=St){return("000000"+this.getHex(e).toString(16)).slice(-6)}getHSL(e,t=et.workingColorSpace){et.workingToColorSpace(Ft.copy(this),t);const n=Ft.r,i=Ft.g,r=Ft.b,o=Math.max(n,i,r),a=Math.min(n,i,r);let l,c;const u=(a+o)/2;if(a===o)l=0,c=0;else{const h=o-a;switch(c=u<=.5?h/(o+a):h/(2-o-a),o){case n:l=(i-r)/h+(i<r?6:0);break;case i:l=(r-n)/h+2;break;case r:l=(n-i)/h+4;break}l/=6}return e.h=l,e.s=c,e.l=u,e}getRGB(e,t=et.workingColorSpace){return et.workingToColorSpace(Ft.copy(this),t),e.r=Ft.r,e.g=Ft.g,e.b=Ft.b,e}getStyle(e=St){et.workingToColorSpace(Ft.copy(this),e);const t=Ft.r,n=Ft.g,i=Ft.b;return e!==St?`color(${e} ${t.toFixed(3)} ${n.toFixed(3)} ${i.toFixed(3)})`:`rgb(${Math.round(t*255)},${Math.round(n*255)},${Math.round(i*255)})`}offsetHSL(e,t,n){return this.getHSL(si),this.setHSL(si.h+e,si.s+t,si.l+n)}add(e){return this.r+=e.r,this.g+=e.g,this.b+=e.b,this}addColors(e,t){return this.r=e.r+t.r,this.g=e.g+t.g,this.b=e.b+t.b,this}addScalar(e){return this.r+=e,this.g+=e,this.b+=e,this}sub(e){return this.r=Math.max(0,this.r-e.r),this.g=Math.max(0,this.g-e.g),this.b=Math.max(0,this.b-e.b),this}multiply(e){return this.r*=e.r,this.g*=e.g,this.b*=e.b,this}multiplyScalar(e){return this.r*=e,this.g*=e,this.b*=e,this}lerp(e,t){return this.r+=(e.r-this.r)*t,this.g+=(e.g-this.g)*t,this.b+=(e.b-this.b)*t,this}lerpColors(e,t,n){return this.r=e.r+(t.r-e.r)*n,this.g=e.g+(t.g-e.g)*n,this.b=e.b+(t.b-e.b)*n,this}lerpHSL(e,t){this.getHSL(si),e.getHSL(Rr);const n=Ys(si.h,Rr.h,t),i=Ys(si.s,Rr.s,t),r=Ys(si.l,Rr.l,t);return this.setHSL(n,i,r),this}setFromVector3(e){return this.r=e.x,this.g=e.y,this.b=e.z,this}applyMatrix3(e){const t=this.r,n=this.g,i=this.b,r=e.elements;return this.r=r[0]*t+r[3]*n+r[6]*i,this.g=r[1]*t+r[4]*n+r[7]*i,this.b=r[2]*t+r[5]*n+r[8]*i,this}equals(e){return e.r===this.r&&e.g===this.g&&e.b===this.b}fromArray(e,t=0){return this.r=e[t],this.g=e[t+1],this.b=e[t+2],this}toArray(e=[],t=0){return e[t]=this.r,e[t+1]=this.g,e[t+2]=this.b,e}fromBufferAttribute(e,t){return this.r=e.getX(t),this.g=e.getY(t),this.b=e.getZ(t),this}toJSON(){return this.getHex()}*[Symbol.iterator](){yield this.r,yield this.g,yield this.b}}const Ft=new Ue;Ue.NAMES=Mh;let Bd=0;class xn extends Ms{constructor(){super(),this.isMaterial=!0,Object.defineProperty(this,"id",{value:Bd++}),this.uuid=hn(),this.name="",this.type="Material",this.blending=Ri,this.side=Yn,this.vertexColors=!1,this.opacity=1,this.transparent=!1,this.alphaHash=!1,this.blendSrc=Ca,this.blendDst=go,this.blendEquation=li,this.blendSrcAlpha=null,this.blendDstAlpha=null,this.blendEquationAlpha=null,this.blendColor=new Ue(0,0,0),this.blendAlpha=0,this.depthFunc=us,this.depthTest=!0,this.depthWrite=!0,this.stencilWriteMask=255,this.stencilFunc=Mc,this.stencilRef=0,this.stencilFuncMask=255,this.stencilFail=Fi,this.stencilZFail=Fi,this.stencilZPass=Fi,this.stencilWrite=!1,this.clippingPlanes=null,this.clipIntersection=!1,this.clipShadows=!1,this.shadowSide=null,this.colorWrite=!0,this.precision=null,this.polygonOffset=!1,this.polygonOffsetFactor=0,this.polygonOffsetUnits=0,this.dithering=!1,this.alphaToCoverage=!1,this.premultipliedAlpha=!1,this.forceSinglePass=!1,this.allowOverride=!0,this.visible=!0,this.toneMapped=!0,this.userData={},this.version=0,this._alphaTest=0}get alphaTest(){return this._alphaTest}set alphaTest(e){this._alphaTest>0!=e>0&&this.version++,this._alphaTest=e}onBeforeRender(){}onBeforeCompile(){}customProgramCacheKey(){return this.onBeforeCompile.toString()}setValues(e){if(e!==void 0)for(const t in e){const n=e[t];if(n===void 0){console.warn(`THREE.Material: parameter '${t}' has value of undefined.`);continue}const i=this[t];if(i===void 0){console.warn(`THREE.Material: '${t}' is not a property of THREE.${this.type}.`);continue}i&&i.isColor?i.set(n):i&&i.isVector3&&n&&n.isVector3?i.copy(n):this[t]=n}}toJSON(e){const t=e===void 0||typeof e=="string";t&&(e={textures:{},images:{}});const n={metadata:{version:4.7,type:"Material",generator:"Material.toJSON"}};n.uuid=this.uuid,n.type=this.type,this.name!==""&&(n.name=this.name),this.color&&this.color.isColor&&(n.color=this.color.getHex()),this.roughness!==void 0&&(n.roughness=this.roughness),this.metalness!==void 0&&(n.metalness=this.metalness),this.sheen!==void 0&&(n.sheen=this.sheen),this.sheenColor&&this.sheenColor.isColor&&(n.sheenColor=this.sheenColor.getHex()),this.sheenRoughness!==void 0&&(n.sheenRoughness=this.sheenRoughness),this.emissive&&this.emissive.isColor&&(n.emissive=this.emissive.getHex()),this.emissiveIntensity!==void 0&&this.emissiveIntensity!==1&&(n.emissiveIntensity=this.emissiveIntensity),this.specular&&this.specular.isColor&&(n.specular=this.specular.getHex()),this.specularIntensity!==void 0&&(n.specularIntensity=this.specularIntensity),this.specularColor&&this.specularColor.isColor&&(n.specularColor=this.specularColor.getHex()),this.shininess!==void 0&&(n.shininess=this.shininess),this.clearcoat!==void 0&&(n.clearcoat=this.clearcoat),this.clearcoatRoughness!==void 0&&(n.clearcoatRoughness=this.clearcoatRoughness),this.clearcoatMap&&this.clearcoatMap.isTexture&&(n.clearcoatMap=this.clearcoatMap.toJSON(e).uuid),this.clearcoatRoughnessMap&&this.clearcoatRoughnessMap.isTexture&&(n.clearcoatRoughnessMap=this.clearcoatRoughnessMap.toJSON(e).uuid),this.clearcoatNormalMap&&this.clearcoatNormalMap.isTexture&&(n.clearcoatNormalMap=this.clearcoatNormalMap.toJSON(e).uuid,n.clearcoatNormalScale=this.clearcoatNormalScale.toArray()),this.sheenColorMap&&this.sheenColorMap.isTexture&&(n.sheenColorMap=this.sheenColorMap.toJSON(e).uuid),this.sheenRoughnessMap&&this.sheenRoughnessMap.isTexture&&(n.sheenRoughnessMap=this.sheenRoughnessMap.toJSON(e).uuid),this.dispersion!==void 0&&(n.dispersion=this.dispersion),this.iridescence!==void 0&&(n.iridescence=this.iridescence),this.iridescenceIOR!==void 0&&(n.iridescenceIOR=this.iridescenceIOR),this.iridescenceThicknessRange!==void 0&&(n.iridescenceThicknessRange=this.iridescenceThicknessRange),this.iridescenceMap&&this.iridescenceMap.isTexture&&(n.iridescenceMap=this.iridescenceMap.toJSON(e).uuid),this.iridescenceThicknessMap&&this.iridescenceThicknessMap.isTexture&&(n.iridescenceThicknessMap=this.iridescenceThicknessMap.toJSON(e).uuid),this.anisotropy!==void 0&&(n.anisotropy=this.anisotropy),this.anisotropyRotation!==void 0&&(n.anisotropyRotation=this.anisotropyRotation),this.anisotropyMap&&this.anisotropyMap.isTexture&&(n.anisotropyMap=this.anisotropyMap.toJSON(e).uuid),this.map&&this.map.isTexture&&(n.map=this.map.toJSON(e).uuid),this.matcap&&this.matcap.isTexture&&(n.matcap=this.matcap.toJSON(e).uuid),this.alphaMap&&this.alphaMap.isTexture&&(n.alphaMap=this.alphaMap.toJSON(e).uuid),this.lightMap&&this.lightMap.isTexture&&(n.lightMap=this.lightMap.toJSON(e).uuid,n.lightMapIntensity=this.lightMapIntensity),this.aoMap&&this.aoMap.isTexture&&(n.aoMap=this.aoMap.toJSON(e).uuid,n.aoMapIntensity=this.aoMapIntensity),this.bumpMap&&this.bumpMap.isTexture&&(n.bumpMap=this.bumpMap.toJSON(e).uuid,n.bumpScale=this.bumpScale),this.normalMap&&this.normalMap.isTexture&&(n.normalMap=this.normalMap.toJSON(e).uuid,n.normalMapType=this.normalMapType,n.normalScale=this.normalScale.toArray()),this.displacementMap&&this.displacementMap.isTexture&&(n.displacementMap=this.displacementMap.toJSON(e).uuid,n.displacementScale=this.displacementScale,n.displacementBias=this.displacementBias),this.roughnessMap&&this.roughnessMap.isTexture&&(n.roughnessMap=this.roughnessMap.toJSON(e).uuid),this.metalnessMap&&this.metalnessMap.isTexture&&(n.metalnessMap=this.metalnessMap.toJSON(e).uuid),this.emissiveMap&&this.emissiveMap.isTexture&&(n.emissiveMap=this.emissiveMap.toJSON(e).uuid),this.specularMap&&this.specularMap.isTexture&&(n.specularMap=this.specularMap.toJSON(e).uuid),this.specularIntensityMap&&this.specularIntensityMap.isTexture&&(n.specularIntensityMap=this.specularIntensityMap.toJSON(e).uuid),this.specularColorMap&&this.specularColorMap.isTexture&&(n.specularColorMap=this.specularColorMap.toJSON(e).uuid),this.envMap&&this.envMap.isTexture&&(n.envMap=this.envMap.toJSON(e).uuid,this.combine!==void 0&&(n.combine=this.combine)),this.envMapRotation!==void 0&&(n.envMapRotation=this.envMapRotation.toArray()),this.envMapIntensity!==void 0&&(n.envMapIntensity=this.envMapIntensity),this.reflectivity!==void 0&&(n.reflectivity=this.reflectivity),this.refractionRatio!==void 0&&(n.refractionRatio=this.refractionRatio),this.gradientMap&&this.gradientMap.isTexture&&(n.gradientMap=this.gradientMap.toJSON(e).uuid),this.transmission!==void 0&&(n.transmission=this.transmission),this.transmissionMap&&this.transmissionMap.isTexture&&(n.transmissionMap=this.transmissionMap.toJSON(e).uuid),this.thickness!==void 0&&(n.thickness=this.thickness),this.thicknessMap&&this.thicknessMap.isTexture&&(n.thicknessMap=this.thicknessMap.toJSON(e).uuid),this.attenuationDistance!==void 0&&this.attenuationDistance!==1/0&&(n.attenuationDistance=this.attenuationDistance),this.attenuationColor!==void 0&&(n.attenuationColor=this.attenuationColor.getHex()),this.size!==void 0&&(n.size=this.size),this.shadowSide!==null&&(n.shadowSide=this.shadowSide),this.sizeAttenuation!==void 0&&(n.sizeAttenuation=this.sizeAttenuation),this.blending!==Ri&&(n.blending=this.blending),this.side!==Yn&&(n.side=this.side),this.vertexColors===!0&&(n.vertexColors=!0),this.opacity<1&&(n.opacity=this.opacity),this.transparent===!0&&(n.transparent=!0),this.blendSrc!==Ca&&(n.blendSrc=this.blendSrc),this.blendDst!==go&&(n.blendDst=this.blendDst),this.blendEquation!==li&&(n.blendEquation=this.blendEquation),this.blendSrcAlpha!==null&&(n.blendSrcAlpha=this.blendSrcAlpha),this.blendDstAlpha!==null&&(n.blendDstAlpha=this.blendDstAlpha),this.blendEquationAlpha!==null&&(n.blendEquationAlpha=this.blendEquationAlpha),this.blendColor&&this.blendColor.isColor&&(n.blendColor=this.blendColor.getHex()),this.blendAlpha!==0&&(n.blendAlpha=this.blendAlpha),this.depthFunc!==us&&(n.depthFunc=this.depthFunc),this.depthTest===!1&&(n.depthTest=this.depthTest),this.depthWrite===!1&&(n.depthWrite=this.depthWrite),this.colorWrite===!1&&(n.colorWrite=this.colorWrite),this.stencilWriteMask!==255&&(n.stencilWriteMask=this.stencilWriteMask),this.stencilFunc!==Mc&&(n.stencilFunc=this.stencilFunc),this.stencilRef!==0&&(n.stencilRef=this.stencilRef),this.stencilFuncMask!==255&&(n.stencilFuncMask=this.stencilFuncMask),this.stencilFail!==Fi&&(n.stencilFail=this.stencilFail),this.stencilZFail!==Fi&&(n.stencilZFail=this.stencilZFail),this.stencilZPass!==Fi&&(n.stencilZPass=this.stencilZPass),this.stencilWrite===!0&&(n.stencilWrite=this.stencilWrite),this.rotation!==void 0&&this.rotation!==0&&(n.rotation=this.rotation),this.polygonOffset===!0&&(n.polygonOffset=!0),this.polygonOffsetFactor!==0&&(n.polygonOffsetFactor=this.polygonOffsetFactor),this.polygonOffsetUnits!==0&&(n.polygonOffsetUnits=this.polygonOffsetUnits),this.linewidth!==void 0&&this.linewidth!==1&&(n.linewidth=this.linewidth),this.dashSize!==void 0&&(n.dashSize=this.dashSize),this.gapSize!==void 0&&(n.gapSize=this.gapSize),this.scale!==void 0&&(n.scale=this.scale),this.dithering===!0&&(n.dithering=!0),this.alphaTest>0&&(n.alphaTest=this.alphaTest),this.alphaHash===!0&&(n.alphaHash=!0),this.alphaToCoverage===!0&&(n.alphaToCoverage=!0),this.premultipliedAlpha===!0&&(n.premultipliedAlpha=!0),this.forceSinglePass===!0&&(n.forceSinglePass=!0),this.wireframe===!0&&(n.wireframe=!0),this.wireframeLinewidth>1&&(n.wireframeLinewidth=this.wireframeLinewidth),this.wireframeLinecap!=="round"&&(n.wireframeLinecap=this.wireframeLinecap),this.wireframeLinejoin!=="round"&&(n.wireframeLinejoin=this.wireframeLinejoin),this.flatShading===!0&&(n.flatShading=!0),this.visible===!1&&(n.visible=!1),this.toneMapped===!1&&(n.toneMapped=!1),this.fog===!1&&(n.fog=!1),Object.keys(this.userData).length>0&&(n.userData=this.userData);function i(r){const o=[];for(const a in r){const l=r[a];delete l.metadata,o.push(l)}return o}if(t){const r=i(e.textures),o=i(e.images);r.length>0&&(n.textures=r),o.length>0&&(n.images=o)}return n}clone(){return new this.constructor().copy(this)}copy(e){this.name=e.name,this.blending=e.blending,this.side=e.side,this.vertexColors=e.vertexColors,this.opacity=e.opacity,this.transparent=e.transparent,this.blendSrc=e.blendSrc,this.blendDst=e.blendDst,this.blendEquation=e.blendEquation,this.blendSrcAlpha=e.blendSrcAlpha,this.blendDstAlpha=e.blendDstAlpha,this.blendEquationAlpha=e.blendEquationAlpha,this.blendColor.copy(e.blendColor),this.blendAlpha=e.blendAlpha,this.depthFunc=e.depthFunc,this.depthTest=e.depthTest,this.depthWrite=e.depthWrite,this.stencilWriteMask=e.stencilWriteMask,this.stencilFunc=e.stencilFunc,this.stencilRef=e.stencilRef,this.stencilFuncMask=e.stencilFuncMask,this.stencilFail=e.stencilFail,this.stencilZFail=e.stencilZFail,this.stencilZPass=e.stencilZPass,this.stencilWrite=e.stencilWrite;const t=e.clippingPlanes;let n=null;if(t!==null){const i=t.length;n=new Array(i);for(let r=0;r!==i;++r)n[r]=t[r].clone()}return this.clippingPlanes=n,this.clipIntersection=e.clipIntersection,this.clipShadows=e.clipShadows,this.shadowSide=e.shadowSide,this.colorWrite=e.colorWrite,this.precision=e.precision,this.polygonOffset=e.polygonOffset,this.polygonOffsetFactor=e.polygonOffsetFactor,this.polygonOffsetUnits=e.polygonOffsetUnits,this.dithering=e.dithering,this.alphaTest=e.alphaTest,this.alphaHash=e.alphaHash,this.alphaToCoverage=e.alphaToCoverage,this.premultipliedAlpha=e.premultipliedAlpha,this.forceSinglePass=e.forceSinglePass,this.visible=e.visible,this.toneMapped=e.toneMapped,this.userData=JSON.parse(JSON.stringify(e.userData)),this}dispose(){this.dispatchEvent({type:"dispose"})}set needsUpdate(e){e===!0&&this.version++}}class Kt extends xn{constructor(e){super(),this.isMeshBasicMaterial=!0,this.type="MeshBasicMaterial",this.color=new Ue(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new Xt,this.combine=ih,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.specularMap=e.specularMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.combine=e.combine,this.reflectivity=e.reflectivity,this.refractionRatio=e.refractionRatio,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.fog=e.fog,this}}const Xn=zd();function zd(){const s=new ArrayBuffer(4),e=new Float32Array(s),t=new Uint32Array(s),n=new Uint32Array(512),i=new Uint32Array(512);for(let l=0;l<256;++l){const c=l-127;c<-27?(n[l]=0,n[l|256]=32768,i[l]=24,i[l|256]=24):c<-14?(n[l]=1024>>-c-14,n[l|256]=1024>>-c-14|32768,i[l]=-c-1,i[l|256]=-c-1):c<=15?(n[l]=c+15<<10,n[l|256]=c+15<<10|32768,i[l]=13,i[l|256]=13):c<128?(n[l]=31744,n[l|256]=64512,i[l]=24,i[l|256]=24):(n[l]=31744,n[l|256]=64512,i[l]=13,i[l|256]=13)}const r=new Uint32Array(2048),o=new Uint32Array(64),a=new Uint32Array(64);for(let l=1;l<1024;++l){let c=l<<13,u=0;for(;(c&8388608)===0;)c<<=1,u-=8388608;c&=-8388609,u+=947912704,r[l]=c|u}for(let l=1024;l<2048;++l)r[l]=939524096+(l-1024<<13);for(let l=1;l<31;++l)o[l]=l<<23;o[31]=1199570944,o[32]=2147483648;for(let l=33;l<63;++l)o[l]=2147483648+(l-32<<23);o[63]=3347054592;for(let l=1;l<64;++l)l!==32&&(a[l]=1024);return{floatView:e,uint32View:t,baseTable:n,shiftTable:i,mantissaTable:r,exponentTable:o,offsetTable:a}}function Hd(s){Math.abs(s)>65504&&console.warn("THREE.DataUtils.toHalfFloat(): Value out of range."),s=$e(s,-65504,65504),Xn.floatView[0]=s;const e=Xn.uint32View[0],t=e>>23&511;return Xn.baseTable[t]+((e&8388607)>>Xn.shiftTable[t])}function Vd(s){const e=s>>10;return Xn.uint32View[0]=Xn.mantissaTable[Xn.offsetTable[e]+(s&1023)]+Xn.exponentTable[e],Xn.floatView[0]}class ho{static toHalfFloat(e){return Hd(e)}static fromHalfFloat(e){return Vd(e)}}const bt=new w,Cr=new ne;let Gd=0;class Gt{constructor(e,t,n=!1){if(Array.isArray(e))throw new TypeError("THREE.BufferAttribute: array should be a Typed Array.");this.isBufferAttribute=!0,Object.defineProperty(this,"id",{value:Gd++}),this.name="",this.array=e,this.itemSize=t,this.count=e!==void 0?e.length/t:0,this.normalized=n,this.usage=pl,this.updateRanges=[],this.gpuType=gn,this.version=0}onUploadCallback(){}set needsUpdate(e){e===!0&&this.version++}setUsage(e){return this.usage=e,this}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}copy(e){return this.name=e.name,this.array=new e.array.constructor(e.array),this.itemSize=e.itemSize,this.count=e.count,this.normalized=e.normalized,this.usage=e.usage,this.gpuType=e.gpuType,this}copyAt(e,t,n){e*=this.itemSize,n*=t.itemSize;for(let i=0,r=this.itemSize;i<r;i++)this.array[e+i]=t.array[n+i];return this}copyArray(e){return this.array.set(e),this}applyMatrix3(e){if(this.itemSize===2)for(let t=0,n=this.count;t<n;t++)Cr.fromBufferAttribute(this,t),Cr.applyMatrix3(e),this.setXY(t,Cr.x,Cr.y);else if(this.itemSize===3)for(let t=0,n=this.count;t<n;t++)bt.fromBufferAttribute(this,t),bt.applyMatrix3(e),this.setXYZ(t,bt.x,bt.y,bt.z);return this}applyMatrix4(e){for(let t=0,n=this.count;t<n;t++)bt.fromBufferAttribute(this,t),bt.applyMatrix4(e),this.setXYZ(t,bt.x,bt.y,bt.z);return this}applyNormalMatrix(e){for(let t=0,n=this.count;t<n;t++)bt.fromBufferAttribute(this,t),bt.applyNormalMatrix(e),this.setXYZ(t,bt.x,bt.y,bt.z);return this}transformDirection(e){for(let t=0,n=this.count;t<n;t++)bt.fromBufferAttribute(this,t),bt.transformDirection(e),this.setXYZ(t,bt.x,bt.y,bt.z);return this}set(e,t=0){return this.array.set(e,t),this}getComponent(e,t){let n=this.array[e*this.itemSize+t];return this.normalized&&(n=mn(n,this.array)),n}setComponent(e,t,n){return this.normalized&&(n=st(n,this.array)),this.array[e*this.itemSize+t]=n,this}getX(e){let t=this.array[e*this.itemSize];return this.normalized&&(t=mn(t,this.array)),t}setX(e,t){return this.normalized&&(t=st(t,this.array)),this.array[e*this.itemSize]=t,this}getY(e){let t=this.array[e*this.itemSize+1];return this.normalized&&(t=mn(t,this.array)),t}setY(e,t){return this.normalized&&(t=st(t,this.array)),this.array[e*this.itemSize+1]=t,this}getZ(e){let t=this.array[e*this.itemSize+2];return this.normalized&&(t=mn(t,this.array)),t}setZ(e,t){return this.normalized&&(t=st(t,this.array)),this.array[e*this.itemSize+2]=t,this}getW(e){let t=this.array[e*this.itemSize+3];return this.normalized&&(t=mn(t,this.array)),t}setW(e,t){return this.normalized&&(t=st(t,this.array)),this.array[e*this.itemSize+3]=t,this}setXY(e,t,n){return e*=this.itemSize,this.normalized&&(t=st(t,this.array),n=st(n,this.array)),this.array[e+0]=t,this.array[e+1]=n,this}setXYZ(e,t,n,i){return e*=this.itemSize,this.normalized&&(t=st(t,this.array),n=st(n,this.array),i=st(i,this.array)),this.array[e+0]=t,this.array[e+1]=n,this.array[e+2]=i,this}setXYZW(e,t,n,i,r){return e*=this.itemSize,this.normalized&&(t=st(t,this.array),n=st(n,this.array),i=st(i,this.array),r=st(r,this.array)),this.array[e+0]=t,this.array[e+1]=n,this.array[e+2]=i,this.array[e+3]=r,this}onUpload(e){return this.onUploadCallback=e,this}clone(){return new this.constructor(this.array,this.itemSize).copy(this)}toJSON(){const e={itemSize:this.itemSize,type:this.array.constructor.name,array:Array.from(this.array),normalized:this.normalized};return this.name!==""&&(e.name=this.name),this.usage!==pl&&(e.usage=this.usage),e}}class Sh extends Gt{constructor(e,t,n){super(new Uint16Array(e),t,n)}}class bh extends Gt{constructor(e,t,n){super(new Uint32Array(e),t,n)}}class it extends Gt{constructor(e,t,n){super(new Float32Array(e),t,n)}}let Wd=0;const on=new Le,Qo=new dt,qi=new w,en=new Jn,Ls=new Jn,Pt=new w;class Et extends Ms{constructor(){super(),this.isBufferGeometry=!0,Object.defineProperty(this,"id",{value:Wd++}),this.uuid=hn(),this.name="",this.type="BufferGeometry",this.index=null,this.indirect=null,this.attributes={},this.morphAttributes={},this.morphTargetsRelative=!1,this.groups=[],this.boundingBox=null,this.boundingSphere=null,this.drawRange={start:0,count:1/0},this.userData={}}getIndex(){return this.index}setIndex(e){return Array.isArray(e)?this.index=new(_h(e)?bh:Sh)(e,1):this.index=e,this}setIndirect(e){return this.indirect=e,this}getIndirect(){return this.indirect}getAttribute(e){return this.attributes[e]}setAttribute(e,t){return this.attributes[e]=t,this}deleteAttribute(e){return delete this.attributes[e],this}hasAttribute(e){return this.attributes[e]!==void 0}addGroup(e,t,n=0){this.groups.push({start:e,count:t,materialIndex:n})}clearGroups(){this.groups=[]}setDrawRange(e,t){this.drawRange.start=e,this.drawRange.count=t}applyMatrix4(e){const t=this.attributes.position;t!==void 0&&(t.applyMatrix4(e),t.needsUpdate=!0);const n=this.attributes.normal;if(n!==void 0){const r=new Ce().getNormalMatrix(e);n.applyNormalMatrix(r),n.needsUpdate=!0}const i=this.attributes.tangent;return i!==void 0&&(i.transformDirection(e),i.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this}applyQuaternion(e){return on.makeRotationFromQuaternion(e),this.applyMatrix4(on),this}rotateX(e){return on.makeRotationX(e),this.applyMatrix4(on),this}rotateY(e){return on.makeRotationY(e),this.applyMatrix4(on),this}rotateZ(e){return on.makeRotationZ(e),this.applyMatrix4(on),this}translate(e,t,n){return on.makeTranslation(e,t,n),this.applyMatrix4(on),this}scale(e,t,n){return on.makeScale(e,t,n),this.applyMatrix4(on),this}lookAt(e){return Qo.lookAt(e),Qo.updateMatrix(),this.applyMatrix4(Qo.matrix),this}center(){return this.computeBoundingBox(),this.boundingBox.getCenter(qi).negate(),this.translate(qi.x,qi.y,qi.z),this}setFromPoints(e){const t=this.getAttribute("position");if(t===void 0){const n=[];for(let i=0,r=e.length;i<r;i++){const o=e[i];n.push(o.x,o.y,o.z||0)}this.setAttribute("position",new it(n,3))}else{const n=Math.min(e.length,t.count);for(let i=0;i<n;i++){const r=e[i];t.setXYZ(i,r.x,r.y,r.z||0)}e.length>t.count&&console.warn("THREE.BufferGeometry: Buffer size too small for points data. Use .dispose() and create a new geometry."),t.needsUpdate=!0}return this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new Jn);const e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){console.error("THREE.BufferGeometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box.",this),this.boundingBox.set(new w(-1/0,-1/0,-1/0),new w(1/0,1/0,1/0));return}if(e!==void 0){if(this.boundingBox.setFromBufferAttribute(e),t)for(let n=0,i=t.length;n<i;n++){const r=t[n];en.setFromBufferAttribute(r),this.morphTargetsRelative?(Pt.addVectors(this.boundingBox.min,en.min),this.boundingBox.expandByPoint(Pt),Pt.addVectors(this.boundingBox.max,en.max),this.boundingBox.expandByPoint(Pt)):(this.boundingBox.expandByPoint(en.min),this.boundingBox.expandByPoint(en.max))}}else this.boundingBox.makeEmpty();(isNaN(this.boundingBox.min.x)||isNaN(this.boundingBox.min.y)||isNaN(this.boundingBox.min.z))&&console.error('THREE.BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The "position" attribute is likely to have NaN values.',this)}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new In);const e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){console.error("THREE.BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere.",this),this.boundingSphere.set(new w,1/0);return}if(e){const n=this.boundingSphere.center;if(en.setFromBufferAttribute(e),t)for(let r=0,o=t.length;r<o;r++){const a=t[r];Ls.setFromBufferAttribute(a),this.morphTargetsRelative?(Pt.addVectors(en.min,Ls.min),en.expandByPoint(Pt),Pt.addVectors(en.max,Ls.max),en.expandByPoint(Pt)):(en.expandByPoint(Ls.min),en.expandByPoint(Ls.max))}en.getCenter(n);let i=0;for(let r=0,o=e.count;r<o;r++)Pt.fromBufferAttribute(e,r),i=Math.max(i,n.distanceToSquared(Pt));if(t)for(let r=0,o=t.length;r<o;r++){const a=t[r],l=this.morphTargetsRelative;for(let c=0,u=a.count;c<u;c++)Pt.fromBufferAttribute(a,c),l&&(qi.fromBufferAttribute(e,c),Pt.add(qi)),i=Math.max(i,n.distanceToSquared(Pt))}this.boundingSphere.radius=Math.sqrt(i),isNaN(this.boundingSphere.radius)&&console.error('THREE.BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.',this)}}computeTangents(){const e=this.index,t=this.attributes;if(e===null||t.position===void 0||t.normal===void 0||t.uv===void 0){console.error("THREE.BufferGeometry: .computeTangents() failed. Missing required attributes (index, position, normal or uv)");return}const n=t.position,i=t.normal,r=t.uv;this.hasAttribute("tangent")===!1&&this.setAttribute("tangent",new Gt(new Float32Array(4*n.count),4));const o=this.getAttribute("tangent"),a=[],l=[];for(let L=0;L<n.count;L++)a[L]=new w,l[L]=new w;const c=new w,u=new w,h=new w,f=new ne,d=new ne,p=new ne,v=new w,g=new w;function m(L,b,M){c.fromBufferAttribute(n,L),u.fromBufferAttribute(n,b),h.fromBufferAttribute(n,M),f.fromBufferAttribute(r,L),d.fromBufferAttribute(r,b),p.fromBufferAttribute(r,M),u.sub(c),h.sub(c),d.sub(f),p.sub(f);const P=1/(d.x*p.y-p.x*d.y);isFinite(P)&&(v.copy(u).multiplyScalar(p.y).addScaledVector(h,-d.y).multiplyScalar(P),g.copy(h).multiplyScalar(d.x).addScaledVector(u,-p.x).multiplyScalar(P),a[L].add(v),a[b].add(v),a[M].add(v),l[L].add(g),l[b].add(g),l[M].add(g))}let _=this.groups;_.length===0&&(_=[{start:0,count:e.count}]);for(let L=0,b=_.length;L<b;++L){const M=_[L],P=M.start,D=M.count;for(let O=P,V=P+D;O<V;O+=3)m(e.getX(O+0),e.getX(O+1),e.getX(O+2))}const y=new w,x=new w,E=new w,A=new w;function R(L){E.fromBufferAttribute(i,L),A.copy(E);const b=a[L];y.copy(b),y.sub(E.multiplyScalar(E.dot(b))).normalize(),x.crossVectors(A,b);const P=x.dot(l[L])<0?-1:1;o.setXYZW(L,y.x,y.y,y.z,P)}for(let L=0,b=_.length;L<b;++L){const M=_[L],P=M.start,D=M.count;for(let O=P,V=P+D;O<V;O+=3)R(e.getX(O+0)),R(e.getX(O+1)),R(e.getX(O+2))}}computeVertexNormals(){const e=this.index,t=this.getAttribute("position");if(t!==void 0){let n=this.getAttribute("normal");if(n===void 0)n=new Gt(new Float32Array(t.count*3),3),this.setAttribute("normal",n);else for(let f=0,d=n.count;f<d;f++)n.setXYZ(f,0,0,0);const i=new w,r=new w,o=new w,a=new w,l=new w,c=new w,u=new w,h=new w;if(e)for(let f=0,d=e.count;f<d;f+=3){const p=e.getX(f+0),v=e.getX(f+1),g=e.getX(f+2);i.fromBufferAttribute(t,p),r.fromBufferAttribute(t,v),o.fromBufferAttribute(t,g),u.subVectors(o,r),h.subVectors(i,r),u.cross(h),a.fromBufferAttribute(n,p),l.fromBufferAttribute(n,v),c.fromBufferAttribute(n,g),a.add(u),l.add(u),c.add(u),n.setXYZ(p,a.x,a.y,a.z),n.setXYZ(v,l.x,l.y,l.z),n.setXYZ(g,c.x,c.y,c.z)}else for(let f=0,d=t.count;f<d;f+=3)i.fromBufferAttribute(t,f+0),r.fromBufferAttribute(t,f+1),o.fromBufferAttribute(t,f+2),u.subVectors(o,r),h.subVectors(i,r),u.cross(h),n.setXYZ(f+0,u.x,u.y,u.z),n.setXYZ(f+1,u.x,u.y,u.z),n.setXYZ(f+2,u.x,u.y,u.z);this.normalizeNormals(),n.needsUpdate=!0}}normalizeNormals(){const e=this.attributes.normal;for(let t=0,n=e.count;t<n;t++)Pt.fromBufferAttribute(e,t),Pt.normalize(),e.setXYZ(t,Pt.x,Pt.y,Pt.z)}toNonIndexed(){function e(a,l){const c=a.array,u=a.itemSize,h=a.normalized,f=new c.constructor(l.length*u);let d=0,p=0;for(let v=0,g=l.length;v<g;v++){a.isInterleavedBufferAttribute?d=l[v]*a.data.stride+a.offset:d=l[v]*u;for(let m=0;m<u;m++)f[p++]=c[d++]}return new Gt(f,u,h)}if(this.index===null)return console.warn("THREE.BufferGeometry.toNonIndexed(): BufferGeometry is already non-indexed."),this;const t=new Et,n=this.index.array,i=this.attributes;for(const a in i){const l=i[a],c=e(l,n);t.setAttribute(a,c)}const r=this.morphAttributes;for(const a in r){const l=[],c=r[a];for(let u=0,h=c.length;u<h;u++){const f=c[u],d=e(f,n);l.push(d)}t.morphAttributes[a]=l}t.morphTargetsRelative=this.morphTargetsRelative;const o=this.groups;for(let a=0,l=o.length;a<l;a++){const c=o[a];t.addGroup(c.start,c.count,c.materialIndex)}return t}toJSON(){const e={metadata:{version:4.7,type:"BufferGeometry",generator:"BufferGeometry.toJSON"}};if(e.uuid=this.uuid,e.type=this.type,this.name!==""&&(e.name=this.name),Object.keys(this.userData).length>0&&(e.userData=this.userData),this.parameters!==void 0){const l=this.parameters;for(const c in l)l[c]!==void 0&&(e[c]=l[c]);return e}e.data={attributes:{}};const t=this.index;t!==null&&(e.data.index={type:t.array.constructor.name,array:Array.prototype.slice.call(t.array)});const n=this.attributes;for(const l in n){const c=n[l];e.data.attributes[l]=c.toJSON(e.data)}const i={};let r=!1;for(const l in this.morphAttributes){const c=this.morphAttributes[l],u=[];for(let h=0,f=c.length;h<f;h++){const d=c[h];u.push(d.toJSON(e.data))}u.length>0&&(i[l]=u,r=!0)}r&&(e.data.morphAttributes=i,e.data.morphTargetsRelative=this.morphTargetsRelative);const o=this.groups;o.length>0&&(e.data.groups=JSON.parse(JSON.stringify(o)));const a=this.boundingSphere;return a!==null&&(e.data.boundingSphere=a.toJSON()),e}clone(){return new this.constructor().copy(this)}copy(e){this.index=null,this.attributes={},this.morphAttributes={},this.groups=[],this.boundingBox=null,this.boundingSphere=null;const t={};this.name=e.name;const n=e.index;n!==null&&this.setIndex(n.clone());const i=e.attributes;for(const c in i){const u=i[c];this.setAttribute(c,u.clone(t))}const r=e.morphAttributes;for(const c in r){const u=[],h=r[c];for(let f=0,d=h.length;f<d;f++)u.push(h[f].clone(t));this.morphAttributes[c]=u}this.morphTargetsRelative=e.morphTargetsRelative;const o=e.groups;for(let c=0,u=o.length;c<u;c++){const h=o[c];this.addGroup(h.start,h.count,h.materialIndex)}const a=e.boundingBox;a!==null&&(this.boundingBox=a.clone());const l=e.boundingSphere;return l!==null&&(this.boundingSphere=l.clone()),this.drawRange.start=e.drawRange.start,this.drawRange.count=e.drawRange.count,this.userData=e.userData,this}dispose(){this.dispatchEvent({type:"dispose"})}}const Uc=new Le,xi=new gr,Pr=new In,Fc=new w,Lr=new w,Ir=new w,Dr=new w,ea=new w,Nr=new w,Oc=new w,Ur=new w;class Ye extends dt{constructor(e=new Et,t=new Kt){super(),this.isMesh=!0,this.type="Mesh",this.geometry=e,this.material=t,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.count=1,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),e.morphTargetInfluences!==void 0&&(this.morphTargetInfluences=e.morphTargetInfluences.slice()),e.morphTargetDictionary!==void 0&&(this.morphTargetDictionary=Object.assign({},e.morphTargetDictionary)),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}updateMorphTargets(){const t=this.geometry.morphAttributes,n=Object.keys(t);if(n.length>0){const i=t[n[0]];if(i!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,o=i.length;r<o;r++){const a=i[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[a]=r}}}}getVertexPosition(e,t){const n=this.geometry,i=n.attributes.position,r=n.morphAttributes.position,o=n.morphTargetsRelative;t.fromBufferAttribute(i,e);const a=this.morphTargetInfluences;if(r&&a){Nr.set(0,0,0);for(let l=0,c=r.length;l<c;l++){const u=a[l],h=r[l];u!==0&&(ea.fromBufferAttribute(h,e),o?Nr.addScaledVector(ea,u):Nr.addScaledVector(ea.sub(t),u))}t.add(Nr)}return t}raycast(e,t){const n=this.geometry,i=this.material,r=this.matrixWorld;i!==void 0&&(n.boundingSphere===null&&n.computeBoundingSphere(),Pr.copy(n.boundingSphere),Pr.applyMatrix4(r),xi.copy(e.ray).recast(e.near),!(Pr.containsPoint(xi.origin)===!1&&(xi.intersectSphere(Pr,Fc)===null||xi.origin.distanceToSquared(Fc)>(e.far-e.near)**2))&&(Uc.copy(r).invert(),xi.copy(e.ray).applyMatrix4(Uc),!(n.boundingBox!==null&&xi.intersectsBox(n.boundingBox)===!1)&&this._computeIntersections(e,t,xi)))}_computeIntersections(e,t,n){let i;const r=this.geometry,o=this.material,a=r.index,l=r.attributes.position,c=r.attributes.uv,u=r.attributes.uv1,h=r.attributes.normal,f=r.groups,d=r.drawRange;if(a!==null)if(Array.isArray(o))for(let p=0,v=f.length;p<v;p++){const g=f[p],m=o[g.materialIndex],_=Math.max(g.start,d.start),y=Math.min(a.count,Math.min(g.start+g.count,d.start+d.count));for(let x=_,E=y;x<E;x+=3){const A=a.getX(x),R=a.getX(x+1),L=a.getX(x+2);i=Fr(this,m,e,n,c,u,h,A,R,L),i&&(i.faceIndex=Math.floor(x/3),i.face.materialIndex=g.materialIndex,t.push(i))}}else{const p=Math.max(0,d.start),v=Math.min(a.count,d.start+d.count);for(let g=p,m=v;g<m;g+=3){const _=a.getX(g),y=a.getX(g+1),x=a.getX(g+2);i=Fr(this,o,e,n,c,u,h,_,y,x),i&&(i.faceIndex=Math.floor(g/3),t.push(i))}}else if(l!==void 0)if(Array.isArray(o))for(let p=0,v=f.length;p<v;p++){const g=f[p],m=o[g.materialIndex],_=Math.max(g.start,d.start),y=Math.min(l.count,Math.min(g.start+g.count,d.start+d.count));for(let x=_,E=y;x<E;x+=3){const A=x,R=x+1,L=x+2;i=Fr(this,m,e,n,c,u,h,A,R,L),i&&(i.faceIndex=Math.floor(x/3),i.face.materialIndex=g.materialIndex,t.push(i))}}else{const p=Math.max(0,d.start),v=Math.min(l.count,d.start+d.count);for(let g=p,m=v;g<m;g+=3){const _=g,y=g+1,x=g+2;i=Fr(this,o,e,n,c,u,h,_,y,x),i&&(i.faceIndex=Math.floor(g/3),t.push(i))}}}}function Xd(s,e,t,n,i,r,o,a){let l;if(e.side===Lt?l=n.intersectTriangle(o,r,i,!0,a):l=n.intersectTriangle(i,r,o,e.side===Yn,a),l===null)return null;Ur.copy(a),Ur.applyMatrix4(s.matrixWorld);const c=t.ray.origin.distanceTo(Ur);return c<t.near||c>t.far?null:{distance:c,point:Ur.clone(),object:s}}function Fr(s,e,t,n,i,r,o,a,l,c){s.getVertexPosition(a,Lr),s.getVertexPosition(l,Ir),s.getVertexPosition(c,Dr);const u=Xd(s,e,t,n,Lr,Ir,Dr,Oc);if(u){const h=new w;un.getBarycoord(Oc,Lr,Ir,Dr,h),i&&(u.uv=un.getInterpolatedAttribute(i,a,l,c,h,new ne)),r&&(u.uv1=un.getInterpolatedAttribute(r,a,l,c,h,new ne)),o&&(u.normal=un.getInterpolatedAttribute(o,a,l,c,h,new w),u.normal.dot(n.direction)>0&&u.normal.multiplyScalar(-1));const f={a,b:l,c,normal:new w,materialIndex:0};un.getNormal(Lr,Ir,Dr,f.normal),u.face=f,u.barycoord=h}return u}class Qn extends Et{constructor(e=1,t=1,n=1,i=1,r=1,o=1){super(),this.type="BoxGeometry",this.parameters={width:e,height:t,depth:n,widthSegments:i,heightSegments:r,depthSegments:o};const a=this;i=Math.floor(i),r=Math.floor(r),o=Math.floor(o);const l=[],c=[],u=[],h=[];let f=0,d=0;p("z","y","x",-1,-1,n,t,e,o,r,0),p("z","y","x",1,-1,n,t,-e,o,r,1),p("x","z","y",1,1,e,n,t,i,o,2),p("x","z","y",1,-1,e,n,-t,i,o,3),p("x","y","z",1,-1,e,t,n,i,r,4),p("x","y","z",-1,-1,e,t,-n,i,r,5),this.setIndex(l),this.setAttribute("position",new it(c,3)),this.setAttribute("normal",new it(u,3)),this.setAttribute("uv",new it(h,2));function p(v,g,m,_,y,x,E,A,R,L,b){const M=x/R,P=E/L,D=x/2,O=E/2,V=A/2,B=R+1,W=L+1;let K=0,G=0;const le=new w;for(let de=0;de<W;de++){const pe=de*P-O;for(let Ne=0;Ne<B;Ne++){const Xe=Ne*M-D;le[v]=Xe*_,le[g]=pe*y,le[m]=V,c.push(le.x,le.y,le.z),le[v]=0,le[g]=0,le[m]=A>0?1:-1,u.push(le.x,le.y,le.z),h.push(Ne/R),h.push(1-de/L),K+=1}}for(let de=0;de<L;de++)for(let pe=0;pe<R;pe++){const Ne=f+pe+B*de,Xe=f+pe+B*(de+1),qe=f+(pe+1)+B*(de+1),je=f+(pe+1)+B*de;l.push(Ne,Xe,je),l.push(Xe,qe,je),G+=6}a.addGroup(d,G,b),d+=G,f+=K}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new Qn(e.width,e.height,e.depth,e.widthSegments,e.heightSegments,e.depthSegments)}}function ps(s){const e={};for(const t in s){e[t]={};for(const n in s[t]){const i=s[t][n];i&&(i.isColor||i.isMatrix3||i.isMatrix4||i.isVector2||i.isVector3||i.isVector4||i.isTexture||i.isQuaternion)?i.isRenderTargetTexture?(console.warn("UniformsUtils: Textures of render targets cannot be cloned via cloneUniforms() or mergeUniforms()."),e[t][n]=null):e[t][n]=i.clone():Array.isArray(i)?e[t][n]=i.slice():e[t][n]=i}}return e}function zt(s){const e={};for(let t=0;t<s.length;t++){const n=ps(s[t]);for(const i in n)e[i]=n[i]}return e}function qd(s){const e=[];for(let t=0;t<s.length;t++)e.push(s[t].clone());return e}function Th(s){const e=s.getRenderTarget();return e===null?s.outputColorSpace:e.isXRRenderTarget===!0?e.texture.colorSpace:et.workingColorSpace}const Kd={clone:ps,merge:zt};var $d=`void main() {
	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}`,Yd=`void main() {
	gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );
}`;class Tt extends xn{constructor(e){super(),this.isShaderMaterial=!0,this.type="ShaderMaterial",this.defines={},this.uniforms={},this.uniformsGroups=[],this.vertexShader=$d,this.fragmentShader=Yd,this.linewidth=1,this.wireframe=!1,this.wireframeLinewidth=1,this.fog=!1,this.lights=!1,this.clipping=!1,this.forceSinglePass=!0,this.extensions={clipCullDistance:!1,multiDraw:!1},this.defaultAttributeValues={color:[1,1,1],uv:[0,0],uv1:[0,0]},this.index0AttributeName=void 0,this.uniformsNeedUpdate=!1,this.glslVersion=null,e!==void 0&&this.setValues(e)}copy(e){return super.copy(e),this.fragmentShader=e.fragmentShader,this.vertexShader=e.vertexShader,this.uniforms=ps(e.uniforms),this.uniformsGroups=qd(e.uniformsGroups),this.defines=Object.assign({},e.defines),this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.fog=e.fog,this.lights=e.lights,this.clipping=e.clipping,this.extensions=Object.assign({},e.extensions),this.glslVersion=e.glslVersion,this}toJSON(e){const t=super.toJSON(e);t.glslVersion=this.glslVersion,t.uniforms={};for(const i in this.uniforms){const o=this.uniforms[i].value;o&&o.isTexture?t.uniforms[i]={type:"t",value:o.toJSON(e).uuid}:o&&o.isColor?t.uniforms[i]={type:"c",value:o.getHex()}:o&&o.isVector2?t.uniforms[i]={type:"v2",value:o.toArray()}:o&&o.isVector3?t.uniforms[i]={type:"v3",value:o.toArray()}:o&&o.isVector4?t.uniforms[i]={type:"v4",value:o.toArray()}:o&&o.isMatrix3?t.uniforms[i]={type:"m3",value:o.toArray()}:o&&o.isMatrix4?t.uniforms[i]={type:"m4",value:o.toArray()}:t.uniforms[i]={value:o}}Object.keys(this.defines).length>0&&(t.defines=this.defines),t.vertexShader=this.vertexShader,t.fragmentShader=this.fragmentShader,t.lights=this.lights,t.clipping=this.clipping;const n={};for(const i in this.extensions)this.extensions[i]===!0&&(n[i]=!0);return Object.keys(n).length>0&&(t.extensions=n),t}}class Eh extends dt{constructor(){super(),this.isCamera=!0,this.type="Camera",this.matrixWorldInverse=new Le,this.projectionMatrix=new Le,this.projectionMatrixInverse=new Le,this.coordinateSystem=Cn,this._reversedDepth=!1}get reversedDepth(){return this._reversedDepth}copy(e,t){return super.copy(e,t),this.matrixWorldInverse.copy(e.matrixWorldInverse),this.projectionMatrix.copy(e.projectionMatrix),this.projectionMatrixInverse.copy(e.projectionMatrixInverse),this.coordinateSystem=e.coordinateSystem,this}getWorldDirection(e){return super.getWorldDirection(e).negate()}updateMatrixWorld(e){super.updateMatrixWorld(e),this.matrixWorldInverse.copy(this.matrixWorld).invert()}updateWorldMatrix(e,t){super.updateWorldMatrix(e,t),this.matrixWorldInverse.copy(this.matrixWorld).invert()}clone(){return new this.constructor().copy(this)}}const ri=new w,kc=new ne,Bc=new ne;class Dt extends Eh{constructor(e=50,t=1,n=.1,i=2e3){super(),this.isPerspectiveCamera=!0,this.type="PerspectiveCamera",this.fov=e,this.zoom=1,this.near=n,this.far=i,this.focus=10,this.aspect=t,this.view=null,this.filmGauge=35,this.filmOffset=0,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.fov=e.fov,this.zoom=e.zoom,this.near=e.near,this.far=e.far,this.focus=e.focus,this.aspect=e.aspect,this.view=e.view===null?null:Object.assign({},e.view),this.filmGauge=e.filmGauge,this.filmOffset=e.filmOffset,this}setFocalLength(e){const t=.5*this.getFilmHeight()/e;this.fov=ds*2*Math.atan(t),this.updateProjectionMatrix()}getFocalLength(){const e=Math.tan($s*.5*this.fov);return .5*this.getFilmHeight()/e}getEffectiveFOV(){return ds*2*Math.atan(Math.tan($s*.5*this.fov)/this.zoom)}getFilmWidth(){return this.filmGauge*Math.min(this.aspect,1)}getFilmHeight(){return this.filmGauge/Math.max(this.aspect,1)}getViewBounds(e,t,n){ri.set(-1,-1,.5).applyMatrix4(this.projectionMatrixInverse),t.set(ri.x,ri.y).multiplyScalar(-e/ri.z),ri.set(1,1,.5).applyMatrix4(this.projectionMatrixInverse),n.set(ri.x,ri.y).multiplyScalar(-e/ri.z)}getViewSize(e,t){return this.getViewBounds(e,kc,Bc),t.subVectors(Bc,kc)}setViewOffset(e,t,n,i,r,o){this.aspect=e/t,this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=n,this.view.offsetY=i,this.view.width=r,this.view.height=o,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const e=this.near;let t=e*Math.tan($s*.5*this.fov)/this.zoom,n=2*t,i=this.aspect*n,r=-.5*i;const o=this.view;if(this.view!==null&&this.view.enabled){const l=o.fullWidth,c=o.fullHeight;r+=o.offsetX*i/l,t-=o.offsetY*n/c,i*=o.width/l,n*=o.height/c}const a=this.filmOffset;a!==0&&(r+=e*a/this.getFilmWidth()),this.projectionMatrix.makePerspective(r,r+i,t,t-n,e,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){const t=super.toJSON(e);return t.object.fov=this.fov,t.object.zoom=this.zoom,t.object.near=this.near,t.object.far=this.far,t.object.focus=this.focus,t.object.aspect=this.aspect,this.view!==null&&(t.object.view=Object.assign({},this.view)),t.object.filmGauge=this.filmGauge,t.object.filmOffset=this.filmOffset,t}}const Ki=-90,$i=1;class jd extends dt{constructor(e,t,n){super(),this.type="CubeCamera",this.renderTarget=n,this.coordinateSystem=null,this.activeMipmapLevel=0;const i=new Dt(Ki,$i,e,t);i.layers=this.layers,this.add(i);const r=new Dt(Ki,$i,e,t);r.layers=this.layers,this.add(r);const o=new Dt(Ki,$i,e,t);o.layers=this.layers,this.add(o);const a=new Dt(Ki,$i,e,t);a.layers=this.layers,this.add(a);const l=new Dt(Ki,$i,e,t);l.layers=this.layers,this.add(l);const c=new Dt(Ki,$i,e,t);c.layers=this.layers,this.add(c)}updateCoordinateSystem(){const e=this.coordinateSystem,t=this.children.concat(),[n,i,r,o,a,l]=t;for(const c of t)this.remove(c);if(e===Cn)n.up.set(0,1,0),n.lookAt(1,0,0),i.up.set(0,1,0),i.lookAt(-1,0,0),r.up.set(0,0,-1),r.lookAt(0,1,0),o.up.set(0,0,1),o.lookAt(0,-1,0),a.up.set(0,1,0),a.lookAt(0,0,1),l.up.set(0,1,0),l.lookAt(0,0,-1);else if(e===_o)n.up.set(0,-1,0),n.lookAt(-1,0,0),i.up.set(0,-1,0),i.lookAt(1,0,0),r.up.set(0,0,1),r.lookAt(0,1,0),o.up.set(0,0,-1),o.lookAt(0,-1,0),a.up.set(0,-1,0),a.lookAt(0,0,1),l.up.set(0,-1,0),l.lookAt(0,0,-1);else throw new Error("THREE.CubeCamera.updateCoordinateSystem(): Invalid coordinate system: "+e);for(const c of t)this.add(c),c.updateMatrixWorld()}update(e,t){this.parent===null&&this.updateMatrixWorld();const{renderTarget:n,activeMipmapLevel:i}=this;this.coordinateSystem!==e.coordinateSystem&&(this.coordinateSystem=e.coordinateSystem,this.updateCoordinateSystem());const[r,o,a,l,c,u]=this.children,h=e.getRenderTarget(),f=e.getActiveCubeFace(),d=e.getActiveMipmapLevel(),p=e.xr.enabled;e.xr.enabled=!1;const v=n.texture.generateMipmaps;n.texture.generateMipmaps=!1,e.setRenderTarget(n,0,i),e.render(t,r),e.setRenderTarget(n,1,i),e.render(t,o),e.setRenderTarget(n,2,i),e.render(t,a),e.setRenderTarget(n,3,i),e.render(t,l),e.setRenderTarget(n,4,i),e.render(t,c),n.texture.generateMipmaps=v,e.setRenderTarget(n,5,i),e.render(t,u),e.setRenderTarget(h,f,d),e.xr.enabled=p,n.texture.needsPMREMUpdate=!0}}class wh extends At{constructor(e=[],t=hs,n,i,r,o,a,l,c,u){super(e,t,n,i,r,o,a,l,c,u),this.isCubeTexture=!0,this.flipY=!1}get images(){return this.image}set images(e){this.image=e}}class Eo extends Ln{constructor(e=1,t={}){super(e,e,t),this.isWebGLCubeRenderTarget=!0;const n={width:e,height:e,depth:1},i=[n,n,n,n,n,n];this.texture=new wh(i),this._setTextureOptions(t),this.texture.isRenderTargetTexture=!0}fromEquirectangularTexture(e,t){this.texture.type=t.type,this.texture.colorSpace=t.colorSpace,this.texture.generateMipmaps=t.generateMipmaps,this.texture.minFilter=t.minFilter,this.texture.magFilter=t.magFilter;const n={uniforms:{tEquirect:{value:null}},vertexShader:`

				varying vec3 vWorldDirection;

				vec3 transformDirection( in vec3 dir, in mat4 matrix ) {

					return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );

				}

				void main() {

					vWorldDirection = transformDirection( position, modelMatrix );

					#include <begin_vertex>
					#include <project_vertex>

				}
			`,fragmentShader:`

				uniform sampler2D tEquirect;

				varying vec3 vWorldDirection;

				#include <common>

				void main() {

					vec3 direction = normalize( vWorldDirection );

					vec2 sampleUV = equirectUv( direction );

					gl_FragColor = texture2D( tEquirect, sampleUV );

				}
			`},i=new Qn(5,5,5),r=new Tt({name:"CubemapFromEquirect",uniforms:ps(n.uniforms),vertexShader:n.vertexShader,fragmentShader:n.fragmentShader,side:Lt,blending:ui});r.uniforms.tEquirect.value=t;const o=new Ye(i,r),a=t.minFilter;return t.minFilter===tn&&(t.minFilter=_t),new jd(1,10,this).update(e,o),t.minFilter=a,o.geometry.dispose(),o.material.dispose(),this}clear(e,t=!0,n=!0,i=!0){const r=e.getRenderTarget();for(let o=0;o<6;o++)e.setRenderTarget(this,o),e.clear(t,n,i);e.setRenderTarget(r)}}class Ht extends dt{constructor(){super(),this.isGroup=!0,this.type="Group"}}const Zd={type:"move"};class ta{constructor(){this._targetRay=null,this._grip=null,this._hand=null}getHandSpace(){return this._hand===null&&(this._hand=new Ht,this._hand.matrixAutoUpdate=!1,this._hand.visible=!1,this._hand.joints={},this._hand.inputState={pinching:!1}),this._hand}getTargetRaySpace(){return this._targetRay===null&&(this._targetRay=new Ht,this._targetRay.matrixAutoUpdate=!1,this._targetRay.visible=!1,this._targetRay.hasLinearVelocity=!1,this._targetRay.linearVelocity=new w,this._targetRay.hasAngularVelocity=!1,this._targetRay.angularVelocity=new w),this._targetRay}getGripSpace(){return this._grip===null&&(this._grip=new Ht,this._grip.matrixAutoUpdate=!1,this._grip.visible=!1,this._grip.hasLinearVelocity=!1,this._grip.linearVelocity=new w,this._grip.hasAngularVelocity=!1,this._grip.angularVelocity=new w),this._grip}dispatchEvent(e){return this._targetRay!==null&&this._targetRay.dispatchEvent(e),this._grip!==null&&this._grip.dispatchEvent(e),this._hand!==null&&this._hand.dispatchEvent(e),this}connect(e){if(e&&e.hand){const t=this._hand;if(t)for(const n of e.hand.values())this._getHandJoint(t,n)}return this.dispatchEvent({type:"connected",data:e}),this}disconnect(e){return this.dispatchEvent({type:"disconnected",data:e}),this._targetRay!==null&&(this._targetRay.visible=!1),this._grip!==null&&(this._grip.visible=!1),this._hand!==null&&(this._hand.visible=!1),this}update(e,t,n){let i=null,r=null,o=null;const a=this._targetRay,l=this._grip,c=this._hand;if(e&&t.session.visibilityState!=="visible-blurred"){if(c&&e.hand){o=!0;for(const v of e.hand.values()){const g=t.getJointPose(v,n),m=this._getHandJoint(c,v);g!==null&&(m.matrix.fromArray(g.transform.matrix),m.matrix.decompose(m.position,m.rotation,m.scale),m.matrixWorldNeedsUpdate=!0,m.jointRadius=g.radius),m.visible=g!==null}const u=c.joints["index-finger-tip"],h=c.joints["thumb-tip"],f=u.position.distanceTo(h.position),d=.02,p=.005;c.inputState.pinching&&f>d+p?(c.inputState.pinching=!1,this.dispatchEvent({type:"pinchend",handedness:e.handedness,target:this})):!c.inputState.pinching&&f<=d-p&&(c.inputState.pinching=!0,this.dispatchEvent({type:"pinchstart",handedness:e.handedness,target:this}))}else l!==null&&e.gripSpace&&(r=t.getPose(e.gripSpace,n),r!==null&&(l.matrix.fromArray(r.transform.matrix),l.matrix.decompose(l.position,l.rotation,l.scale),l.matrixWorldNeedsUpdate=!0,r.linearVelocity?(l.hasLinearVelocity=!0,l.linearVelocity.copy(r.linearVelocity)):l.hasLinearVelocity=!1,r.angularVelocity?(l.hasAngularVelocity=!0,l.angularVelocity.copy(r.angularVelocity)):l.hasAngularVelocity=!1));a!==null&&(i=t.getPose(e.targetRaySpace,n),i===null&&r!==null&&(i=r),i!==null&&(a.matrix.fromArray(i.transform.matrix),a.matrix.decompose(a.position,a.rotation,a.scale),a.matrixWorldNeedsUpdate=!0,i.linearVelocity?(a.hasLinearVelocity=!0,a.linearVelocity.copy(i.linearVelocity)):a.hasLinearVelocity=!1,i.angularVelocity?(a.hasAngularVelocity=!0,a.angularVelocity.copy(i.angularVelocity)):a.hasAngularVelocity=!1,this.dispatchEvent(Zd)))}return a!==null&&(a.visible=i!==null),l!==null&&(l.visible=r!==null),c!==null&&(c.visible=o!==null),this}_getHandJoint(e,t){if(e.joints[t.jointName]===void 0){const n=new Ht;n.matrixAutoUpdate=!1,n.visible=!1,e.joints[t.jointName]=n,e.add(n)}return e.joints[t.jointName]}}class Ii extends dt{constructor(){super(),this.isScene=!0,this.type="Scene",this.background=null,this.environment=null,this.fog=null,this.backgroundBlurriness=0,this.backgroundIntensity=1,this.backgroundRotation=new Xt,this.environmentIntensity=1,this.environmentRotation=new Xt,this.overrideMaterial=null,typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}copy(e,t){return super.copy(e,t),e.background!==null&&(this.background=e.background.clone()),e.environment!==null&&(this.environment=e.environment.clone()),e.fog!==null&&(this.fog=e.fog.clone()),this.backgroundBlurriness=e.backgroundBlurriness,this.backgroundIntensity=e.backgroundIntensity,this.backgroundRotation.copy(e.backgroundRotation),this.environmentIntensity=e.environmentIntensity,this.environmentRotation.copy(e.environmentRotation),e.overrideMaterial!==null&&(this.overrideMaterial=e.overrideMaterial.clone()),this.matrixAutoUpdate=e.matrixAutoUpdate,this}toJSON(e){const t=super.toJSON(e);return this.fog!==null&&(t.object.fog=this.fog.toJSON()),this.backgroundBlurriness>0&&(t.object.backgroundBlurriness=this.backgroundBlurriness),this.backgroundIntensity!==1&&(t.object.backgroundIntensity=this.backgroundIntensity),t.object.backgroundRotation=this.backgroundRotation.toArray(),this.environmentIntensity!==1&&(t.object.environmentIntensity=this.environmentIntensity),t.object.environmentRotation=this.environmentRotation.toArray(),t}}class Ah{constructor(e,t){this.isInterleavedBuffer=!0,this.array=e,this.stride=t,this.count=e!==void 0?e.length/t:0,this.usage=pl,this.updateRanges=[],this.version=0,this.uuid=hn()}onUploadCallback(){}set needsUpdate(e){e===!0&&this.version++}setUsage(e){return this.usage=e,this}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}copy(e){return this.array=new e.array.constructor(e.array),this.count=e.count,this.stride=e.stride,this.usage=e.usage,this}copyAt(e,t,n){e*=this.stride,n*=t.stride;for(let i=0,r=this.stride;i<r;i++)this.array[e+i]=t.array[n+i];return this}set(e,t=0){return this.array.set(e,t),this}clone(e){e.arrayBuffers===void 0&&(e.arrayBuffers={}),this.array.buffer._uuid===void 0&&(this.array.buffer._uuid=hn()),e.arrayBuffers[this.array.buffer._uuid]===void 0&&(e.arrayBuffers[this.array.buffer._uuid]=this.array.slice(0).buffer);const t=new this.array.constructor(e.arrayBuffers[this.array.buffer._uuid]),n=new this.constructor(t,this.stride);return n.setUsage(this.usage),n}onUpload(e){return this.onUploadCallback=e,this}toJSON(e){return e.arrayBuffers===void 0&&(e.arrayBuffers={}),this.array.buffer._uuid===void 0&&(this.array.buffer._uuid=hn()),e.arrayBuffers[this.array.buffer._uuid]===void 0&&(e.arrayBuffers[this.array.buffer._uuid]=Array.from(new Uint32Array(this.array.buffer))),{uuid:this.uuid,buffer:this.array.buffer._uuid,type:this.array.constructor.name,stride:this.stride}}}const Bt=new w;class hr{constructor(e,t,n,i=!1){this.isInterleavedBufferAttribute=!0,this.name="",this.data=e,this.itemSize=t,this.offset=n,this.normalized=i}get count(){return this.data.count}get array(){return this.data.array}set needsUpdate(e){this.data.needsUpdate=e}applyMatrix4(e){for(let t=0,n=this.data.count;t<n;t++)Bt.fromBufferAttribute(this,t),Bt.applyMatrix4(e),this.setXYZ(t,Bt.x,Bt.y,Bt.z);return this}applyNormalMatrix(e){for(let t=0,n=this.count;t<n;t++)Bt.fromBufferAttribute(this,t),Bt.applyNormalMatrix(e),this.setXYZ(t,Bt.x,Bt.y,Bt.z);return this}transformDirection(e){for(let t=0,n=this.count;t<n;t++)Bt.fromBufferAttribute(this,t),Bt.transformDirection(e),this.setXYZ(t,Bt.x,Bt.y,Bt.z);return this}getComponent(e,t){let n=this.array[e*this.data.stride+this.offset+t];return this.normalized&&(n=mn(n,this.array)),n}setComponent(e,t,n){return this.normalized&&(n=st(n,this.array)),this.data.array[e*this.data.stride+this.offset+t]=n,this}setX(e,t){return this.normalized&&(t=st(t,this.array)),this.data.array[e*this.data.stride+this.offset]=t,this}setY(e,t){return this.normalized&&(t=st(t,this.array)),this.data.array[e*this.data.stride+this.offset+1]=t,this}setZ(e,t){return this.normalized&&(t=st(t,this.array)),this.data.array[e*this.data.stride+this.offset+2]=t,this}setW(e,t){return this.normalized&&(t=st(t,this.array)),this.data.array[e*this.data.stride+this.offset+3]=t,this}getX(e){let t=this.data.array[e*this.data.stride+this.offset];return this.normalized&&(t=mn(t,this.array)),t}getY(e){let t=this.data.array[e*this.data.stride+this.offset+1];return this.normalized&&(t=mn(t,this.array)),t}getZ(e){let t=this.data.array[e*this.data.stride+this.offset+2];return this.normalized&&(t=mn(t,this.array)),t}getW(e){let t=this.data.array[e*this.data.stride+this.offset+3];return this.normalized&&(t=mn(t,this.array)),t}setXY(e,t,n){return e=e*this.data.stride+this.offset,this.normalized&&(t=st(t,this.array),n=st(n,this.array)),this.data.array[e+0]=t,this.data.array[e+1]=n,this}setXYZ(e,t,n,i){return e=e*this.data.stride+this.offset,this.normalized&&(t=st(t,this.array),n=st(n,this.array),i=st(i,this.array)),this.data.array[e+0]=t,this.data.array[e+1]=n,this.data.array[e+2]=i,this}setXYZW(e,t,n,i,r){return e=e*this.data.stride+this.offset,this.normalized&&(t=st(t,this.array),n=st(n,this.array),i=st(i,this.array),r=st(r,this.array)),this.data.array[e+0]=t,this.data.array[e+1]=n,this.data.array[e+2]=i,this.data.array[e+3]=r,this}clone(e){if(e===void 0){console.log("THREE.InterleavedBufferAttribute.clone(): Cloning an interleaved buffer attribute will de-interleave buffer data.");const t=[];for(let n=0;n<this.count;n++){const i=n*this.data.stride+this.offset;for(let r=0;r<this.itemSize;r++)t.push(this.data.array[i+r])}return new Gt(new this.array.constructor(t),this.itemSize,this.normalized)}else return e.interleavedBuffers===void 0&&(e.interleavedBuffers={}),e.interleavedBuffers[this.data.uuid]===void 0&&(e.interleavedBuffers[this.data.uuid]=this.data.clone(e)),new hr(e.interleavedBuffers[this.data.uuid],this.itemSize,this.offset,this.normalized)}toJSON(e){if(e===void 0){console.log("THREE.InterleavedBufferAttribute.toJSON(): Serializing an interleaved buffer attribute will de-interleave buffer data.");const t=[];for(let n=0;n<this.count;n++){const i=n*this.data.stride+this.offset;for(let r=0;r<this.itemSize;r++)t.push(this.data.array[i+r])}return{itemSize:this.itemSize,type:this.array.constructor.name,array:t,normalized:this.normalized}}else return e.interleavedBuffers===void 0&&(e.interleavedBuffers={}),e.interleavedBuffers[this.data.uuid]===void 0&&(e.interleavedBuffers[this.data.uuid]=this.data.toJSON(e)),{isInterleavedBufferAttribute:!0,itemSize:this.itemSize,data:this.data.uuid,offset:this.offset,normalized:this.normalized}}}class Rh extends xn{constructor(e){super(),this.isSpriteMaterial=!0,this.type="SpriteMaterial",this.color=new Ue(16777215),this.map=null,this.alphaMap=null,this.rotation=0,this.sizeAttenuation=!0,this.transparent=!0,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.alphaMap=e.alphaMap,this.rotation=e.rotation,this.sizeAttenuation=e.sizeAttenuation,this.fog=e.fog,this}}let Yi;const Is=new w,ji=new w,Zi=new w,Ji=new ne,Ds=new ne,Ch=new Le,Or=new w,Ns=new w,kr=new w,zc=new ne,na=new ne,Hc=new ne;class Jd extends dt{constructor(e=new Rh){if(super(),this.isSprite=!0,this.type="Sprite",Yi===void 0){Yi=new Et;const t=new Float32Array([-.5,-.5,0,0,0,.5,-.5,0,1,0,.5,.5,0,1,1,-.5,.5,0,0,1]),n=new Ah(t,5);Yi.setIndex([0,1,2,0,2,3]),Yi.setAttribute("position",new hr(n,3,0,!1)),Yi.setAttribute("uv",new hr(n,2,3,!1))}this.geometry=Yi,this.material=e,this.center=new ne(.5,.5),this.count=1}raycast(e,t){e.camera===null&&console.error('THREE.Sprite: "Raycaster.camera" needs to be set in order to raycast against sprites.'),ji.setFromMatrixScale(this.matrixWorld),Ch.copy(e.camera.matrixWorld),this.modelViewMatrix.multiplyMatrices(e.camera.matrixWorldInverse,this.matrixWorld),Zi.setFromMatrixPosition(this.modelViewMatrix),e.camera.isPerspectiveCamera&&this.material.sizeAttenuation===!1&&ji.multiplyScalar(-Zi.z);const n=this.material.rotation;let i,r;n!==0&&(r=Math.cos(n),i=Math.sin(n));const o=this.center;Br(Or.set(-.5,-.5,0),Zi,o,ji,i,r),Br(Ns.set(.5,-.5,0),Zi,o,ji,i,r),Br(kr.set(.5,.5,0),Zi,o,ji,i,r),zc.set(0,0),na.set(1,0),Hc.set(1,1);let a=e.ray.intersectTriangle(Or,Ns,kr,!1,Is);if(a===null&&(Br(Ns.set(-.5,.5,0),Zi,o,ji,i,r),na.set(0,1),a=e.ray.intersectTriangle(Or,kr,Ns,!1,Is),a===null))return;const l=e.ray.origin.distanceTo(Is);l<e.near||l>e.far||t.push({distance:l,point:Is.clone(),uv:un.getInterpolation(Is,Or,Ns,kr,zc,na,Hc,new ne),face:null,object:this})}copy(e,t){return super.copy(e,t),e.center!==void 0&&this.center.copy(e.center),this.material=e.material,this}}function Br(s,e,t,n,i,r){Ji.subVectors(s,t).addScalar(.5).multiply(n),i!==void 0?(Ds.x=r*Ji.x-i*Ji.y,Ds.y=i*Ji.x+r*Ji.y):Ds.copy(Ji),s.copy(e),s.x+=Ds.x,s.y+=Ds.y,s.applyMatrix4(Ch)}const Vc=new w,Gc=new He,Wc=new He,Qd=new w,Xc=new Le,zr=new w,ia=new In,qc=new Le,sa=new gr;class ep extends Ye{constructor(e,t){super(e,t),this.isSkinnedMesh=!0,this.type="SkinnedMesh",this.bindMode=vc,this.bindMatrix=new Le,this.bindMatrixInverse=new Le,this.boundingBox=null,this.boundingSphere=null}computeBoundingBox(){const e=this.geometry;this.boundingBox===null&&(this.boundingBox=new Jn),this.boundingBox.makeEmpty();const t=e.getAttribute("position");for(let n=0;n<t.count;n++)this.getVertexPosition(n,zr),this.boundingBox.expandByPoint(zr)}computeBoundingSphere(){const e=this.geometry;this.boundingSphere===null&&(this.boundingSphere=new In),this.boundingSphere.makeEmpty();const t=e.getAttribute("position");for(let n=0;n<t.count;n++)this.getVertexPosition(n,zr),this.boundingSphere.expandByPoint(zr)}copy(e,t){return super.copy(e,t),this.bindMode=e.bindMode,this.bindMatrix.copy(e.bindMatrix),this.bindMatrixInverse.copy(e.bindMatrixInverse),this.skeleton=e.skeleton,e.boundingBox!==null&&(this.boundingBox=e.boundingBox.clone()),e.boundingSphere!==null&&(this.boundingSphere=e.boundingSphere.clone()),this}raycast(e,t){const n=this.material,i=this.matrixWorld;n!==void 0&&(this.boundingSphere===null&&this.computeBoundingSphere(),ia.copy(this.boundingSphere),ia.applyMatrix4(i),e.ray.intersectsSphere(ia)!==!1&&(qc.copy(i).invert(),sa.copy(e.ray).applyMatrix4(qc),!(this.boundingBox!==null&&sa.intersectsBox(this.boundingBox)===!1)&&this._computeIntersections(e,t,sa)))}getVertexPosition(e,t){return super.getVertexPosition(e,t),this.applyBoneTransform(e,t),t}bind(e,t){this.skeleton=e,t===void 0&&(this.updateMatrixWorld(!0),this.skeleton.calculateInverses(),t=this.matrixWorld),this.bindMatrix.copy(t),this.bindMatrixInverse.copy(t).invert()}pose(){this.skeleton.pose()}normalizeSkinWeights(){const e=new He,t=this.geometry.attributes.skinWeight;for(let n=0,i=t.count;n<i;n++){e.fromBufferAttribute(t,n);const r=1/e.manhattanLength();r!==1/0?e.multiplyScalar(r):e.set(1,0,0,0),t.setXYZW(n,e.x,e.y,e.z,e.w)}}updateMatrixWorld(e){super.updateMatrixWorld(e),this.bindMode===vc?this.bindMatrixInverse.copy(this.matrixWorld).invert():this.bindMode===Yf?this.bindMatrixInverse.copy(this.bindMatrix).invert():console.warn("THREE.SkinnedMesh: Unrecognized bindMode: "+this.bindMode)}applyBoneTransform(e,t){const n=this.skeleton,i=this.geometry;Gc.fromBufferAttribute(i.attributes.skinIndex,e),Wc.fromBufferAttribute(i.attributes.skinWeight,e),Vc.copy(t).applyMatrix4(this.bindMatrix),t.set(0,0,0);for(let r=0;r<4;r++){const o=Wc.getComponent(r);if(o!==0){const a=Gc.getComponent(r);Xc.multiplyMatrices(n.bones[a].matrixWorld,n.boneInverses[a]),t.addScaledVector(Qd.copy(Vc).applyMatrix4(Xc),o)}}return t.applyMatrix4(this.bindMatrixInverse)}}class Ph extends dt{constructor(){super(),this.isBone=!0,this.type="Bone"}}class vr extends At{constructor(e=null,t=1,n=1,i,r,o,a,l,c=Vt,u=Vt,h,f){super(null,o,a,l,c,u,i,r,h,f),this.isDataTexture=!0,this.image={data:e,width:t,height:n},this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}const Kc=new Le,tp=new Le;class zl{constructor(e=[],t=[]){this.uuid=hn(),this.bones=e.slice(0),this.boneInverses=t,this.boneMatrices=null,this.boneTexture=null,this.init()}init(){const e=this.bones,t=this.boneInverses;if(this.boneMatrices=new Float32Array(e.length*16),t.length===0)this.calculateInverses();else if(e.length!==t.length){console.warn("THREE.Skeleton: Number of inverse bone matrices does not match amount of bones."),this.boneInverses=[];for(let n=0,i=this.bones.length;n<i;n++)this.boneInverses.push(new Le)}}calculateInverses(){this.boneInverses.length=0;for(let e=0,t=this.bones.length;e<t;e++){const n=new Le;this.bones[e]&&n.copy(this.bones[e].matrixWorld).invert(),this.boneInverses.push(n)}}pose(){for(let e=0,t=this.bones.length;e<t;e++){const n=this.bones[e];n&&n.matrixWorld.copy(this.boneInverses[e]).invert()}for(let e=0,t=this.bones.length;e<t;e++){const n=this.bones[e];n&&(n.parent&&n.parent.isBone?(n.matrix.copy(n.parent.matrixWorld).invert(),n.matrix.multiply(n.matrixWorld)):n.matrix.copy(n.matrixWorld),n.matrix.decompose(n.position,n.quaternion,n.scale))}}update(){const e=this.bones,t=this.boneInverses,n=this.boneMatrices,i=this.boneTexture;for(let r=0,o=e.length;r<o;r++){const a=e[r]?e[r].matrixWorld:tp;Kc.multiplyMatrices(a,t[r]),Kc.toArray(n,r*16)}i!==null&&(i.needsUpdate=!0)}clone(){return new zl(this.bones,this.boneInverses)}computeBoneTexture(){let e=Math.sqrt(this.bones.length*4);e=Math.ceil(e/4)*4,e=Math.max(e,4);const t=new Float32Array(e*e*4);t.set(this.boneMatrices);const n=new vr(t,e,e,Nt,gn);return n.needsUpdate=!0,this.boneMatrices=t,this.boneTexture=n,this}getBoneByName(e){for(let t=0,n=this.bones.length;t<n;t++){const i=this.bones[t];if(i.name===e)return i}}dispose(){this.boneTexture!==null&&(this.boneTexture.dispose(),this.boneTexture=null)}fromJSON(e,t){this.uuid=e.uuid;for(let n=0,i=e.bones.length;n<i;n++){const r=e.bones[n];let o=t[r];o===void 0&&(console.warn("THREE.Skeleton: No bone found with UUID:",r),o=new Ph),this.bones.push(o),this.boneInverses.push(new Le().fromArray(e.boneInverses[n]))}return this.init(),this}toJSON(){const e={metadata:{version:4.7,type:"Skeleton",generator:"Skeleton.toJSON"},bones:[],boneInverses:[]};e.uuid=this.uuid;const t=this.bones,n=this.boneInverses;for(let i=0,r=t.length;i<r;i++){const o=t[i];e.bones.push(o.uuid);const a=n[i];e.boneInverses.push(a.toArray())}return e}}class gl extends Gt{constructor(e,t,n,i=1){super(e,t,n),this.isInstancedBufferAttribute=!0,this.meshPerAttribute=i}copy(e){return super.copy(e),this.meshPerAttribute=e.meshPerAttribute,this}toJSON(){const e=super.toJSON();return e.meshPerAttribute=this.meshPerAttribute,e.isInstancedBufferAttribute=!0,e}}const Qi=new Le,$c=new Le,Hr=[],Yc=new Jn,np=new Le,Us=new Ye,Fs=new In;class ip extends Ye{constructor(e,t,n){super(e,t),this.isInstancedMesh=!0,this.instanceMatrix=new gl(new Float32Array(n*16),16),this.instanceColor=null,this.morphTexture=null,this.count=n,this.boundingBox=null,this.boundingSphere=null;for(let i=0;i<n;i++)this.setMatrixAt(i,np)}computeBoundingBox(){const e=this.geometry,t=this.count;this.boundingBox===null&&(this.boundingBox=new Jn),e.boundingBox===null&&e.computeBoundingBox(),this.boundingBox.makeEmpty();for(let n=0;n<t;n++)this.getMatrixAt(n,Qi),Yc.copy(e.boundingBox).applyMatrix4(Qi),this.boundingBox.union(Yc)}computeBoundingSphere(){const e=this.geometry,t=this.count;this.boundingSphere===null&&(this.boundingSphere=new In),e.boundingSphere===null&&e.computeBoundingSphere(),this.boundingSphere.makeEmpty();for(let n=0;n<t;n++)this.getMatrixAt(n,Qi),Fs.copy(e.boundingSphere).applyMatrix4(Qi),this.boundingSphere.union(Fs)}copy(e,t){return super.copy(e,t),this.instanceMatrix.copy(e.instanceMatrix),e.morphTexture!==null&&(this.morphTexture=e.morphTexture.clone()),e.instanceColor!==null&&(this.instanceColor=e.instanceColor.clone()),this.count=e.count,e.boundingBox!==null&&(this.boundingBox=e.boundingBox.clone()),e.boundingSphere!==null&&(this.boundingSphere=e.boundingSphere.clone()),this}getColorAt(e,t){t.fromArray(this.instanceColor.array,e*3)}getMatrixAt(e,t){t.fromArray(this.instanceMatrix.array,e*16)}getMorphAt(e,t){const n=t.morphTargetInfluences,i=this.morphTexture.source.data.data,r=n.length+1,o=e*r+1;for(let a=0;a<n.length;a++)n[a]=i[o+a]}raycast(e,t){const n=this.matrixWorld,i=this.count;if(Us.geometry=this.geometry,Us.material=this.material,Us.material!==void 0&&(this.boundingSphere===null&&this.computeBoundingSphere(),Fs.copy(this.boundingSphere),Fs.applyMatrix4(n),e.ray.intersectsSphere(Fs)!==!1))for(let r=0;r<i;r++){this.getMatrixAt(r,Qi),$c.multiplyMatrices(n,Qi),Us.matrixWorld=$c,Us.raycast(e,Hr);for(let o=0,a=Hr.length;o<a;o++){const l=Hr[o];l.instanceId=r,l.object=this,t.push(l)}Hr.length=0}}setColorAt(e,t){this.instanceColor===null&&(this.instanceColor=new gl(new Float32Array(this.instanceMatrix.count*3).fill(1),3)),t.toArray(this.instanceColor.array,e*3)}setMatrixAt(e,t){t.toArray(this.instanceMatrix.array,e*16)}setMorphAt(e,t){const n=t.morphTargetInfluences,i=n.length+1;this.morphTexture===null&&(this.morphTexture=new vr(new Float32Array(i*this.count),i,this.count,To,gn));const r=this.morphTexture.source.data.data;let o=0;for(let c=0;c<n.length;c++)o+=n[c];const a=this.geometry.morphTargetsRelative?1:1-o,l=i*e;r[l]=a,r.set(n,l+1)}updateMorphTargets(){}dispose(){this.dispatchEvent({type:"dispose"}),this.morphTexture!==null&&(this.morphTexture.dispose(),this.morphTexture=null)}}const ra=new w,sp=new w,rp=new Ce;class bi{constructor(e=new w(1,0,0),t=0){this.isPlane=!0,this.normal=e,this.constant=t}set(e,t){return this.normal.copy(e),this.constant=t,this}setComponents(e,t,n,i){return this.normal.set(e,t,n),this.constant=i,this}setFromNormalAndCoplanarPoint(e,t){return this.normal.copy(e),this.constant=-t.dot(this.normal),this}setFromCoplanarPoints(e,t,n){const i=ra.subVectors(n,t).cross(sp.subVectors(e,t)).normalize();return this.setFromNormalAndCoplanarPoint(i,e),this}copy(e){return this.normal.copy(e.normal),this.constant=e.constant,this}normalize(){const e=1/this.normal.length();return this.normal.multiplyScalar(e),this.constant*=e,this}negate(){return this.constant*=-1,this.normal.negate(),this}distanceToPoint(e){return this.normal.dot(e)+this.constant}distanceToSphere(e){return this.distanceToPoint(e.center)-e.radius}projectPoint(e,t){return t.copy(e).addScaledVector(this.normal,-this.distanceToPoint(e))}intersectLine(e,t){const n=e.delta(ra),i=this.normal.dot(n);if(i===0)return this.distanceToPoint(e.start)===0?t.copy(e.start):null;const r=-(e.start.dot(this.normal)+this.constant)/i;return r<0||r>1?null:t.copy(e.start).addScaledVector(n,r)}intersectsLine(e){const t=this.distanceToPoint(e.start),n=this.distanceToPoint(e.end);return t<0&&n>0||n<0&&t>0}intersectsBox(e){return e.intersectsPlane(this)}intersectsSphere(e){return e.intersectsPlane(this)}coplanarPoint(e){return e.copy(this.normal).multiplyScalar(-this.constant)}applyMatrix4(e,t){const n=t||rp.getNormalMatrix(e),i=this.coplanarPoint(ra).applyMatrix4(e),r=this.normal.applyMatrix3(n).normalize();return this.constant=-i.dot(r),this}translate(e){return this.constant-=e.dot(this.normal),this}equals(e){return e.normal.equals(this.normal)&&e.constant===this.constant}clone(){return new this.constructor().copy(this)}}const _i=new In,op=new ne(.5,.5),Vr=new w;class Hl{constructor(e=new bi,t=new bi,n=new bi,i=new bi,r=new bi,o=new bi){this.planes=[e,t,n,i,r,o]}set(e,t,n,i,r,o){const a=this.planes;return a[0].copy(e),a[1].copy(t),a[2].copy(n),a[3].copy(i),a[4].copy(r),a[5].copy(o),this}copy(e){const t=this.planes;for(let n=0;n<6;n++)t[n].copy(e.planes[n]);return this}setFromProjectionMatrix(e,t=Cn,n=!1){const i=this.planes,r=e.elements,o=r[0],a=r[1],l=r[2],c=r[3],u=r[4],h=r[5],f=r[6],d=r[7],p=r[8],v=r[9],g=r[10],m=r[11],_=r[12],y=r[13],x=r[14],E=r[15];if(i[0].setComponents(c-o,d-u,m-p,E-_).normalize(),i[1].setComponents(c+o,d+u,m+p,E+_).normalize(),i[2].setComponents(c+a,d+h,m+v,E+y).normalize(),i[3].setComponents(c-a,d-h,m-v,E-y).normalize(),n)i[4].setComponents(l,f,g,x).normalize(),i[5].setComponents(c-l,d-f,m-g,E-x).normalize();else if(i[4].setComponents(c-l,d-f,m-g,E-x).normalize(),t===Cn)i[5].setComponents(c+l,d+f,m+g,E+x).normalize();else if(t===_o)i[5].setComponents(l,f,g,x).normalize();else throw new Error("THREE.Frustum.setFromProjectionMatrix(): Invalid coordinate system: "+t);return this}intersectsObject(e){if(e.boundingSphere!==void 0)e.boundingSphere===null&&e.computeBoundingSphere(),_i.copy(e.boundingSphere).applyMatrix4(e.matrixWorld);else{const t=e.geometry;t.boundingSphere===null&&t.computeBoundingSphere(),_i.copy(t.boundingSphere).applyMatrix4(e.matrixWorld)}return this.intersectsSphere(_i)}intersectsSprite(e){_i.center.set(0,0,0);const t=op.distanceTo(e.center);return _i.radius=.7071067811865476+t,_i.applyMatrix4(e.matrixWorld),this.intersectsSphere(_i)}intersectsSphere(e){const t=this.planes,n=e.center,i=-e.radius;for(let r=0;r<6;r++)if(t[r].distanceToPoint(n)<i)return!1;return!0}intersectsBox(e){const t=this.planes;for(let n=0;n<6;n++){const i=t[n];if(Vr.x=i.normal.x>0?e.max.x:e.min.x,Vr.y=i.normal.y>0?e.max.y:e.min.y,Vr.z=i.normal.z>0?e.max.z:e.min.z,i.distanceToPoint(Vr)<0)return!1}return!0}containsPoint(e){const t=this.planes;for(let n=0;n<6;n++)if(t[n].distanceToPoint(e)<0)return!1;return!0}clone(){return new this.constructor().copy(this)}}class Vl extends xn{constructor(e){super(),this.isLineBasicMaterial=!0,this.type="LineBasicMaterial",this.color=new Ue(16777215),this.map=null,this.linewidth=1,this.linecap="round",this.linejoin="round",this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.linewidth=e.linewidth,this.linecap=e.linecap,this.linejoin=e.linejoin,this.fog=e.fog,this}}const yo=new w,Mo=new w,jc=new Le,Os=new gr,Gr=new In,oa=new w,Zc=new w;class wo extends dt{constructor(e=new Et,t=new Vl){super(),this.isLine=!0,this.type="Line",this.geometry=e,this.material=t,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}computeLineDistances(){const e=this.geometry;if(e.index===null){const t=e.attributes.position,n=[0];for(let i=1,r=t.count;i<r;i++)yo.fromBufferAttribute(t,i-1),Mo.fromBufferAttribute(t,i),n[i]=n[i-1],n[i]+=yo.distanceTo(Mo);e.setAttribute("lineDistance",new it(n,1))}else console.warn("THREE.Line.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}raycast(e,t){const n=this.geometry,i=this.matrixWorld,r=e.params.Line.threshold,o=n.drawRange;if(n.boundingSphere===null&&n.computeBoundingSphere(),Gr.copy(n.boundingSphere),Gr.applyMatrix4(i),Gr.radius+=r,e.ray.intersectsSphere(Gr)===!1)return;jc.copy(i).invert(),Os.copy(e.ray).applyMatrix4(jc);const a=r/((this.scale.x+this.scale.y+this.scale.z)/3),l=a*a,c=this.isLineSegments?2:1,u=n.index,f=n.attributes.position;if(u!==null){const d=Math.max(0,o.start),p=Math.min(u.count,o.start+o.count);for(let v=d,g=p-1;v<g;v+=c){const m=u.getX(v),_=u.getX(v+1),y=Wr(this,e,Os,l,m,_,v);y&&t.push(y)}if(this.isLineLoop){const v=u.getX(p-1),g=u.getX(d),m=Wr(this,e,Os,l,v,g,p-1);m&&t.push(m)}}else{const d=Math.max(0,o.start),p=Math.min(f.count,o.start+o.count);for(let v=d,g=p-1;v<g;v+=c){const m=Wr(this,e,Os,l,v,v+1,v);m&&t.push(m)}if(this.isLineLoop){const v=Wr(this,e,Os,l,p-1,d,p-1);v&&t.push(v)}}}updateMorphTargets(){const t=this.geometry.morphAttributes,n=Object.keys(t);if(n.length>0){const i=t[n[0]];if(i!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,o=i.length;r<o;r++){const a=i[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[a]=r}}}}}function Wr(s,e,t,n,i,r,o){const a=s.geometry.attributes.position;if(yo.fromBufferAttribute(a,i),Mo.fromBufferAttribute(a,r),t.distanceSqToSegment(yo,Mo,oa,Zc)>n)return;oa.applyMatrix4(s.matrixWorld);const c=e.ray.origin.distanceTo(oa);if(!(c<e.near||c>e.far))return{distance:c,point:Zc.clone().applyMatrix4(s.matrixWorld),index:o,face:null,faceIndex:null,barycoord:null,object:s}}const Jc=new w,Qc=new w;class ap extends wo{constructor(e,t){super(e,t),this.isLineSegments=!0,this.type="LineSegments"}computeLineDistances(){const e=this.geometry;if(e.index===null){const t=e.attributes.position,n=[];for(let i=0,r=t.count;i<r;i+=2)Jc.fromBufferAttribute(t,i),Qc.fromBufferAttribute(t,i+1),n[i]=i===0?0:n[i-1],n[i+1]=n[i]+Jc.distanceTo(Qc);e.setAttribute("lineDistance",new it(n,1))}else console.warn("THREE.LineSegments.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}}class lp extends wo{constructor(e,t){super(e,t),this.isLineLoop=!0,this.type="LineLoop"}}class Lh extends xn{constructor(e){super(),this.isPointsMaterial=!0,this.type="PointsMaterial",this.color=new Ue(16777215),this.map=null,this.alphaMap=null,this.size=1,this.sizeAttenuation=!0,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.alphaMap=e.alphaMap,this.size=e.size,this.sizeAttenuation=e.sizeAttenuation,this.fog=e.fog,this}}const eu=new Le,vl=new gr,Xr=new In,qr=new w;class cp extends dt{constructor(e=new Et,t=new Lh){super(),this.isPoints=!0,this.type="Points",this.geometry=e,this.material=t,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}raycast(e,t){const n=this.geometry,i=this.matrixWorld,r=e.params.Points.threshold,o=n.drawRange;if(n.boundingSphere===null&&n.computeBoundingSphere(),Xr.copy(n.boundingSphere),Xr.applyMatrix4(i),Xr.radius+=r,e.ray.intersectsSphere(Xr)===!1)return;eu.copy(i).invert(),vl.copy(e.ray).applyMatrix4(eu);const a=r/((this.scale.x+this.scale.y+this.scale.z)/3),l=a*a,c=n.index,h=n.attributes.position;if(c!==null){const f=Math.max(0,o.start),d=Math.min(c.count,o.start+o.count);for(let p=f,v=d;p<v;p++){const g=c.getX(p);qr.fromBufferAttribute(h,g),tu(qr,g,l,i,e,t,this)}}else{const f=Math.max(0,o.start),d=Math.min(h.count,o.start+o.count);for(let p=f,v=d;p<v;p++)qr.fromBufferAttribute(h,p),tu(qr,p,l,i,e,t,this)}}updateMorphTargets(){const t=this.geometry.morphAttributes,n=Object.keys(t);if(n.length>0){const i=t[n[0]];if(i!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,o=i.length;r<o;r++){const a=i[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[a]=r}}}}}function tu(s,e,t,n,i,r,o){const a=vl.distanceSqToPoint(s);if(a<t){const l=new w;vl.closestPointToPoint(s,l),l.applyMatrix4(n);const c=i.ray.origin.distanceTo(l);if(c<i.near||c>i.far)return;r.push({distance:c,distanceToRay:Math.sqrt(a),point:l,index:e,face:null,faceIndex:null,barycoord:null,object:o})}}class Gl extends At{constructor(e,t,n,i,r,o,a,l,c){super(e,t,n,i,r,o,a,l,c),this.isCanvasTexture=!0,this.needsUpdate=!0}}class Ih extends At{constructor(e,t,n=Li,i,r,o,a=Vt,l=Vt,c,u=rr,h=1){if(u!==rr&&u!==or)throw new Error("DepthTexture format must be either THREE.DepthFormat or THREE.DepthStencilFormat");const f={width:e,height:t,depth:h};super(f,i,r,o,a,l,u,n,c),this.isDepthTexture=!0,this.flipY=!1,this.generateMipmaps=!1,this.compareFunction=null}copy(e){return super.copy(e),this.source=new kl(Object.assign({},e.image)),this.compareFunction=e.compareFunction,this}toJSON(e){const t=super.toJSON(e);return this.compareFunction!==null&&(t.compareFunction=this.compareFunction),t}}class Dh extends At{constructor(e=null){super(),this.sourceTexture=e,this.isExternalTexture=!0}copy(e){return super.copy(e),this.sourceTexture=e.sourceTexture,this}}class Wl extends Et{constructor(e=1,t=1,n=4,i=8,r=1){super(),this.type="CapsuleGeometry",this.parameters={radius:e,height:t,capSegments:n,radialSegments:i,heightSegments:r},t=Math.max(0,t),n=Math.max(1,Math.floor(n)),i=Math.max(3,Math.floor(i)),r=Math.max(1,Math.floor(r));const o=[],a=[],l=[],c=[],u=t/2,h=Math.PI/2*e,f=t,d=2*h+f,p=n*2+r,v=i+1,g=new w,m=new w;for(let _=0;_<=p;_++){let y=0,x=0,E=0,A=0;if(_<=n){const b=_/n,M=b*Math.PI/2;x=-u-e*Math.cos(M),E=e*Math.sin(M),A=-e*Math.cos(M),y=b*h}else if(_<=n+r){const b=(_-n)/r;x=-u+b*t,E=e,A=0,y=h+b*f}else{const b=(_-n-r)/n,M=b*Math.PI/2;x=u+e*Math.sin(M),E=e*Math.cos(M),A=e*Math.sin(M),y=h+f+b*h}const R=Math.max(0,Math.min(1,y/d));let L=0;_===0?L=.5/i:_===p&&(L=-.5/i);for(let b=0;b<=i;b++){const M=b/i,P=M*Math.PI*2,D=Math.sin(P),O=Math.cos(P);m.x=-E*O,m.y=x,m.z=E*D,a.push(m.x,m.y,m.z),g.set(-E*O,A,E*D),g.normalize(),l.push(g.x,g.y,g.z),c.push(M+L,R)}if(_>0){const b=(_-1)*v;for(let M=0;M<i;M++){const P=b+M,D=b+M+1,O=_*v+M,V=_*v+M+1;o.push(P,D,O),o.push(D,V,O)}}}this.setIndex(o),this.setAttribute("position",new it(a,3)),this.setAttribute("normal",new it(l,3)),this.setAttribute("uv",new it(c,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new Wl(e.radius,e.height,e.capSegments,e.radialSegments,e.heightSegments)}}class jn extends Et{constructor(e=1,t=1,n=1,i=32,r=1,o=!1,a=0,l=Math.PI*2){super(),this.type="CylinderGeometry",this.parameters={radiusTop:e,radiusBottom:t,height:n,radialSegments:i,heightSegments:r,openEnded:o,thetaStart:a,thetaLength:l};const c=this;i=Math.floor(i),r=Math.floor(r);const u=[],h=[],f=[],d=[];let p=0;const v=[],g=n/2;let m=0;_(),o===!1&&(e>0&&y(!0),t>0&&y(!1)),this.setIndex(u),this.setAttribute("position",new it(h,3)),this.setAttribute("normal",new it(f,3)),this.setAttribute("uv",new it(d,2));function _(){const x=new w,E=new w;let A=0;const R=(t-e)/n;for(let L=0;L<=r;L++){const b=[],M=L/r,P=M*(t-e)+e;for(let D=0;D<=i;D++){const O=D/i,V=O*l+a,B=Math.sin(V),W=Math.cos(V);E.x=P*B,E.y=-M*n+g,E.z=P*W,h.push(E.x,E.y,E.z),x.set(B,R,W).normalize(),f.push(x.x,x.y,x.z),d.push(O,1-M),b.push(p++)}v.push(b)}for(let L=0;L<i;L++)for(let b=0;b<r;b++){const M=v[b][L],P=v[b+1][L],D=v[b+1][L+1],O=v[b][L+1];(e>0||b!==0)&&(u.push(M,P,O),A+=3),(t>0||b!==r-1)&&(u.push(P,D,O),A+=3)}c.addGroup(m,A,0),m+=A}function y(x){const E=p,A=new ne,R=new w;let L=0;const b=x===!0?e:t,M=x===!0?1:-1;for(let D=1;D<=i;D++)h.push(0,g*M,0),f.push(0,M,0),d.push(.5,.5),p++;const P=p;for(let D=0;D<=i;D++){const V=D/i*l+a,B=Math.cos(V),W=Math.sin(V);R.x=b*W,R.y=g*M,R.z=b*B,h.push(R.x,R.y,R.z),f.push(0,M,0),A.x=B*.5+.5,A.y=W*.5*M+.5,d.push(A.x,A.y),p++}for(let D=0;D<i;D++){const O=E+D,V=P+D;x===!0?u.push(V,V+1,O):u.push(V+1,V,O),L+=3}c.addGroup(m,L,x===!0?1:2),m+=L}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new jn(e.radiusTop,e.radiusBottom,e.height,e.radialSegments,e.heightSegments,e.openEnded,e.thetaStart,e.thetaLength)}}class So extends jn{constructor(e=1,t=1,n=32,i=1,r=!1,o=0,a=Math.PI*2){super(0,e,t,n,i,r,o,a),this.type="ConeGeometry",this.parameters={radius:e,height:t,radialSegments:n,heightSegments:i,openEnded:r,thetaStart:o,thetaLength:a}}static fromJSON(e){return new So(e.radius,e.height,e.radialSegments,e.heightSegments,e.openEnded,e.thetaStart,e.thetaLength)}}class Xl extends Et{constructor(e=[],t=[],n=1,i=0){super(),this.type="PolyhedronGeometry",this.parameters={vertices:e,indices:t,radius:n,detail:i};const r=[],o=[];a(i),c(n),u(),this.setAttribute("position",new it(r,3)),this.setAttribute("normal",new it(r.slice(),3)),this.setAttribute("uv",new it(o,2)),i===0?this.computeVertexNormals():this.normalizeNormals();function a(_){const y=new w,x=new w,E=new w;for(let A=0;A<t.length;A+=3)d(t[A+0],y),d(t[A+1],x),d(t[A+2],E),l(y,x,E,_)}function l(_,y,x,E){const A=E+1,R=[];for(let L=0;L<=A;L++){R[L]=[];const b=_.clone().lerp(x,L/A),M=y.clone().lerp(x,L/A),P=A-L;for(let D=0;D<=P;D++)D===0&&L===A?R[L][D]=b:R[L][D]=b.clone().lerp(M,D/P)}for(let L=0;L<A;L++)for(let b=0;b<2*(A-L)-1;b++){const M=Math.floor(b/2);b%2===0?(f(R[L][M+1]),f(R[L+1][M]),f(R[L][M])):(f(R[L][M+1]),f(R[L+1][M+1]),f(R[L+1][M]))}}function c(_){const y=new w;for(let x=0;x<r.length;x+=3)y.x=r[x+0],y.y=r[x+1],y.z=r[x+2],y.normalize().multiplyScalar(_),r[x+0]=y.x,r[x+1]=y.y,r[x+2]=y.z}function u(){const _=new w;for(let y=0;y<r.length;y+=3){_.x=r[y+0],_.y=r[y+1],_.z=r[y+2];const x=g(_)/2/Math.PI+.5,E=m(_)/Math.PI+.5;o.push(x,1-E)}p(),h()}function h(){for(let _=0;_<o.length;_+=6){const y=o[_+0],x=o[_+2],E=o[_+4],A=Math.max(y,x,E),R=Math.min(y,x,E);A>.9&&R<.1&&(y<.2&&(o[_+0]+=1),x<.2&&(o[_+2]+=1),E<.2&&(o[_+4]+=1))}}function f(_){r.push(_.x,_.y,_.z)}function d(_,y){const x=_*3;y.x=e[x+0],y.y=e[x+1],y.z=e[x+2]}function p(){const _=new w,y=new w,x=new w,E=new w,A=new ne,R=new ne,L=new ne;for(let b=0,M=0;b<r.length;b+=9,M+=6){_.set(r[b+0],r[b+1],r[b+2]),y.set(r[b+3],r[b+4],r[b+5]),x.set(r[b+6],r[b+7],r[b+8]),A.set(o[M+0],o[M+1]),R.set(o[M+2],o[M+3]),L.set(o[M+4],o[M+5]),E.copy(_).add(y).add(x).divideScalar(3);const P=g(E);v(A,M+0,_,P),v(R,M+2,y,P),v(L,M+4,x,P)}}function v(_,y,x,E){E<0&&_.x===1&&(o[y]=_.x-1),x.x===0&&x.z===0&&(o[y]=E/2/Math.PI+.5)}function g(_){return Math.atan2(_.z,-_.x)}function m(_){return Math.atan2(-_.y,Math.sqrt(_.x*_.x+_.z*_.z))}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new Xl(e.vertices,e.indices,e.radius,e.details)}}class Dn{constructor(){this.type="Curve",this.arcLengthDivisions=200,this.needsUpdate=!1,this.cacheArcLengths=null}getPoint(){console.warn("THREE.Curve: .getPoint() not implemented.")}getPointAt(e,t){const n=this.getUtoTmapping(e);return this.getPoint(n,t)}getPoints(e=5){const t=[];for(let n=0;n<=e;n++)t.push(this.getPoint(n/e));return t}getSpacedPoints(e=5){const t=[];for(let n=0;n<=e;n++)t.push(this.getPointAt(n/e));return t}getLength(){const e=this.getLengths();return e[e.length-1]}getLengths(e=this.arcLengthDivisions){if(this.cacheArcLengths&&this.cacheArcLengths.length===e+1&&!this.needsUpdate)return this.cacheArcLengths;this.needsUpdate=!1;const t=[];let n,i=this.getPoint(0),r=0;t.push(0);for(let o=1;o<=e;o++)n=this.getPoint(o/e),r+=n.distanceTo(i),t.push(r),i=n;return this.cacheArcLengths=t,t}updateArcLengths(){this.needsUpdate=!0,this.getLengths()}getUtoTmapping(e,t=null){const n=this.getLengths();let i=0;const r=n.length;let o;t?o=t:o=e*n[r-1];let a=0,l=r-1,c;for(;a<=l;)if(i=Math.floor(a+(l-a)/2),c=n[i]-o,c<0)a=i+1;else if(c>0)l=i-1;else{l=i;break}if(i=l,n[i]===o)return i/(r-1);const u=n[i],f=n[i+1]-u,d=(o-u)/f;return(i+d)/(r-1)}getTangent(e,t){let i=e-1e-4,r=e+1e-4;i<0&&(i=0),r>1&&(r=1);const o=this.getPoint(i),a=this.getPoint(r),l=t||(o.isVector2?new ne:new w);return l.copy(a).sub(o).normalize(),l}getTangentAt(e,t){const n=this.getUtoTmapping(e);return this.getTangent(n,t)}computeFrenetFrames(e,t=!1){const n=new w,i=[],r=[],o=[],a=new w,l=new Le;for(let d=0;d<=e;d++){const p=d/e;i[d]=this.getTangentAt(p,new w)}r[0]=new w,o[0]=new w;let c=Number.MAX_VALUE;const u=Math.abs(i[0].x),h=Math.abs(i[0].y),f=Math.abs(i[0].z);u<=c&&(c=u,n.set(1,0,0)),h<=c&&(c=h,n.set(0,1,0)),f<=c&&n.set(0,0,1),a.crossVectors(i[0],n).normalize(),r[0].crossVectors(i[0],a),o[0].crossVectors(i[0],r[0]);for(let d=1;d<=e;d++){if(r[d]=r[d-1].clone(),o[d]=o[d-1].clone(),a.crossVectors(i[d-1],i[d]),a.length()>Number.EPSILON){a.normalize();const p=Math.acos($e(i[d-1].dot(i[d]),-1,1));r[d].applyMatrix4(l.makeRotationAxis(a,p))}o[d].crossVectors(i[d],r[d])}if(t===!0){let d=Math.acos($e(r[0].dot(r[e]),-1,1));d/=e,i[0].dot(a.crossVectors(r[0],r[e]))>0&&(d=-d);for(let p=1;p<=e;p++)r[p].applyMatrix4(l.makeRotationAxis(i[p],d*p)),o[p].crossVectors(i[p],r[p])}return{tangents:i,normals:r,binormals:o}}clone(){return new this.constructor().copy(this)}copy(e){return this.arcLengthDivisions=e.arcLengthDivisions,this}toJSON(){const e={metadata:{version:4.7,type:"Curve",generator:"Curve.toJSON"}};return e.arcLengthDivisions=this.arcLengthDivisions,e.type=this.type,e}fromJSON(e){return this.arcLengthDivisions=e.arcLengthDivisions,this}}class ql extends Dn{constructor(e=0,t=0,n=1,i=1,r=0,o=Math.PI*2,a=!1,l=0){super(),this.isEllipseCurve=!0,this.type="EllipseCurve",this.aX=e,this.aY=t,this.xRadius=n,this.yRadius=i,this.aStartAngle=r,this.aEndAngle=o,this.aClockwise=a,this.aRotation=l}getPoint(e,t=new ne){const n=t,i=Math.PI*2;let r=this.aEndAngle-this.aStartAngle;const o=Math.abs(r)<Number.EPSILON;for(;r<0;)r+=i;for(;r>i;)r-=i;r<Number.EPSILON&&(o?r=0:r=i),this.aClockwise===!0&&!o&&(r===i?r=-i:r=r-i);const a=this.aStartAngle+e*r;let l=this.aX+this.xRadius*Math.cos(a),c=this.aY+this.yRadius*Math.sin(a);if(this.aRotation!==0){const u=Math.cos(this.aRotation),h=Math.sin(this.aRotation),f=l-this.aX,d=c-this.aY;l=f*u-d*h+this.aX,c=f*h+d*u+this.aY}return n.set(l,c)}copy(e){return super.copy(e),this.aX=e.aX,this.aY=e.aY,this.xRadius=e.xRadius,this.yRadius=e.yRadius,this.aStartAngle=e.aStartAngle,this.aEndAngle=e.aEndAngle,this.aClockwise=e.aClockwise,this.aRotation=e.aRotation,this}toJSON(){const e=super.toJSON();return e.aX=this.aX,e.aY=this.aY,e.xRadius=this.xRadius,e.yRadius=this.yRadius,e.aStartAngle=this.aStartAngle,e.aEndAngle=this.aEndAngle,e.aClockwise=this.aClockwise,e.aRotation=this.aRotation,e}fromJSON(e){return super.fromJSON(e),this.aX=e.aX,this.aY=e.aY,this.xRadius=e.xRadius,this.yRadius=e.yRadius,this.aStartAngle=e.aStartAngle,this.aEndAngle=e.aEndAngle,this.aClockwise=e.aClockwise,this.aRotation=e.aRotation,this}}class up extends ql{constructor(e,t,n,i,r,o){super(e,t,n,n,i,r,o),this.isArcCurve=!0,this.type="ArcCurve"}}function Kl(){let s=0,e=0,t=0,n=0;function i(r,o,a,l){s=r,e=a,t=-3*r+3*o-2*a-l,n=2*r-2*o+a+l}return{initCatmullRom:function(r,o,a,l,c){i(o,a,c*(a-r),c*(l-o))},initNonuniformCatmullRom:function(r,o,a,l,c,u,h){let f=(o-r)/c-(a-r)/(c+u)+(a-o)/u,d=(a-o)/u-(l-o)/(u+h)+(l-a)/h;f*=u,d*=u,i(o,a,f,d)},calc:function(r){const o=r*r,a=o*r;return s+e*r+t*o+n*a}}}const Kr=new w,aa=new Kl,la=new Kl,ca=new Kl;class Nh extends Dn{constructor(e=[],t=!1,n="centripetal",i=.5){super(),this.isCatmullRomCurve3=!0,this.type="CatmullRomCurve3",this.points=e,this.closed=t,this.curveType=n,this.tension=i}getPoint(e,t=new w){const n=t,i=this.points,r=i.length,o=(r-(this.closed?0:1))*e;let a=Math.floor(o),l=o-a;this.closed?a+=a>0?0:(Math.floor(Math.abs(a)/r)+1)*r:l===0&&a===r-1&&(a=r-2,l=1);let c,u;this.closed||a>0?c=i[(a-1)%r]:(Kr.subVectors(i[0],i[1]).add(i[0]),c=Kr);const h=i[a%r],f=i[(a+1)%r];if(this.closed||a+2<r?u=i[(a+2)%r]:(Kr.subVectors(i[r-1],i[r-2]).add(i[r-1]),u=Kr),this.curveType==="centripetal"||this.curveType==="chordal"){const d=this.curveType==="chordal"?.5:.25;let p=Math.pow(c.distanceToSquared(h),d),v=Math.pow(h.distanceToSquared(f),d),g=Math.pow(f.distanceToSquared(u),d);v<1e-4&&(v=1),p<1e-4&&(p=v),g<1e-4&&(g=v),aa.initNonuniformCatmullRom(c.x,h.x,f.x,u.x,p,v,g),la.initNonuniformCatmullRom(c.y,h.y,f.y,u.y,p,v,g),ca.initNonuniformCatmullRom(c.z,h.z,f.z,u.z,p,v,g)}else this.curveType==="catmullrom"&&(aa.initCatmullRom(c.x,h.x,f.x,u.x,this.tension),la.initCatmullRom(c.y,h.y,f.y,u.y,this.tension),ca.initCatmullRom(c.z,h.z,f.z,u.z,this.tension));return n.set(aa.calc(l),la.calc(l),ca.calc(l)),n}copy(e){super.copy(e),this.points=[];for(let t=0,n=e.points.length;t<n;t++){const i=e.points[t];this.points.push(i.clone())}return this.closed=e.closed,this.curveType=e.curveType,this.tension=e.tension,this}toJSON(){const e=super.toJSON();e.points=[];for(let t=0,n=this.points.length;t<n;t++){const i=this.points[t];e.points.push(i.toArray())}return e.closed=this.closed,e.curveType=this.curveType,e.tension=this.tension,e}fromJSON(e){super.fromJSON(e),this.points=[];for(let t=0,n=e.points.length;t<n;t++){const i=e.points[t];this.points.push(new w().fromArray(i))}return this.closed=e.closed,this.curveType=e.curveType,this.tension=e.tension,this}}function nu(s,e,t,n,i){const r=(n-e)*.5,o=(i-t)*.5,a=s*s,l=s*a;return(2*t-2*n+r+o)*l+(-3*t+3*n-2*r-o)*a+r*s+t}function hp(s,e){const t=1-s;return t*t*e}function fp(s,e){return 2*(1-s)*s*e}function dp(s,e){return s*s*e}function js(s,e,t,n){return hp(s,e)+fp(s,t)+dp(s,n)}function pp(s,e){const t=1-s;return t*t*t*e}function mp(s,e){const t=1-s;return 3*t*t*s*e}function gp(s,e){return 3*(1-s)*s*s*e}function vp(s,e){return s*s*s*e}function Zs(s,e,t,n,i){return pp(s,e)+mp(s,t)+gp(s,n)+vp(s,i)}class Uh extends Dn{constructor(e=new ne,t=new ne,n=new ne,i=new ne){super(),this.isCubicBezierCurve=!0,this.type="CubicBezierCurve",this.v0=e,this.v1=t,this.v2=n,this.v3=i}getPoint(e,t=new ne){const n=t,i=this.v0,r=this.v1,o=this.v2,a=this.v3;return n.set(Zs(e,i.x,r.x,o.x,a.x),Zs(e,i.y,r.y,o.y,a.y)),n}copy(e){return super.copy(e),this.v0.copy(e.v0),this.v1.copy(e.v1),this.v2.copy(e.v2),this.v3.copy(e.v3),this}toJSON(){const e=super.toJSON();return e.v0=this.v0.toArray(),e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e.v3=this.v3.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v0.fromArray(e.v0),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this.v3.fromArray(e.v3),this}}class xp extends Dn{constructor(e=new w,t=new w,n=new w,i=new w){super(),this.isCubicBezierCurve3=!0,this.type="CubicBezierCurve3",this.v0=e,this.v1=t,this.v2=n,this.v3=i}getPoint(e,t=new w){const n=t,i=this.v0,r=this.v1,o=this.v2,a=this.v3;return n.set(Zs(e,i.x,r.x,o.x,a.x),Zs(e,i.y,r.y,o.y,a.y),Zs(e,i.z,r.z,o.z,a.z)),n}copy(e){return super.copy(e),this.v0.copy(e.v0),this.v1.copy(e.v1),this.v2.copy(e.v2),this.v3.copy(e.v3),this}toJSON(){const e=super.toJSON();return e.v0=this.v0.toArray(),e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e.v3=this.v3.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v0.fromArray(e.v0),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this.v3.fromArray(e.v3),this}}class Fh extends Dn{constructor(e=new ne,t=new ne){super(),this.isLineCurve=!0,this.type="LineCurve",this.v1=e,this.v2=t}getPoint(e,t=new ne){const n=t;return e===1?n.copy(this.v2):(n.copy(this.v2).sub(this.v1),n.multiplyScalar(e).add(this.v1)),n}getPointAt(e,t){return this.getPoint(e,t)}getTangent(e,t=new ne){return t.subVectors(this.v2,this.v1).normalize()}getTangentAt(e,t){return this.getTangent(e,t)}copy(e){return super.copy(e),this.v1.copy(e.v1),this.v2.copy(e.v2),this}toJSON(){const e=super.toJSON();return e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this}}class _p extends Dn{constructor(e=new w,t=new w){super(),this.isLineCurve3=!0,this.type="LineCurve3",this.v1=e,this.v2=t}getPoint(e,t=new w){const n=t;return e===1?n.copy(this.v2):(n.copy(this.v2).sub(this.v1),n.multiplyScalar(e).add(this.v1)),n}getPointAt(e,t){return this.getPoint(e,t)}getTangent(e,t=new w){return t.subVectors(this.v2,this.v1).normalize()}getTangentAt(e,t){return this.getTangent(e,t)}copy(e){return super.copy(e),this.v1.copy(e.v1),this.v2.copy(e.v2),this}toJSON(){const e=super.toJSON();return e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this}}class Oh extends Dn{constructor(e=new ne,t=new ne,n=new ne){super(),this.isQuadraticBezierCurve=!0,this.type="QuadraticBezierCurve",this.v0=e,this.v1=t,this.v2=n}getPoint(e,t=new ne){const n=t,i=this.v0,r=this.v1,o=this.v2;return n.set(js(e,i.x,r.x,o.x),js(e,i.y,r.y,o.y)),n}copy(e){return super.copy(e),this.v0.copy(e.v0),this.v1.copy(e.v1),this.v2.copy(e.v2),this}toJSON(){const e=super.toJSON();return e.v0=this.v0.toArray(),e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v0.fromArray(e.v0),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this}}class yp extends Dn{constructor(e=new w,t=new w,n=new w){super(),this.isQuadraticBezierCurve3=!0,this.type="QuadraticBezierCurve3",this.v0=e,this.v1=t,this.v2=n}getPoint(e,t=new w){const n=t,i=this.v0,r=this.v1,o=this.v2;return n.set(js(e,i.x,r.x,o.x),js(e,i.y,r.y,o.y),js(e,i.z,r.z,o.z)),n}copy(e){return super.copy(e),this.v0.copy(e.v0),this.v1.copy(e.v1),this.v2.copy(e.v2),this}toJSON(){const e=super.toJSON();return e.v0=this.v0.toArray(),e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v0.fromArray(e.v0),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this}}class kh extends Dn{constructor(e=[]){super(),this.isSplineCurve=!0,this.type="SplineCurve",this.points=e}getPoint(e,t=new ne){const n=t,i=this.points,r=(i.length-1)*e,o=Math.floor(r),a=r-o,l=i[o===0?o:o-1],c=i[o],u=i[o>i.length-2?i.length-1:o+1],h=i[o>i.length-3?i.length-1:o+2];return n.set(nu(a,l.x,c.x,u.x,h.x),nu(a,l.y,c.y,u.y,h.y)),n}copy(e){super.copy(e),this.points=[];for(let t=0,n=e.points.length;t<n;t++){const i=e.points[t];this.points.push(i.clone())}return this}toJSON(){const e=super.toJSON();e.points=[];for(let t=0,n=this.points.length;t<n;t++){const i=this.points[t];e.points.push(i.toArray())}return e}fromJSON(e){super.fromJSON(e),this.points=[];for(let t=0,n=e.points.length;t<n;t++){const i=e.points[t];this.points.push(new ne().fromArray(i))}return this}}var xl=Object.freeze({__proto__:null,ArcCurve:up,CatmullRomCurve3:Nh,CubicBezierCurve:Uh,CubicBezierCurve3:xp,EllipseCurve:ql,LineCurve:Fh,LineCurve3:_p,QuadraticBezierCurve:Oh,QuadraticBezierCurve3:yp,SplineCurve:kh});class Mp extends Dn{constructor(){super(),this.type="CurvePath",this.curves=[],this.autoClose=!1}add(e){this.curves.push(e)}closePath(){const e=this.curves[0].getPoint(0),t=this.curves[this.curves.length-1].getPoint(1);if(!e.equals(t)){const n=e.isVector2===!0?"LineCurve":"LineCurve3";this.curves.push(new xl[n](t,e))}return this}getPoint(e,t){const n=e*this.getLength(),i=this.getCurveLengths();let r=0;for(;r<i.length;){if(i[r]>=n){const o=i[r]-n,a=this.curves[r],l=a.getLength(),c=l===0?0:1-o/l;return a.getPointAt(c,t)}r++}return null}getLength(){const e=this.getCurveLengths();return e[e.length-1]}updateArcLengths(){this.needsUpdate=!0,this.cacheLengths=null,this.getCurveLengths()}getCurveLengths(){if(this.cacheLengths&&this.cacheLengths.length===this.curves.length)return this.cacheLengths;const e=[];let t=0;for(let n=0,i=this.curves.length;n<i;n++)t+=this.curves[n].getLength(),e.push(t);return this.cacheLengths=e,e}getSpacedPoints(e=40){const t=[];for(let n=0;n<=e;n++)t.push(this.getPoint(n/e));return this.autoClose&&t.push(t[0]),t}getPoints(e=12){const t=[];let n;for(let i=0,r=this.curves;i<r.length;i++){const o=r[i],a=o.isEllipseCurve?e*2:o.isLineCurve||o.isLineCurve3?1:o.isSplineCurve?e*o.points.length:e,l=o.getPoints(a);for(let c=0;c<l.length;c++){const u=l[c];n&&n.equals(u)||(t.push(u),n=u)}}return this.autoClose&&t.length>1&&!t[t.length-1].equals(t[0])&&t.push(t[0]),t}copy(e){super.copy(e),this.curves=[];for(let t=0,n=e.curves.length;t<n;t++){const i=e.curves[t];this.curves.push(i.clone())}return this.autoClose=e.autoClose,this}toJSON(){const e=super.toJSON();e.autoClose=this.autoClose,e.curves=[];for(let t=0,n=this.curves.length;t<n;t++){const i=this.curves[t];e.curves.push(i.toJSON())}return e}fromJSON(e){super.fromJSON(e),this.autoClose=e.autoClose,this.curves=[];for(let t=0,n=e.curves.length;t<n;t++){const i=e.curves[t];this.curves.push(new xl[i.type]().fromJSON(i))}return this}}class iu extends Mp{constructor(e){super(),this.type="Path",this.currentPoint=new ne,e&&this.setFromPoints(e)}setFromPoints(e){this.moveTo(e[0].x,e[0].y);for(let t=1,n=e.length;t<n;t++)this.lineTo(e[t].x,e[t].y);return this}moveTo(e,t){return this.currentPoint.set(e,t),this}lineTo(e,t){const n=new Fh(this.currentPoint.clone(),new ne(e,t));return this.curves.push(n),this.currentPoint.set(e,t),this}quadraticCurveTo(e,t,n,i){const r=new Oh(this.currentPoint.clone(),new ne(e,t),new ne(n,i));return this.curves.push(r),this.currentPoint.set(n,i),this}bezierCurveTo(e,t,n,i,r,o){const a=new Uh(this.currentPoint.clone(),new ne(e,t),new ne(n,i),new ne(r,o));return this.curves.push(a),this.currentPoint.set(r,o),this}splineThru(e){const t=[this.currentPoint.clone()].concat(e),n=new kh(t);return this.curves.push(n),this.currentPoint.copy(e[e.length-1]),this}arc(e,t,n,i,r,o){const a=this.currentPoint.x,l=this.currentPoint.y;return this.absarc(e+a,t+l,n,i,r,o),this}absarc(e,t,n,i,r,o){return this.absellipse(e,t,n,n,i,r,o),this}ellipse(e,t,n,i,r,o,a,l){const c=this.currentPoint.x,u=this.currentPoint.y;return this.absellipse(e+c,t+u,n,i,r,o,a,l),this}absellipse(e,t,n,i,r,o,a,l){const c=new ql(e,t,n,i,r,o,a,l);if(this.curves.length>0){const h=c.getPoint(0);h.equals(this.currentPoint)||this.lineTo(h.x,h.y)}this.curves.push(c);const u=c.getPoint(1);return this.currentPoint.copy(u),this}copy(e){return super.copy(e),this.currentPoint.copy(e.currentPoint),this}toJSON(){const e=super.toJSON();return e.currentPoint=this.currentPoint.toArray(),e}fromJSON(e){return super.fromJSON(e),this.currentPoint.fromArray(e.currentPoint),this}}class fo extends iu{constructor(e){super(e),this.uuid=hn(),this.type="Shape",this.holes=[]}getPointsHoles(e){const t=[];for(let n=0,i=this.holes.length;n<i;n++)t[n]=this.holes[n].getPoints(e);return t}extractPoints(e){return{shape:this.getPoints(e),holes:this.getPointsHoles(e)}}copy(e){super.copy(e),this.holes=[];for(let t=0,n=e.holes.length;t<n;t++){const i=e.holes[t];this.holes.push(i.clone())}return this}toJSON(){const e=super.toJSON();e.uuid=this.uuid,e.holes=[];for(let t=0,n=this.holes.length;t<n;t++){const i=this.holes[t];e.holes.push(i.toJSON())}return e}fromJSON(e){super.fromJSON(e),this.uuid=e.uuid,this.holes=[];for(let t=0,n=e.holes.length;t<n;t++){const i=e.holes[t];this.holes.push(new iu().fromJSON(i))}return this}}function Sp(s,e,t=2){const n=e&&e.length,i=n?e[0]*t:s.length;let r=Bh(s,0,i,t,!0);const o=[];if(!r||r.next===r.prev)return o;let a,l,c;if(n&&(r=Ap(s,e,r,t)),s.length>80*t){a=1/0,l=1/0;let u=-1/0,h=-1/0;for(let f=t;f<i;f+=t){const d=s[f],p=s[f+1];d<a&&(a=d),p<l&&(l=p),d>u&&(u=d),p>h&&(h=p)}c=Math.max(u-a,h-l),c=c!==0?32767/c:0}return fr(r,o,t,a,l,c,0),o}function Bh(s,e,t,n,i){let r;if(i===kp(s,e,t,n)>0)for(let o=e;o<t;o+=n)r=su(o/n|0,s[o],s[o+1],r);else for(let o=t-n;o>=e;o-=n)r=su(o/n|0,s[o],s[o+1],r);return r&&ms(r,r.next)&&(pr(r),r=r.next),r}function Di(s,e){if(!s)return s;e||(e=s);let t=s,n;do if(n=!1,!t.steiner&&(ms(t,t.next)||xt(t.prev,t,t.next)===0)){if(pr(t),t=e=t.prev,t===t.next)break;n=!0}else t=t.next;while(n||t!==e);return e}function fr(s,e,t,n,i,r,o){if(!s)return;!o&&r&&Ip(s,n,i,r);let a=s;for(;s.prev!==s.next;){const l=s.prev,c=s.next;if(r?Tp(s,n,i,r):bp(s)){e.push(l.i,s.i,c.i),pr(s),s=c.next,a=c.next;continue}if(s=c,s===a){o?o===1?(s=Ep(Di(s),e),fr(s,e,t,n,i,r,2)):o===2&&wp(s,e,t,n,i,r):fr(Di(s),e,t,n,i,r,1);break}}}function bp(s){const e=s.prev,t=s,n=s.next;if(xt(e,t,n)>=0)return!1;const i=e.x,r=t.x,o=n.x,a=e.y,l=t.y,c=n.y,u=Math.min(i,r,o),h=Math.min(a,l,c),f=Math.max(i,r,o),d=Math.max(a,l,c);let p=n.next;for(;p!==e;){if(p.x>=u&&p.x<=f&&p.y>=h&&p.y<=d&&qs(i,a,r,l,o,c,p.x,p.y)&&xt(p.prev,p,p.next)>=0)return!1;p=p.next}return!0}function Tp(s,e,t,n){const i=s.prev,r=s,o=s.next;if(xt(i,r,o)>=0)return!1;const a=i.x,l=r.x,c=o.x,u=i.y,h=r.y,f=o.y,d=Math.min(a,l,c),p=Math.min(u,h,f),v=Math.max(a,l,c),g=Math.max(u,h,f),m=_l(d,p,e,t,n),_=_l(v,g,e,t,n);let y=s.prevZ,x=s.nextZ;for(;y&&y.z>=m&&x&&x.z<=_;){if(y.x>=d&&y.x<=v&&y.y>=p&&y.y<=g&&y!==i&&y!==o&&qs(a,u,l,h,c,f,y.x,y.y)&&xt(y.prev,y,y.next)>=0||(y=y.prevZ,x.x>=d&&x.x<=v&&x.y>=p&&x.y<=g&&x!==i&&x!==o&&qs(a,u,l,h,c,f,x.x,x.y)&&xt(x.prev,x,x.next)>=0))return!1;x=x.nextZ}for(;y&&y.z>=m;){if(y.x>=d&&y.x<=v&&y.y>=p&&y.y<=g&&y!==i&&y!==o&&qs(a,u,l,h,c,f,y.x,y.y)&&xt(y.prev,y,y.next)>=0)return!1;y=y.prevZ}for(;x&&x.z<=_;){if(x.x>=d&&x.x<=v&&x.y>=p&&x.y<=g&&x!==i&&x!==o&&qs(a,u,l,h,c,f,x.x,x.y)&&xt(x.prev,x,x.next)>=0)return!1;x=x.nextZ}return!0}function Ep(s,e){let t=s;do{const n=t.prev,i=t.next.next;!ms(n,i)&&Hh(n,t,t.next,i)&&dr(n,i)&&dr(i,n)&&(e.push(n.i,t.i,i.i),pr(t),pr(t.next),t=s=i),t=t.next}while(t!==s);return Di(t)}function wp(s,e,t,n,i,r){let o=s;do{let a=o.next.next;for(;a!==o.prev;){if(o.i!==a.i&&Up(o,a)){let l=Vh(o,a);o=Di(o,o.next),l=Di(l,l.next),fr(o,e,t,n,i,r,0),fr(l,e,t,n,i,r,0);return}a=a.next}o=o.next}while(o!==s)}function Ap(s,e,t,n){const i=[];for(let r=0,o=e.length;r<o;r++){const a=e[r]*n,l=r<o-1?e[r+1]*n:s.length,c=Bh(s,a,l,n,!1);c===c.next&&(c.steiner=!0),i.push(Np(c))}i.sort(Rp);for(let r=0;r<i.length;r++)t=Cp(i[r],t);return t}function Rp(s,e){let t=s.x-e.x;if(t===0&&(t=s.y-e.y,t===0)){const n=(s.next.y-s.y)/(s.next.x-s.x),i=(e.next.y-e.y)/(e.next.x-e.x);t=n-i}return t}function Cp(s,e){const t=Pp(s,e);if(!t)return e;const n=Vh(t,s);return Di(n,n.next),Di(t,t.next)}function Pp(s,e){let t=e;const n=s.x,i=s.y;let r=-1/0,o;if(ms(s,t))return t;do{if(ms(s,t.next))return t.next;if(i<=t.y&&i>=t.next.y&&t.next.y!==t.y){const h=t.x+(i-t.y)*(t.next.x-t.x)/(t.next.y-t.y);if(h<=n&&h>r&&(r=h,o=t.x<t.next.x?t:t.next,h===n))return o}t=t.next}while(t!==e);if(!o)return null;const a=o,l=o.x,c=o.y;let u=1/0;t=o;do{if(n>=t.x&&t.x>=l&&n!==t.x&&zh(i<c?n:r,i,l,c,i<c?r:n,i,t.x,t.y)){const h=Math.abs(i-t.y)/(n-t.x);dr(t,s)&&(h<u||h===u&&(t.x>o.x||t.x===o.x&&Lp(o,t)))&&(o=t,u=h)}t=t.next}while(t!==a);return o}function Lp(s,e){return xt(s.prev,s,e.prev)<0&&xt(e.next,s,s.next)<0}function Ip(s,e,t,n){let i=s;do i.z===0&&(i.z=_l(i.x,i.y,e,t,n)),i.prevZ=i.prev,i.nextZ=i.next,i=i.next;while(i!==s);i.prevZ.nextZ=null,i.prevZ=null,Dp(i)}function Dp(s){let e,t=1;do{let n=s,i;s=null;let r=null;for(e=0;n;){e++;let o=n,a=0;for(let c=0;c<t&&(a++,o=o.nextZ,!!o);c++);let l=t;for(;a>0||l>0&&o;)a!==0&&(l===0||!o||n.z<=o.z)?(i=n,n=n.nextZ,a--):(i=o,o=o.nextZ,l--),r?r.nextZ=i:s=i,i.prevZ=r,r=i;n=o}r.nextZ=null,t*=2}while(e>1);return s}function _l(s,e,t,n,i){return s=(s-t)*i|0,e=(e-n)*i|0,s=(s|s<<8)&16711935,s=(s|s<<4)&252645135,s=(s|s<<2)&858993459,s=(s|s<<1)&1431655765,e=(e|e<<8)&16711935,e=(e|e<<4)&252645135,e=(e|e<<2)&858993459,e=(e|e<<1)&1431655765,s|e<<1}function Np(s){let e=s,t=s;do(e.x<t.x||e.x===t.x&&e.y<t.y)&&(t=e),e=e.next;while(e!==s);return t}function zh(s,e,t,n,i,r,o,a){return(i-o)*(e-a)>=(s-o)*(r-a)&&(s-o)*(n-a)>=(t-o)*(e-a)&&(t-o)*(r-a)>=(i-o)*(n-a)}function qs(s,e,t,n,i,r,o,a){return!(s===o&&e===a)&&zh(s,e,t,n,i,r,o,a)}function Up(s,e){return s.next.i!==e.i&&s.prev.i!==e.i&&!Fp(s,e)&&(dr(s,e)&&dr(e,s)&&Op(s,e)&&(xt(s.prev,s,e.prev)||xt(s,e.prev,e))||ms(s,e)&&xt(s.prev,s,s.next)>0&&xt(e.prev,e,e.next)>0)}function xt(s,e,t){return(e.y-s.y)*(t.x-e.x)-(e.x-s.x)*(t.y-e.y)}function ms(s,e){return s.x===e.x&&s.y===e.y}function Hh(s,e,t,n){const i=Yr(xt(s,e,t)),r=Yr(xt(s,e,n)),o=Yr(xt(t,n,s)),a=Yr(xt(t,n,e));return!!(i!==r&&o!==a||i===0&&$r(s,t,e)||r===0&&$r(s,n,e)||o===0&&$r(t,s,n)||a===0&&$r(t,e,n))}function $r(s,e,t){return e.x<=Math.max(s.x,t.x)&&e.x>=Math.min(s.x,t.x)&&e.y<=Math.max(s.y,t.y)&&e.y>=Math.min(s.y,t.y)}function Yr(s){return s>0?1:s<0?-1:0}function Fp(s,e){let t=s;do{if(t.i!==s.i&&t.next.i!==s.i&&t.i!==e.i&&t.next.i!==e.i&&Hh(t,t.next,s,e))return!0;t=t.next}while(t!==s);return!1}function dr(s,e){return xt(s.prev,s,s.next)<0?xt(s,e,s.next)>=0&&xt(s,s.prev,e)>=0:xt(s,e,s.prev)<0||xt(s,s.next,e)<0}function Op(s,e){let t=s,n=!1;const i=(s.x+e.x)/2,r=(s.y+e.y)/2;do t.y>r!=t.next.y>r&&t.next.y!==t.y&&i<(t.next.x-t.x)*(r-t.y)/(t.next.y-t.y)+t.x&&(n=!n),t=t.next;while(t!==s);return n}function Vh(s,e){const t=yl(s.i,s.x,s.y),n=yl(e.i,e.x,e.y),i=s.next,r=e.prev;return s.next=e,e.prev=s,t.next=i,i.prev=t,n.next=t,t.prev=n,r.next=n,n.prev=r,n}function su(s,e,t,n){const i=yl(s,e,t);return n?(i.next=n.next,i.prev=n,n.next.prev=i,n.next=i):(i.prev=i,i.next=i),i}function pr(s){s.next.prev=s.prev,s.prev.next=s.next,s.prevZ&&(s.prevZ.nextZ=s.nextZ),s.nextZ&&(s.nextZ.prevZ=s.prevZ)}function yl(s,e,t){return{i:s,x:e,y:t,prev:null,next:null,z:0,prevZ:null,nextZ:null,steiner:!1}}function kp(s,e,t,n){let i=0;for(let r=e,o=t-n;r<t;r+=n)i+=(s[o]-s[r])*(s[r+1]+s[o+1]),o=r;return i}class Bp{static triangulate(e,t,n=2){return Sp(e,t,n)}}class is{static area(e){const t=e.length;let n=0;for(let i=t-1,r=0;r<t;i=r++)n+=e[i].x*e[r].y-e[r].x*e[i].y;return n*.5}static isClockWise(e){return is.area(e)<0}static triangulateShape(e,t){const n=[],i=[],r=[];ru(e),ou(n,e);let o=e.length;t.forEach(ru);for(let l=0;l<t.length;l++)i.push(o),o+=t[l].length,ou(n,t[l]);const a=Bp.triangulate(n,i);for(let l=0;l<a.length;l+=3)r.push(a.slice(l,l+3));return r}}function ru(s){const e=s.length;e>2&&s[e-1].equals(s[0])&&s.pop()}function ou(s,e){for(let t=0;t<e.length;t++)s.push(e[t].x),s.push(e[t].y)}class Js extends Et{constructor(e=new fo([new ne(.5,.5),new ne(-.5,.5),new ne(-.5,-.5),new ne(.5,-.5)]),t={}){super(),this.type="ExtrudeGeometry",this.parameters={shapes:e,options:t},e=Array.isArray(e)?e:[e];const n=this,i=[],r=[];for(let a=0,l=e.length;a<l;a++){const c=e[a];o(c)}this.setAttribute("position",new it(i,3)),this.setAttribute("uv",new it(r,2)),this.computeVertexNormals();function o(a){const l=[],c=t.curveSegments!==void 0?t.curveSegments:12,u=t.steps!==void 0?t.steps:1,h=t.depth!==void 0?t.depth:1;let f=t.bevelEnabled!==void 0?t.bevelEnabled:!0,d=t.bevelThickness!==void 0?t.bevelThickness:.2,p=t.bevelSize!==void 0?t.bevelSize:d-.1,v=t.bevelOffset!==void 0?t.bevelOffset:0,g=t.bevelSegments!==void 0?t.bevelSegments:3;const m=t.extrudePath,_=t.UVGenerator!==void 0?t.UVGenerator:zp;let y,x=!1,E,A,R,L;m&&(y=m.getSpacedPoints(u),x=!0,f=!1,E=m.computeFrenetFrames(u,!1),A=new w,R=new w,L=new w),f||(g=0,d=0,p=0,v=0);const b=a.extractPoints(c);let M=b.shape;const P=b.holes;if(!is.isClockWise(M)){M=M.reverse();for(let te=0,Z=P.length;te<Z;te++){const j=P[te];is.isClockWise(j)&&(P[te]=j.reverse())}}function O(te){const j=10000000000000001e-36;let Y=te[0];for(let ue=1;ue<=te.length;ue++){const ie=ue%te.length,he=te[ie],Ve=he.x-Y.x,Be=he.y-Y.y,C=Ve*Ve+Be*Be,S=Math.max(Math.abs(he.x),Math.abs(he.y),Math.abs(Y.x),Math.abs(Y.y)),k=j*S*S;if(C<=k){te.splice(ie,1),ue--;continue}Y=he}}O(M),P.forEach(O);const V=P.length,B=M;for(let te=0;te<V;te++){const Z=P[te];M=M.concat(Z)}function W(te,Z,j){return Z||console.error("THREE.ExtrudeGeometry: vec does not exist"),te.clone().addScaledVector(Z,j)}const K=M.length;function G(te,Z,j){let Y,ue,ie;const he=te.x-Z.x,Ve=te.y-Z.y,Be=j.x-te.x,C=j.y-te.y,S=he*he+Ve*Ve,k=he*C-Ve*Be;if(Math.abs(k)>Number.EPSILON){const X=Math.sqrt(S),ee=Math.sqrt(Be*Be+C*C),q=Z.x-Ve/X,Re=Z.y+he/X,ce=j.x-C/ee,Ee=j.y+Be/ee,we=((ce-q)*C-(Ee-Re)*Be)/(he*C-Ve*Be);Y=q+he*we-te.x,ue=Re+Ve*we-te.y;const se=Y*Y+ue*ue;if(se<=2)return new ne(Y,ue);ie=Math.sqrt(se/2)}else{let X=!1;he>Number.EPSILON?Be>Number.EPSILON&&(X=!0):he<-Number.EPSILON?Be<-Number.EPSILON&&(X=!0):Math.sign(Ve)===Math.sign(C)&&(X=!0),X?(Y=-Ve,ue=he,ie=Math.sqrt(S)):(Y=he,ue=Ve,ie=Math.sqrt(S/2))}return new ne(Y/ie,ue/ie)}const le=[];for(let te=0,Z=B.length,j=Z-1,Y=te+1;te<Z;te++,j++,Y++)j===Z&&(j=0),Y===Z&&(Y=0),le[te]=G(B[te],B[j],B[Y]);const de=[];let pe,Ne=le.concat();for(let te=0,Z=V;te<Z;te++){const j=P[te];pe=[];for(let Y=0,ue=j.length,ie=ue-1,he=Y+1;Y<ue;Y++,ie++,he++)ie===ue&&(ie=0),he===ue&&(he=0),pe[Y]=G(j[Y],j[ie],j[he]);de.push(pe),Ne=Ne.concat(pe)}let Xe;if(g===0)Xe=is.triangulateShape(B,P);else{const te=[],Z=[];for(let j=0;j<g;j++){const Y=j/g,ue=d*Math.cos(Y*Math.PI/2),ie=p*Math.sin(Y*Math.PI/2)+v;for(let he=0,Ve=B.length;he<Ve;he++){const Be=W(B[he],le[he],ie);be(Be.x,Be.y,-ue),Y===0&&te.push(Be)}for(let he=0,Ve=V;he<Ve;he++){const Be=P[he];pe=de[he];const C=[];for(let S=0,k=Be.length;S<k;S++){const X=W(Be[S],pe[S],ie);be(X.x,X.y,-ue),Y===0&&C.push(X)}Y===0&&Z.push(C)}}Xe=is.triangulateShape(te,Z)}const qe=Xe.length,je=p+v;for(let te=0;te<K;te++){const Z=f?W(M[te],Ne[te],je):M[te];x?(R.copy(E.normals[0]).multiplyScalar(Z.x),A.copy(E.binormals[0]).multiplyScalar(Z.y),L.copy(y[0]).add(R).add(A),be(L.x,L.y,L.z)):be(Z.x,Z.y,0)}for(let te=1;te<=u;te++)for(let Z=0;Z<K;Z++){const j=f?W(M[Z],Ne[Z],je):M[Z];x?(R.copy(E.normals[te]).multiplyScalar(j.x),A.copy(E.binormals[te]).multiplyScalar(j.y),L.copy(y[te]).add(R).add(A),be(L.x,L.y,L.z)):be(j.x,j.y,h/u*te)}for(let te=g-1;te>=0;te--){const Z=te/g,j=d*Math.cos(Z*Math.PI/2),Y=p*Math.sin(Z*Math.PI/2)+v;for(let ue=0,ie=B.length;ue<ie;ue++){const he=W(B[ue],le[ue],Y);be(he.x,he.y,h+j)}for(let ue=0,ie=P.length;ue<ie;ue++){const he=P[ue];pe=de[ue];for(let Ve=0,Be=he.length;Ve<Be;Ve++){const C=W(he[Ve],pe[Ve],Y);x?be(C.x,C.y+y[u-1].y,y[u-1].x+j):be(C.x,C.y,h+j)}}}$(),Q();function $(){const te=i.length/3;if(f){let Z=0,j=K*Z;for(let Y=0;Y<qe;Y++){const ue=Xe[Y];ye(ue[2]+j,ue[1]+j,ue[0]+j)}Z=u+g*2,j=K*Z;for(let Y=0;Y<qe;Y++){const ue=Xe[Y];ye(ue[0]+j,ue[1]+j,ue[2]+j)}}else{for(let Z=0;Z<qe;Z++){const j=Xe[Z];ye(j[2],j[1],j[0])}for(let Z=0;Z<qe;Z++){const j=Xe[Z];ye(j[0]+K*u,j[1]+K*u,j[2]+K*u)}}n.addGroup(te,i.length/3-te,0)}function Q(){const te=i.length/3;let Z=0;me(B,Z),Z+=B.length;for(let j=0,Y=P.length;j<Y;j++){const ue=P[j];me(ue,Z),Z+=ue.length}n.addGroup(te,i.length/3-te,1)}function me(te,Z){let j=te.length;for(;--j>=0;){const Y=j;let ue=j-1;ue<0&&(ue=te.length-1);for(let ie=0,he=u+g*2;ie<he;ie++){const Ve=K*ie,Be=K*(ie+1),C=Z+Y+Ve,S=Z+ue+Ve,k=Z+ue+Be,X=Z+Y+Be;ze(C,S,k,X)}}}function be(te,Z,j){l.push(te),l.push(Z),l.push(j)}function ye(te,Z,j){at(te),at(Z),at(j);const Y=i.length/3,ue=_.generateTopUV(n,i,Y-3,Y-2,Y-1);I(ue[0]),I(ue[1]),I(ue[2])}function ze(te,Z,j,Y){at(te),at(Z),at(Y),at(Z),at(j),at(Y);const ue=i.length/3,ie=_.generateSideWallUV(n,i,ue-6,ue-3,ue-2,ue-1);I(ie[0]),I(ie[1]),I(ie[3]),I(ie[1]),I(ie[2]),I(ie[3])}function at(te){i.push(l[te*3+0]),i.push(l[te*3+1]),i.push(l[te*3+2])}function I(te){r.push(te.x),r.push(te.y)}}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}toJSON(){const e=super.toJSON(),t=this.parameters.shapes,n=this.parameters.options;return Hp(t,n,e)}static fromJSON(e,t){const n=[];for(let r=0,o=e.shapes.length;r<o;r++){const a=t[e.shapes[r]];n.push(a)}const i=e.options.extrudePath;return i!==void 0&&(e.options.extrudePath=new xl[i.type]().fromJSON(i)),new Js(n,e.options)}}const zp={generateTopUV:function(s,e,t,n,i){const r=e[t*3],o=e[t*3+1],a=e[n*3],l=e[n*3+1],c=e[i*3],u=e[i*3+1];return[new ne(r,o),new ne(a,l),new ne(c,u)]},generateSideWallUV:function(s,e,t,n,i,r){const o=e[t*3],a=e[t*3+1],l=e[t*3+2],c=e[n*3],u=e[n*3+1],h=e[n*3+2],f=e[i*3],d=e[i*3+1],p=e[i*3+2],v=e[r*3],g=e[r*3+1],m=e[r*3+2];return Math.abs(a-u)<Math.abs(o-c)?[new ne(o,1-l),new ne(c,1-h),new ne(f,1-p),new ne(v,1-m)]:[new ne(a,1-l),new ne(u,1-h),new ne(d,1-p),new ne(g,1-m)]}};function Hp(s,e,t){if(t.shapes=[],Array.isArray(s))for(let n=0,i=s.length;n<i;n++){const r=s[n];t.shapes.push(r.uuid)}else t.shapes.push(s.uuid);return t.options=Object.assign({},e),e.extrudePath!==void 0&&(t.options.extrudePath=e.extrudePath.toJSON()),t}class $l extends Xl{constructor(e=1,t=0){const n=(1+Math.sqrt(5))/2,i=[-1,n,0,1,n,0,-1,-n,0,1,-n,0,0,-1,n,0,1,n,0,-1,-n,0,1,-n,n,0,-1,n,0,1,-n,0,-1,-n,0,1],r=[0,11,5,0,5,1,0,1,7,0,7,10,0,10,11,1,5,9,5,11,4,11,10,2,10,7,6,7,1,8,3,9,4,3,4,2,3,2,6,3,6,8,3,8,9,4,9,5,2,4,11,6,2,10,8,6,7,9,8,1];super(i,r,e,t),this.type="IcosahedronGeometry",this.parameters={radius:e,detail:t}}static fromJSON(e){return new $l(e.radius,e.detail)}}class Zn extends Et{constructor(e=1,t=1,n=1,i=1){super(),this.type="PlaneGeometry",this.parameters={width:e,height:t,widthSegments:n,heightSegments:i};const r=e/2,o=t/2,a=Math.floor(n),l=Math.floor(i),c=a+1,u=l+1,h=e/a,f=t/l,d=[],p=[],v=[],g=[];for(let m=0;m<u;m++){const _=m*f-o;for(let y=0;y<c;y++){const x=y*h-r;p.push(x,-_,0),v.push(0,0,1),g.push(y/a),g.push(1-m/l)}}for(let m=0;m<l;m++)for(let _=0;_<a;_++){const y=_+c*m,x=_+c*(m+1),E=_+1+c*(m+1),A=_+1+c*m;d.push(y,x,A),d.push(x,E,A)}this.setIndex(d),this.setAttribute("position",new it(p,3)),this.setAttribute("normal",new it(v,3)),this.setAttribute("uv",new it(g,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new Zn(e.width,e.height,e.widthSegments,e.heightSegments)}}class Yl extends Et{constructor(e=.5,t=1,n=32,i=1,r=0,o=Math.PI*2){super(),this.type="RingGeometry",this.parameters={innerRadius:e,outerRadius:t,thetaSegments:n,phiSegments:i,thetaStart:r,thetaLength:o},n=Math.max(3,n),i=Math.max(1,i);const a=[],l=[],c=[],u=[];let h=e;const f=(t-e)/i,d=new w,p=new ne;for(let v=0;v<=i;v++){for(let g=0;g<=n;g++){const m=r+g/n*o;d.x=h*Math.cos(m),d.y=h*Math.sin(m),l.push(d.x,d.y,d.z),c.push(0,0,1),p.x=(d.x/t+1)/2,p.y=(d.y/t+1)/2,u.push(p.x,p.y)}h+=f}for(let v=0;v<i;v++){const g=v*(n+1);for(let m=0;m<n;m++){const _=m+g,y=_,x=_+n+1,E=_+n+2,A=_+1;a.push(y,x,A),a.push(x,E,A)}}this.setIndex(a),this.setAttribute("position",new it(l,3)),this.setAttribute("normal",new it(c,3)),this.setAttribute("uv",new it(u,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new Yl(e.innerRadius,e.outerRadius,e.thetaSegments,e.phiSegments,e.thetaStart,e.thetaLength)}}class di extends Et{constructor(e=1,t=32,n=16,i=0,r=Math.PI*2,o=0,a=Math.PI){super(),this.type="SphereGeometry",this.parameters={radius:e,widthSegments:t,heightSegments:n,phiStart:i,phiLength:r,thetaStart:o,thetaLength:a},t=Math.max(3,Math.floor(t)),n=Math.max(2,Math.floor(n));const l=Math.min(o+a,Math.PI);let c=0;const u=[],h=new w,f=new w,d=[],p=[],v=[],g=[];for(let m=0;m<=n;m++){const _=[],y=m/n;let x=0;m===0&&o===0?x=.5/t:m===n&&l===Math.PI&&(x=-.5/t);for(let E=0;E<=t;E++){const A=E/t;h.x=-e*Math.cos(i+A*r)*Math.sin(o+y*a),h.y=e*Math.cos(o+y*a),h.z=e*Math.sin(i+A*r)*Math.sin(o+y*a),p.push(h.x,h.y,h.z),f.copy(h).normalize(),v.push(f.x,f.y,f.z),g.push(A+x,1-y),_.push(c++)}u.push(_)}for(let m=0;m<n;m++)for(let _=0;_<t;_++){const y=u[m][_+1],x=u[m][_],E=u[m+1][_],A=u[m+1][_+1];(m!==0||o>0)&&d.push(y,x,A),(m!==n-1||l<Math.PI)&&d.push(x,E,A)}this.setIndex(d),this.setAttribute("position",new it(p,3)),this.setAttribute("normal",new it(v,3)),this.setAttribute("uv",new it(g,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new di(e.radius,e.widthSegments,e.heightSegments,e.phiStart,e.phiLength,e.thetaStart,e.thetaLength)}}class jl extends Et{constructor(e=1,t=.4,n=12,i=48,r=Math.PI*2){super(),this.type="TorusGeometry",this.parameters={radius:e,tube:t,radialSegments:n,tubularSegments:i,arc:r},n=Math.floor(n),i=Math.floor(i);const o=[],a=[],l=[],c=[],u=new w,h=new w,f=new w;for(let d=0;d<=n;d++)for(let p=0;p<=i;p++){const v=p/i*r,g=d/n*Math.PI*2;h.x=(e+t*Math.cos(g))*Math.cos(v),h.y=(e+t*Math.cos(g))*Math.sin(v),h.z=t*Math.sin(g),a.push(h.x,h.y,h.z),u.x=e*Math.cos(v),u.y=e*Math.sin(v),f.subVectors(h,u).normalize(),l.push(f.x,f.y,f.z),c.push(p/i),c.push(d/n)}for(let d=1;d<=n;d++)for(let p=1;p<=i;p++){const v=(i+1)*d+p-1,g=(i+1)*(d-1)+p-1,m=(i+1)*(d-1)+p,_=(i+1)*d+p;o.push(v,g,_),o.push(g,m,_)}this.setIndex(o),this.setAttribute("position",new it(a,3)),this.setAttribute("normal",new it(l,3)),this.setAttribute("uv",new it(c,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new jl(e.radius,e.tube,e.radialSegments,e.tubularSegments,e.arc)}}class Zl extends xn{constructor(e){super(),this.isMeshStandardMaterial=!0,this.type="MeshStandardMaterial",this.defines={STANDARD:""},this.color=new Ue(16777215),this.roughness=1,this.metalness=0,this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new Ue(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=vh,this.normalScale=new ne(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.roughnessMap=null,this.metalnessMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new Xt,this.envMapIntensity=1,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.flatShading=!1,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.defines={STANDARD:""},this.color.copy(e.color),this.roughness=e.roughness,this.metalness=e.metalness,this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.emissive.copy(e.emissive),this.emissiveMap=e.emissiveMap,this.emissiveIntensity=e.emissiveIntensity,this.bumpMap=e.bumpMap,this.bumpScale=e.bumpScale,this.normalMap=e.normalMap,this.normalMapType=e.normalMapType,this.normalScale.copy(e.normalScale),this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.roughnessMap=e.roughnessMap,this.metalnessMap=e.metalnessMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.envMapIntensity=e.envMapIntensity,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.flatShading=e.flatShading,this.fog=e.fog,this}}class Nn extends Zl{constructor(e){super(),this.isMeshPhysicalMaterial=!0,this.defines={STANDARD:"",PHYSICAL:""},this.type="MeshPhysicalMaterial",this.anisotropyRotation=0,this.anisotropyMap=null,this.clearcoatMap=null,this.clearcoatRoughness=0,this.clearcoatRoughnessMap=null,this.clearcoatNormalScale=new ne(1,1),this.clearcoatNormalMap=null,this.ior=1.5,Object.defineProperty(this,"reflectivity",{get:function(){return $e(2.5*(this.ior-1)/(this.ior+1),0,1)},set:function(t){this.ior=(1+.4*t)/(1-.4*t)}}),this.iridescenceMap=null,this.iridescenceIOR=1.3,this.iridescenceThicknessRange=[100,400],this.iridescenceThicknessMap=null,this.sheenColor=new Ue(0),this.sheenColorMap=null,this.sheenRoughness=1,this.sheenRoughnessMap=null,this.transmissionMap=null,this.thickness=0,this.thicknessMap=null,this.attenuationDistance=1/0,this.attenuationColor=new Ue(1,1,1),this.specularIntensity=1,this.specularIntensityMap=null,this.specularColor=new Ue(1,1,1),this.specularColorMap=null,this._anisotropy=0,this._clearcoat=0,this._dispersion=0,this._iridescence=0,this._sheen=0,this._transmission=0,this.setValues(e)}get anisotropy(){return this._anisotropy}set anisotropy(e){this._anisotropy>0!=e>0&&this.version++,this._anisotropy=e}get clearcoat(){return this._clearcoat}set clearcoat(e){this._clearcoat>0!=e>0&&this.version++,this._clearcoat=e}get iridescence(){return this._iridescence}set iridescence(e){this._iridescence>0!=e>0&&this.version++,this._iridescence=e}get dispersion(){return this._dispersion}set dispersion(e){this._dispersion>0!=e>0&&this.version++,this._dispersion=e}get sheen(){return this._sheen}set sheen(e){this._sheen>0!=e>0&&this.version++,this._sheen=e}get transmission(){return this._transmission}set transmission(e){this._transmission>0!=e>0&&this.version++,this._transmission=e}copy(e){return super.copy(e),this.defines={STANDARD:"",PHYSICAL:""},this.anisotropy=e.anisotropy,this.anisotropyRotation=e.anisotropyRotation,this.anisotropyMap=e.anisotropyMap,this.clearcoat=e.clearcoat,this.clearcoatMap=e.clearcoatMap,this.clearcoatRoughness=e.clearcoatRoughness,this.clearcoatRoughnessMap=e.clearcoatRoughnessMap,this.clearcoatNormalMap=e.clearcoatNormalMap,this.clearcoatNormalScale.copy(e.clearcoatNormalScale),this.dispersion=e.dispersion,this.ior=e.ior,this.iridescence=e.iridescence,this.iridescenceMap=e.iridescenceMap,this.iridescenceIOR=e.iridescenceIOR,this.iridescenceThicknessRange=[...e.iridescenceThicknessRange],this.iridescenceThicknessMap=e.iridescenceThicknessMap,this.sheen=e.sheen,this.sheenColor.copy(e.sheenColor),this.sheenColorMap=e.sheenColorMap,this.sheenRoughness=e.sheenRoughness,this.sheenRoughnessMap=e.sheenRoughnessMap,this.transmission=e.transmission,this.transmissionMap=e.transmissionMap,this.thickness=e.thickness,this.thicknessMap=e.thicknessMap,this.attenuationDistance=e.attenuationDistance,this.attenuationColor.copy(e.attenuationColor),this.specularIntensity=e.specularIntensity,this.specularIntensityMap=e.specularIntensityMap,this.specularColor.copy(e.specularColor),this.specularColorMap=e.specularColorMap,this}}class Vp extends xn{constructor(e){super(),this.isMeshDepthMaterial=!0,this.type="MeshDepthMaterial",this.depthPacking=Jf,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.setValues(e)}copy(e){return super.copy(e),this.depthPacking=e.depthPacking,this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this}}class Gp extends xn{constructor(e){super(),this.isMeshDistanceMaterial=!0,this.type="MeshDistanceMaterial",this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.setValues(e)}copy(e){return super.copy(e),this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this}}function jr(s,e){return!s||s.constructor===e?s:typeof e.BYTES_PER_ELEMENT=="number"?new e(s):Array.prototype.slice.call(s)}function Wp(s){return ArrayBuffer.isView(s)&&!(s instanceof DataView)}function Xp(s){function e(i,r){return s[i]-s[r]}const t=s.length,n=new Array(t);for(let i=0;i!==t;++i)n[i]=i;return n.sort(e),n}function au(s,e,t){const n=s.length,i=new s.constructor(n);for(let r=0,o=0;o!==n;++r){const a=t[r]*e;for(let l=0;l!==e;++l)i[o++]=s[a+l]}return i}function Gh(s,e,t,n){let i=1,r=s[0];for(;r!==void 0&&r[n]===void 0;)r=s[i++];if(r===void 0)return;let o=r[n];if(o!==void 0)if(Array.isArray(o))do o=r[n],o!==void 0&&(e.push(r.time),t.push(...o)),r=s[i++];while(r!==void 0);else if(o.toArray!==void 0)do o=r[n],o!==void 0&&(e.push(r.time),o.toArray(t,t.length)),r=s[i++];while(r!==void 0);else do o=r[n],o!==void 0&&(e.push(r.time),t.push(o)),r=s[i++];while(r!==void 0)}class xr{constructor(e,t,n,i){this.parameterPositions=e,this._cachedIndex=0,this.resultBuffer=i!==void 0?i:new t.constructor(n),this.sampleValues=t,this.valueSize=n,this.settings=null,this.DefaultSettings_={}}evaluate(e){const t=this.parameterPositions;let n=this._cachedIndex,i=t[n],r=t[n-1];n:{e:{let o;t:{i:if(!(e<i)){for(let a=n+2;;){if(i===void 0){if(e<r)break i;return n=t.length,this._cachedIndex=n,this.copySampleValue_(n-1)}if(n===a)break;if(r=i,i=t[++n],e<i)break e}o=t.length;break t}if(!(e>=r)){const a=t[1];e<a&&(n=2,r=a);for(let l=n-2;;){if(r===void 0)return this._cachedIndex=0,this.copySampleValue_(0);if(n===l)break;if(i=r,r=t[--n-1],e>=r)break e}o=n,n=0;break t}break n}for(;n<o;){const a=n+o>>>1;e<t[a]?o=a:n=a+1}if(i=t[n],r=t[n-1],r===void 0)return this._cachedIndex=0,this.copySampleValue_(0);if(i===void 0)return n=t.length,this._cachedIndex=n,this.copySampleValue_(n-1)}this._cachedIndex=n,this.intervalChanged_(n,r,i)}return this.interpolate_(n,r,e,i)}getSettings_(){return this.settings||this.DefaultSettings_}copySampleValue_(e){const t=this.resultBuffer,n=this.sampleValues,i=this.valueSize,r=e*i;for(let o=0;o!==i;++o)t[o]=n[r+o];return t}interpolate_(){throw new Error("call to abstract method")}intervalChanged_(){}}class qp extends xr{constructor(e,t,n,i){super(e,t,n,i),this._weightPrev=-0,this._offsetPrev=-0,this._weightNext=-0,this._offsetNext=-0,this.DefaultSettings_={endingStart:xc,endingEnd:xc}}intervalChanged_(e,t,n){const i=this.parameterPositions;let r=e-2,o=e+1,a=i[r],l=i[o];if(a===void 0)switch(this.getSettings_().endingStart){case _c:r=e,a=2*t-n;break;case yc:r=i.length-2,a=t+i[r]-i[r+1];break;default:r=e,a=n}if(l===void 0)switch(this.getSettings_().endingEnd){case _c:o=e,l=2*n-t;break;case yc:o=1,l=n+i[1]-i[0];break;default:o=e-1,l=t}const c=(n-t)*.5,u=this.valueSize;this._weightPrev=c/(t-a),this._weightNext=c/(l-n),this._offsetPrev=r*u,this._offsetNext=o*u}interpolate_(e,t,n,i){const r=this.resultBuffer,o=this.sampleValues,a=this.valueSize,l=e*a,c=l-a,u=this._offsetPrev,h=this._offsetNext,f=this._weightPrev,d=this._weightNext,p=(n-t)/(i-t),v=p*p,g=v*p,m=-f*g+2*f*v-f*p,_=(1+f)*g+(-1.5-2*f)*v+(-.5+f)*p+1,y=(-1-d)*g+(1.5+d)*v+.5*p,x=d*g-d*v;for(let E=0;E!==a;++E)r[E]=m*o[u+E]+_*o[c+E]+y*o[l+E]+x*o[h+E];return r}}class Kp extends xr{constructor(e,t,n,i){super(e,t,n,i)}interpolate_(e,t,n,i){const r=this.resultBuffer,o=this.sampleValues,a=this.valueSize,l=e*a,c=l-a,u=(n-t)/(i-t),h=1-u;for(let f=0;f!==a;++f)r[f]=o[c+f]*h+o[l+f]*u;return r}}class $p extends xr{constructor(e,t,n,i){super(e,t,n,i)}interpolate_(e){return this.copySampleValue_(e-1)}}class Mn{constructor(e,t,n,i){if(e===void 0)throw new Error("THREE.KeyframeTrack: track name is undefined");if(t===void 0||t.length===0)throw new Error("THREE.KeyframeTrack: no keyframes in track named "+e);this.name=e,this.times=jr(t,this.TimeBufferType),this.values=jr(n,this.ValueBufferType),this.setInterpolation(i||this.DefaultInterpolation)}static toJSON(e){const t=e.constructor;let n;if(t.toJSON!==this.toJSON)n=t.toJSON(e);else{n={name:e.name,times:jr(e.times,Array),values:jr(e.values,Array)};const i=e.getInterpolation();i!==e.DefaultInterpolation&&(n.interpolation=i)}return n.type=e.ValueTypeName,n}InterpolantFactoryMethodDiscrete(e){return new $p(this.times,this.values,this.getValueSize(),e)}InterpolantFactoryMethodLinear(e){return new Kp(this.times,this.values,this.getValueSize(),e)}InterpolantFactoryMethodSmooth(e){return new qp(this.times,this.values,this.getValueSize(),e)}setInterpolation(e){let t;switch(e){case ar:t=this.InterpolantFactoryMethodDiscrete;break;case lr:t=this.InterpolantFactoryMethodLinear;break;case No:t=this.InterpolantFactoryMethodSmooth;break}if(t===void 0){const n="unsupported interpolation for "+this.ValueTypeName+" keyframe track named "+this.name;if(this.createInterpolant===void 0)if(e!==this.DefaultInterpolation)this.setInterpolation(this.DefaultInterpolation);else throw new Error(n);return console.warn("THREE.KeyframeTrack:",n),this}return this.createInterpolant=t,this}getInterpolation(){switch(this.createInterpolant){case this.InterpolantFactoryMethodDiscrete:return ar;case this.InterpolantFactoryMethodLinear:return lr;case this.InterpolantFactoryMethodSmooth:return No}}getValueSize(){return this.values.length/this.times.length}shift(e){if(e!==0){const t=this.times;for(let n=0,i=t.length;n!==i;++n)t[n]+=e}return this}scale(e){if(e!==1){const t=this.times;for(let n=0,i=t.length;n!==i;++n)t[n]*=e}return this}trim(e,t){const n=this.times,i=n.length;let r=0,o=i-1;for(;r!==i&&n[r]<e;)++r;for(;o!==-1&&n[o]>t;)--o;if(++o,r!==0||o!==i){r>=o&&(o=Math.max(o,1),r=o-1);const a=this.getValueSize();this.times=n.slice(r,o),this.values=this.values.slice(r*a,o*a)}return this}validate(){let e=!0;const t=this.getValueSize();t-Math.floor(t)!==0&&(console.error("THREE.KeyframeTrack: Invalid value size in track.",this),e=!1);const n=this.times,i=this.values,r=n.length;r===0&&(console.error("THREE.KeyframeTrack: Track is empty.",this),e=!1);let o=null;for(let a=0;a!==r;a++){const l=n[a];if(typeof l=="number"&&isNaN(l)){console.error("THREE.KeyframeTrack: Time is not a valid number.",this,a,l),e=!1;break}if(o!==null&&o>l){console.error("THREE.KeyframeTrack: Out of order keys.",this,a,l,o),e=!1;break}o=l}if(i!==void 0&&Wp(i))for(let a=0,l=i.length;a!==l;++a){const c=i[a];if(isNaN(c)){console.error("THREE.KeyframeTrack: Value is not a valid number.",this,a,c),e=!1;break}}return e}optimize(){const e=this.times.slice(),t=this.values.slice(),n=this.getValueSize(),i=this.getInterpolation()===No,r=e.length-1;let o=1;for(let a=1;a<r;++a){let l=!1;const c=e[a],u=e[a+1];if(c!==u&&(a!==1||c!==e[0]))if(i)l=!0;else{const h=a*n,f=h-n,d=h+n;for(let p=0;p!==n;++p){const v=t[h+p];if(v!==t[f+p]||v!==t[d+p]){l=!0;break}}}if(l){if(a!==o){e[o]=e[a];const h=a*n,f=o*n;for(let d=0;d!==n;++d)t[f+d]=t[h+d]}++o}}if(r>0){e[o]=e[r];for(let a=r*n,l=o*n,c=0;c!==n;++c)t[l+c]=t[a+c];++o}return o!==e.length?(this.times=e.slice(0,o),this.values=t.slice(0,o*n)):(this.times=e,this.values=t),this}clone(){const e=this.times.slice(),t=this.values.slice(),n=this.constructor,i=new n(this.name,e,t);return i.createInterpolant=this.createInterpolant,i}}Mn.prototype.ValueTypeName="";Mn.prototype.TimeBufferType=Float32Array;Mn.prototype.ValueBufferType=Float32Array;Mn.prototype.DefaultInterpolation=lr;class Ss extends Mn{constructor(e,t,n){super(e,t,n)}}Ss.prototype.ValueTypeName="bool";Ss.prototype.ValueBufferType=Array;Ss.prototype.DefaultInterpolation=ar;Ss.prototype.InterpolantFactoryMethodLinear=void 0;Ss.prototype.InterpolantFactoryMethodSmooth=void 0;class Wh extends Mn{constructor(e,t,n,i){super(e,t,n,i)}}Wh.prototype.ValueTypeName="color";class gs extends Mn{constructor(e,t,n,i){super(e,t,n,i)}}gs.prototype.ValueTypeName="number";class Yp extends xr{constructor(e,t,n,i){super(e,t,n,i)}interpolate_(e,t,n,i){const r=this.resultBuffer,o=this.sampleValues,a=this.valueSize,l=(n-t)/(i-t);let c=e*a;for(let u=c+a;c!==u;c+=4)Yt.slerpFlat(r,0,o,c-a,o,c,l);return r}}class vs extends Mn{constructor(e,t,n,i){super(e,t,n,i)}InterpolantFactoryMethodLinear(e){return new Yp(this.times,this.values,this.getValueSize(),e)}}vs.prototype.ValueTypeName="quaternion";vs.prototype.InterpolantFactoryMethodSmooth=void 0;class bs extends Mn{constructor(e,t,n){super(e,t,n)}}bs.prototype.ValueTypeName="string";bs.prototype.ValueBufferType=Array;bs.prototype.DefaultInterpolation=ar;bs.prototype.InterpolantFactoryMethodLinear=void 0;bs.prototype.InterpolantFactoryMethodSmooth=void 0;class xs extends Mn{constructor(e,t,n,i){super(e,t,n,i)}}xs.prototype.ValueTypeName="vector";class jp{constructor(e="",t=-1,n=[],i=jf){this.name=e,this.tracks=n,this.duration=t,this.blendMode=i,this.uuid=hn(),this.userData={},this.duration<0&&this.resetDuration()}static parse(e){const t=[],n=e.tracks,i=1/(e.fps||1);for(let o=0,a=n.length;o!==a;++o)t.push(Jp(n[o]).scale(i));const r=new this(e.name,e.duration,t,e.blendMode);return r.uuid=e.uuid,r.userData=JSON.parse(e.userData||"{}"),r}static toJSON(e){const t=[],n=e.tracks,i={name:e.name,duration:e.duration,tracks:t,uuid:e.uuid,blendMode:e.blendMode,userData:JSON.stringify(e.userData)};for(let r=0,o=n.length;r!==o;++r)t.push(Mn.toJSON(n[r]));return i}static CreateFromMorphTargetSequence(e,t,n,i){const r=t.length,o=[];for(let a=0;a<r;a++){let l=[],c=[];l.push((a+r-1)%r,a,(a+1)%r),c.push(0,1,0);const u=Xp(l);l=au(l,1,u),c=au(c,1,u),!i&&l[0]===0&&(l.push(r),c.push(c[0])),o.push(new gs(".morphTargetInfluences["+t[a].name+"]",l,c).scale(1/n))}return new this(e,-1,o)}static findByName(e,t){let n=e;if(!Array.isArray(e)){const i=e;n=i.geometry&&i.geometry.animations||i.animations}for(let i=0;i<n.length;i++)if(n[i].name===t)return n[i];return null}static CreateClipsFromMorphTargetSequences(e,t,n){const i={},r=/^([\w-]*?)([\d]+)$/;for(let a=0,l=e.length;a<l;a++){const c=e[a],u=c.name.match(r);if(u&&u.length>1){const h=u[1];let f=i[h];f||(i[h]=f=[]),f.push(c)}}const o=[];for(const a in i)o.push(this.CreateFromMorphTargetSequence(a,i[a],t,n));return o}static parseAnimation(e,t){if(console.warn("THREE.AnimationClip: parseAnimation() is deprecated and will be removed with r185"),!e)return console.error("THREE.AnimationClip: No animation in JSONLoader data."),null;const n=function(h,f,d,p,v){if(d.length!==0){const g=[],m=[];Gh(d,g,m,p),g.length!==0&&v.push(new h(f,g,m))}},i=[],r=e.name||"default",o=e.fps||30,a=e.blendMode;let l=e.length||-1;const c=e.hierarchy||[];for(let h=0;h<c.length;h++){const f=c[h].keys;if(!(!f||f.length===0))if(f[0].morphTargets){const d={};let p;for(p=0;p<f.length;p++)if(f[p].morphTargets)for(let v=0;v<f[p].morphTargets.length;v++)d[f[p].morphTargets[v]]=-1;for(const v in d){const g=[],m=[];for(let _=0;_!==f[p].morphTargets.length;++_){const y=f[p];g.push(y.time),m.push(y.morphTarget===v?1:0)}i.push(new gs(".morphTargetInfluence["+v+"]",g,m))}l=d.length*o}else{const d=".bones["+t[h].name+"]";n(xs,d+".position",f,"pos",i),n(vs,d+".quaternion",f,"rot",i),n(xs,d+".scale",f,"scl",i)}}return i.length===0?null:new this(r,l,i,a)}resetDuration(){const e=this.tracks;let t=0;for(let n=0,i=e.length;n!==i;++n){const r=this.tracks[n];t=Math.max(t,r.times[r.times.length-1])}return this.duration=t,this}trim(){for(let e=0;e<this.tracks.length;e++)this.tracks[e].trim(0,this.duration);return this}validate(){let e=!0;for(let t=0;t<this.tracks.length;t++)e=e&&this.tracks[t].validate();return e}optimize(){for(let e=0;e<this.tracks.length;e++)this.tracks[e].optimize();return this}clone(){const e=[];for(let n=0;n<this.tracks.length;n++)e.push(this.tracks[n].clone());const t=new this.constructor(this.name,this.duration,e,this.blendMode);return t.userData=JSON.parse(JSON.stringify(this.userData)),t}toJSON(){return this.constructor.toJSON(this)}}function Zp(s){switch(s.toLowerCase()){case"scalar":case"double":case"float":case"number":case"integer":return gs;case"vector":case"vector2":case"vector3":case"vector4":return xs;case"color":return Wh;case"quaternion":return vs;case"bool":case"boolean":return Ss;case"string":return bs}throw new Error("THREE.KeyframeTrack: Unsupported typeName: "+s)}function Jp(s){if(s.type===void 0)throw new Error("THREE.KeyframeTrack: track type undefined, can not parse");const e=Zp(s.type);if(s.times===void 0){const t=[],n=[];Gh(s.keys,t,n,"value"),s.times=t,s.values=n}return e.parse!==void 0?e.parse(s):new e(s.name,s.times,s.values,s.interpolation)}const Kn={enabled:!1,files:{},add:function(s,e){this.enabled!==!1&&(this.files[s]=e)},get:function(s){if(this.enabled!==!1)return this.files[s]},remove:function(s){delete this.files[s]},clear:function(){this.files={}}};class Qp{constructor(e,t,n){const i=this;let r=!1,o=0,a=0,l;const c=[];this.onStart=void 0,this.onLoad=e,this.onProgress=t,this.onError=n,this.abortController=new AbortController,this.itemStart=function(u){a++,r===!1&&i.onStart!==void 0&&i.onStart(u,o,a),r=!0},this.itemEnd=function(u){o++,i.onProgress!==void 0&&i.onProgress(u,o,a),o===a&&(r=!1,i.onLoad!==void 0&&i.onLoad())},this.itemError=function(u){i.onError!==void 0&&i.onError(u)},this.resolveURL=function(u){return l?l(u):u},this.setURLModifier=function(u){return l=u,this},this.addHandler=function(u,h){return c.push(u,h),this},this.removeHandler=function(u){const h=c.indexOf(u);return h!==-1&&c.splice(h,2),this},this.getHandler=function(u){for(let h=0,f=c.length;h<f;h+=2){const d=c[h],p=c[h+1];if(d.global&&(d.lastIndex=0),d.test(u))return p}return null},this.abort=function(){return this.abortController.abort(),this.abortController=new AbortController,this}}}const em=new Qp;class Ts{constructor(e){this.manager=e!==void 0?e:em,this.crossOrigin="anonymous",this.withCredentials=!1,this.path="",this.resourcePath="",this.requestHeader={}}load(){}loadAsync(e,t){const n=this;return new Promise(function(i,r){n.load(e,i,t,r)})}parse(){}setCrossOrigin(e){return this.crossOrigin=e,this}setWithCredentials(e){return this.withCredentials=e,this}setPath(e){return this.path=e,this}setResourcePath(e){return this.resourcePath=e,this}setRequestHeader(e){return this.requestHeader=e,this}abort(){return this}}Ts.DEFAULT_MATERIAL_NAME="__DEFAULT";const Hn={};class tm extends Error{constructor(e,t){super(e),this.response=t}}class Xh extends Ts{constructor(e){super(e),this.mimeType="",this.responseType="",this._abortController=new AbortController}load(e,t,n,i){e===void 0&&(e=""),this.path!==void 0&&(e=this.path+e),e=this.manager.resolveURL(e);const r=Kn.get(`file:${e}`);if(r!==void 0)return this.manager.itemStart(e),setTimeout(()=>{t&&t(r),this.manager.itemEnd(e)},0),r;if(Hn[e]!==void 0){Hn[e].push({onLoad:t,onProgress:n,onError:i});return}Hn[e]=[],Hn[e].push({onLoad:t,onProgress:n,onError:i});const o=new Request(e,{headers:new Headers(this.requestHeader),credentials:this.withCredentials?"include":"same-origin",signal:typeof AbortSignal.any=="function"?AbortSignal.any([this._abortController.signal,this.manager.abortController.signal]):this._abortController.signal}),a=this.mimeType,l=this.responseType;fetch(o).then(c=>{if(c.status===200||c.status===0){if(c.status===0&&console.warn("THREE.FileLoader: HTTP Status 0 received."),typeof ReadableStream>"u"||c.body===void 0||c.body.getReader===void 0)return c;const u=Hn[e],h=c.body.getReader(),f=c.headers.get("X-File-Size")||c.headers.get("Content-Length"),d=f?parseInt(f):0,p=d!==0;let v=0;const g=new ReadableStream({start(m){_();function _(){h.read().then(({done:y,value:x})=>{if(y)m.close();else{v+=x.byteLength;const E=new ProgressEvent("progress",{lengthComputable:p,loaded:v,total:d});for(let A=0,R=u.length;A<R;A++){const L=u[A];L.onProgress&&L.onProgress(E)}m.enqueue(x),_()}},y=>{m.error(y)})}}});return new Response(g)}else throw new tm(`fetch for "${c.url}" responded with ${c.status}: ${c.statusText}`,c)}).then(c=>{switch(l){case"arraybuffer":return c.arrayBuffer();case"blob":return c.blob();case"document":return c.text().then(u=>new DOMParser().parseFromString(u,a));case"json":return c.json();default:if(a==="")return c.text();{const h=/charset="?([^;"\s]*)"?/i.exec(a),f=h&&h[1]?h[1].toLowerCase():void 0,d=new TextDecoder(f);return c.arrayBuffer().then(p=>d.decode(p))}}}).then(c=>{Kn.add(`file:${e}`,c);const u=Hn[e];delete Hn[e];for(let h=0,f=u.length;h<f;h++){const d=u[h];d.onLoad&&d.onLoad(c)}}).catch(c=>{const u=Hn[e];if(u===void 0)throw this.manager.itemError(e),c;delete Hn[e];for(let h=0,f=u.length;h<f;h++){const d=u[h];d.onError&&d.onError(c)}this.manager.itemError(e)}).finally(()=>{this.manager.itemEnd(e)}),this.manager.itemStart(e)}setResponseType(e){return this.responseType=e,this}setMimeType(e){return this.mimeType=e,this}abort(){return this._abortController.abort(),this._abortController=new AbortController,this}}const es=new WeakMap;class nm extends Ts{constructor(e){super(e)}load(e,t,n,i){this.path!==void 0&&(e=this.path+e),e=this.manager.resolveURL(e);const r=this,o=Kn.get(`image:${e}`);if(o!==void 0){if(o.complete===!0)r.manager.itemStart(e),setTimeout(function(){t&&t(o),r.manager.itemEnd(e)},0);else{let h=es.get(o);h===void 0&&(h=[],es.set(o,h)),h.push({onLoad:t,onError:i})}return o}const a=cr("img");function l(){u(),t&&t(this);const h=es.get(this)||[];for(let f=0;f<h.length;f++){const d=h[f];d.onLoad&&d.onLoad(this)}es.delete(this),r.manager.itemEnd(e)}function c(h){u(),i&&i(h),Kn.remove(`image:${e}`);const f=es.get(this)||[];for(let d=0;d<f.length;d++){const p=f[d];p.onError&&p.onError(h)}es.delete(this),r.manager.itemError(e),r.manager.itemEnd(e)}function u(){a.removeEventListener("load",l,!1),a.removeEventListener("error",c,!1)}return a.addEventListener("load",l,!1),a.addEventListener("error",c,!1),e.slice(0,5)!=="data:"&&this.crossOrigin!==void 0&&(a.crossOrigin=this.crossOrigin),Kn.add(`image:${e}`,a),r.manager.itemStart(e),a.src=e,a}}class im extends Ts{constructor(e){super(e)}load(e,t,n,i){const r=new At,o=new nm(this.manager);return o.setCrossOrigin(this.crossOrigin),o.setPath(this.path),o.load(e,function(a){r.image=a,r.needsUpdate=!0,t!==void 0&&t(r)},n,i),r}}class Jl extends dt{constructor(e,t=1){super(),this.isLight=!0,this.type="Light",this.color=new Ue(e),this.intensity=t}dispose(){}copy(e,t){return super.copy(e,t),this.color.copy(e.color),this.intensity=e.intensity,this}toJSON(e){const t=super.toJSON(e);return t.object.color=this.color.getHex(),t.object.intensity=this.intensity,this.groundColor!==void 0&&(t.object.groundColor=this.groundColor.getHex()),this.distance!==void 0&&(t.object.distance=this.distance),this.angle!==void 0&&(t.object.angle=this.angle),this.decay!==void 0&&(t.object.decay=this.decay),this.penumbra!==void 0&&(t.object.penumbra=this.penumbra),this.shadow!==void 0&&(t.object.shadow=this.shadow.toJSON()),this.target!==void 0&&(t.object.target=this.target.uuid),t}}const ua=new Le,lu=new w,cu=new w;class Ql{constructor(e){this.camera=e,this.intensity=1,this.bias=0,this.normalBias=0,this.radius=1,this.blurSamples=8,this.mapSize=new ne(512,512),this.mapType=yn,this.map=null,this.mapPass=null,this.matrix=new Le,this.autoUpdate=!0,this.needsUpdate=!1,this._frustum=new Hl,this._frameExtents=new ne(1,1),this._viewportCount=1,this._viewports=[new He(0,0,1,1)]}getViewportCount(){return this._viewportCount}getFrustum(){return this._frustum}updateMatrices(e){const t=this.camera,n=this.matrix;lu.setFromMatrixPosition(e.matrixWorld),t.position.copy(lu),cu.setFromMatrixPosition(e.target.matrixWorld),t.lookAt(cu),t.updateMatrixWorld(),ua.multiplyMatrices(t.projectionMatrix,t.matrixWorldInverse),this._frustum.setFromProjectionMatrix(ua,t.coordinateSystem,t.reversedDepth),t.reversedDepth?n.set(.5,0,0,.5,0,.5,0,.5,0,0,1,0,0,0,0,1):n.set(.5,0,0,.5,0,.5,0,.5,0,0,.5,.5,0,0,0,1),n.multiply(ua)}getViewport(e){return this._viewports[e]}getFrameExtents(){return this._frameExtents}dispose(){this.map&&this.map.dispose(),this.mapPass&&this.mapPass.dispose()}copy(e){return this.camera=e.camera.clone(),this.intensity=e.intensity,this.bias=e.bias,this.radius=e.radius,this.autoUpdate=e.autoUpdate,this.needsUpdate=e.needsUpdate,this.normalBias=e.normalBias,this.blurSamples=e.blurSamples,this.mapSize.copy(e.mapSize),this}clone(){return new this.constructor().copy(this)}toJSON(){const e={};return this.intensity!==1&&(e.intensity=this.intensity),this.bias!==0&&(e.bias=this.bias),this.normalBias!==0&&(e.normalBias=this.normalBias),this.radius!==1&&(e.radius=this.radius),(this.mapSize.x!==512||this.mapSize.y!==512)&&(e.mapSize=this.mapSize.toArray()),e.camera=this.camera.toJSON(!1).object,delete e.camera.matrix,e}}class sm extends Ql{constructor(){super(new Dt(50,1,.5,500)),this.isSpotLightShadow=!0,this.focus=1,this.aspect=1}updateMatrices(e){const t=this.camera,n=ds*2*e.angle*this.focus,i=this.mapSize.width/this.mapSize.height*this.aspect,r=e.distance||t.far;(n!==t.fov||i!==t.aspect||r!==t.far)&&(t.fov=n,t.aspect=i,t.far=r,t.updateProjectionMatrix()),super.updateMatrices(e)}copy(e){return super.copy(e),this.focus=e.focus,this}}class rm extends Jl{constructor(e,t,n=0,i=Math.PI/3,r=0,o=2){super(e,t),this.isSpotLight=!0,this.type="SpotLight",this.position.copy(dt.DEFAULT_UP),this.updateMatrix(),this.target=new dt,this.distance=n,this.angle=i,this.penumbra=r,this.decay=o,this.map=null,this.shadow=new sm}get power(){return this.intensity*Math.PI}set power(e){this.intensity=e/Math.PI}dispose(){this.shadow.dispose()}copy(e,t){return super.copy(e,t),this.distance=e.distance,this.angle=e.angle,this.penumbra=e.penumbra,this.decay=e.decay,this.target=e.target.clone(),this.shadow=e.shadow.clone(),this}}const uu=new Le,ks=new w,ha=new w;class om extends Ql{constructor(){super(new Dt(90,1,.5,500)),this.isPointLightShadow=!0,this._frameExtents=new ne(4,2),this._viewportCount=6,this._viewports=[new He(2,1,1,1),new He(0,1,1,1),new He(3,1,1,1),new He(1,1,1,1),new He(3,0,1,1),new He(1,0,1,1)],this._cubeDirections=[new w(1,0,0),new w(-1,0,0),new w(0,0,1),new w(0,0,-1),new w(0,1,0),new w(0,-1,0)],this._cubeUps=[new w(0,1,0),new w(0,1,0),new w(0,1,0),new w(0,1,0),new w(0,0,1),new w(0,0,-1)]}updateMatrices(e,t=0){const n=this.camera,i=this.matrix,r=e.distance||n.far;r!==n.far&&(n.far=r,n.updateProjectionMatrix()),ks.setFromMatrixPosition(e.matrixWorld),n.position.copy(ks),ha.copy(n.position),ha.add(this._cubeDirections[t]),n.up.copy(this._cubeUps[t]),n.lookAt(ha),n.updateMatrixWorld(),i.makeTranslation(-ks.x,-ks.y,-ks.z),uu.multiplyMatrices(n.projectionMatrix,n.matrixWorldInverse),this._frustum.setFromProjectionMatrix(uu,n.coordinateSystem,n.reversedDepth)}}class am extends Jl{constructor(e,t,n=0,i=2){super(e,t),this.isPointLight=!0,this.type="PointLight",this.distance=n,this.decay=i,this.shadow=new om}get power(){return this.intensity*4*Math.PI}set power(e){this.intensity=e/(4*Math.PI)}dispose(){this.shadow.dispose()}copy(e,t){return super.copy(e,t),this.distance=e.distance,this.decay=e.decay,this.shadow=e.shadow.clone(),this}}class Ni extends Eh{constructor(e=-1,t=1,n=1,i=-1,r=.1,o=2e3){super(),this.isOrthographicCamera=!0,this.type="OrthographicCamera",this.zoom=1,this.view=null,this.left=e,this.right=t,this.top=n,this.bottom=i,this.near=r,this.far=o,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.left=e.left,this.right=e.right,this.top=e.top,this.bottom=e.bottom,this.near=e.near,this.far=e.far,this.zoom=e.zoom,this.view=e.view===null?null:Object.assign({},e.view),this}setViewOffset(e,t,n,i,r,o){this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=n,this.view.offsetY=i,this.view.width=r,this.view.height=o,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const e=(this.right-this.left)/(2*this.zoom),t=(this.top-this.bottom)/(2*this.zoom),n=(this.right+this.left)/2,i=(this.top+this.bottom)/2;let r=n-e,o=n+e,a=i+t,l=i-t;if(this.view!==null&&this.view.enabled){const c=(this.right-this.left)/this.view.fullWidth/this.zoom,u=(this.top-this.bottom)/this.view.fullHeight/this.zoom;r+=c*this.view.offsetX,o=r+c*this.view.width,a-=u*this.view.offsetY,l=a-u*this.view.height}this.projectionMatrix.makeOrthographic(r,o,a,l,this.near,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){const t=super.toJSON(e);return t.object.zoom=this.zoom,t.object.left=this.left,t.object.right=this.right,t.object.top=this.top,t.object.bottom=this.bottom,t.object.near=this.near,t.object.far=this.far,this.view!==null&&(t.object.view=Object.assign({},this.view)),t}}class lm extends Ql{constructor(){super(new Ni(-5,5,5,-5,.5,500)),this.isDirectionalLightShadow=!0}}class cm extends Jl{constructor(e,t){super(e,t),this.isDirectionalLight=!0,this.type="DirectionalLight",this.position.copy(dt.DEFAULT_UP),this.updateMatrix(),this.target=new dt,this.shadow=new lm}dispose(){this.shadow.dispose()}copy(e){return super.copy(e),this.target=e.target.clone(),this.shadow=e.shadow.clone(),this}}class Qs{static extractUrlBase(e){const t=e.lastIndexOf("/");return t===-1?"./":e.slice(0,t+1)}static resolveURL(e,t){return typeof e!="string"||e===""?"":(/^https?:\/\//i.test(t)&&/^\//.test(e)&&(t=t.replace(/(^https?:\/\/[^\/]+).*/i,"$1")),/^(https?:)?\/\//i.test(e)||/^data:.*,.*$/i.test(e)||/^blob:.*$/i.test(e)?e:t+e)}}const fa=new WeakMap;class um extends Ts{constructor(e){super(e),this.isImageBitmapLoader=!0,typeof createImageBitmap>"u"&&console.warn("THREE.ImageBitmapLoader: createImageBitmap() not supported."),typeof fetch>"u"&&console.warn("THREE.ImageBitmapLoader: fetch() not supported."),this.options={premultiplyAlpha:"none"},this._abortController=new AbortController}setOptions(e){return this.options=e,this}load(e,t,n,i){e===void 0&&(e=""),this.path!==void 0&&(e=this.path+e),e=this.manager.resolveURL(e);const r=this,o=Kn.get(`image-bitmap:${e}`);if(o!==void 0){if(r.manager.itemStart(e),o.then){o.then(c=>{if(fa.has(o)===!0)i&&i(fa.get(o)),r.manager.itemError(e),r.manager.itemEnd(e);else return t&&t(c),r.manager.itemEnd(e),c});return}return setTimeout(function(){t&&t(o),r.manager.itemEnd(e)},0),o}const a={};a.credentials=this.crossOrigin==="anonymous"?"same-origin":"include",a.headers=this.requestHeader,a.signal=typeof AbortSignal.any=="function"?AbortSignal.any([this._abortController.signal,this.manager.abortController.signal]):this._abortController.signal;const l=fetch(e,a).then(function(c){return c.blob()}).then(function(c){return createImageBitmap(c,Object.assign(r.options,{colorSpaceConversion:"none"}))}).then(function(c){return Kn.add(`image-bitmap:${e}`,c),t&&t(c),r.manager.itemEnd(e),c}).catch(function(c){i&&i(c),fa.set(l,c),Kn.remove(`image-bitmap:${e}`),r.manager.itemError(e),r.manager.itemEnd(e)});Kn.add(`image-bitmap:${e}`,l),r.manager.itemStart(e)}abort(){return this._abortController.abort(),this._abortController=new AbortController,this}}class hm extends Dt{constructor(e=[]){super(),this.isArrayCamera=!0,this.isMultiViewCamera=!1,this.cameras=e}}const ec="\\[\\]\\.:\\/",fm=new RegExp("["+ec+"]","g"),tc="[^"+ec+"]",dm="[^"+ec.replace("\\.","")+"]",pm=/((?:WC+[\/:])*)/.source.replace("WC",tc),mm=/(WCOD+)?/.source.replace("WCOD",dm),gm=/(?:\.(WC+)(?:\[(.+)\])?)?/.source.replace("WC",tc),vm=/\.(WC+)(?:\[(.+)\])?/.source.replace("WC",tc),xm=new RegExp("^"+pm+mm+gm+vm+"$"),_m=["material","materials","bones","map"];class ym{constructor(e,t,n){const i=n||rt.parseTrackName(t);this._targetGroup=e,this._bindings=e.subscribe_(t,i)}getValue(e,t){this.bind();const n=this._targetGroup.nCachedObjects_,i=this._bindings[n];i!==void 0&&i.getValue(e,t)}setValue(e,t){const n=this._bindings;for(let i=this._targetGroup.nCachedObjects_,r=n.length;i!==r;++i)n[i].setValue(e,t)}bind(){const e=this._bindings;for(let t=this._targetGroup.nCachedObjects_,n=e.length;t!==n;++t)e[t].bind()}unbind(){const e=this._bindings;for(let t=this._targetGroup.nCachedObjects_,n=e.length;t!==n;++t)e[t].unbind()}}class rt{constructor(e,t,n){this.path=t,this.parsedPath=n||rt.parseTrackName(t),this.node=rt.findNode(e,this.parsedPath.nodeName),this.rootNode=e,this.getValue=this._getValue_unbound,this.setValue=this._setValue_unbound}static create(e,t,n){return e&&e.isAnimationObjectGroup?new rt.Composite(e,t,n):new rt(e,t,n)}static sanitizeNodeName(e){return e.replace(/\s/g,"_").replace(fm,"")}static parseTrackName(e){const t=xm.exec(e);if(t===null)throw new Error("PropertyBinding: Cannot parse trackName: "+e);const n={nodeName:t[2],objectName:t[3],objectIndex:t[4],propertyName:t[5],propertyIndex:t[6]},i=n.nodeName&&n.nodeName.lastIndexOf(".");if(i!==void 0&&i!==-1){const r=n.nodeName.substring(i+1);_m.indexOf(r)!==-1&&(n.nodeName=n.nodeName.substring(0,i),n.objectName=r)}if(n.propertyName===null||n.propertyName.length===0)throw new Error("PropertyBinding: can not parse propertyName from trackName: "+e);return n}static findNode(e,t){if(t===void 0||t===""||t==="."||t===-1||t===e.name||t===e.uuid)return e;if(e.skeleton){const n=e.skeleton.getBoneByName(t);if(n!==void 0)return n}if(e.children){const n=function(r){for(let o=0;o<r.length;o++){const a=r[o];if(a.name===t||a.uuid===t)return a;const l=n(a.children);if(l)return l}return null},i=n(e.children);if(i)return i}return null}_getValue_unavailable(){}_setValue_unavailable(){}_getValue_direct(e,t){e[t]=this.targetObject[this.propertyName]}_getValue_array(e,t){const n=this.resolvedProperty;for(let i=0,r=n.length;i!==r;++i)e[t++]=n[i]}_getValue_arrayElement(e,t){e[t]=this.resolvedProperty[this.propertyIndex]}_getValue_toArray(e,t){this.resolvedProperty.toArray(e,t)}_setValue_direct(e,t){this.targetObject[this.propertyName]=e[t]}_setValue_direct_setNeedsUpdate(e,t){this.targetObject[this.propertyName]=e[t],this.targetObject.needsUpdate=!0}_setValue_direct_setMatrixWorldNeedsUpdate(e,t){this.targetObject[this.propertyName]=e[t],this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_array(e,t){const n=this.resolvedProperty;for(let i=0,r=n.length;i!==r;++i)n[i]=e[t++]}_setValue_array_setNeedsUpdate(e,t){const n=this.resolvedProperty;for(let i=0,r=n.length;i!==r;++i)n[i]=e[t++];this.targetObject.needsUpdate=!0}_setValue_array_setMatrixWorldNeedsUpdate(e,t){const n=this.resolvedProperty;for(let i=0,r=n.length;i!==r;++i)n[i]=e[t++];this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_arrayElement(e,t){this.resolvedProperty[this.propertyIndex]=e[t]}_setValue_arrayElement_setNeedsUpdate(e,t){this.resolvedProperty[this.propertyIndex]=e[t],this.targetObject.needsUpdate=!0}_setValue_arrayElement_setMatrixWorldNeedsUpdate(e,t){this.resolvedProperty[this.propertyIndex]=e[t],this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_fromArray(e,t){this.resolvedProperty.fromArray(e,t)}_setValue_fromArray_setNeedsUpdate(e,t){this.resolvedProperty.fromArray(e,t),this.targetObject.needsUpdate=!0}_setValue_fromArray_setMatrixWorldNeedsUpdate(e,t){this.resolvedProperty.fromArray(e,t),this.targetObject.matrixWorldNeedsUpdate=!0}_getValue_unbound(e,t){this.bind(),this.getValue(e,t)}_setValue_unbound(e,t){this.bind(),this.setValue(e,t)}bind(){let e=this.node;const t=this.parsedPath,n=t.objectName,i=t.propertyName;let r=t.propertyIndex;if(e||(e=rt.findNode(this.rootNode,t.nodeName),this.node=e),this.getValue=this._getValue_unavailable,this.setValue=this._setValue_unavailable,!e){console.warn("THREE.PropertyBinding: No target node found for track: "+this.path+".");return}if(n){let c=t.objectIndex;switch(n){case"materials":if(!e.material){console.error("THREE.PropertyBinding: Can not bind to material as node does not have a material.",this);return}if(!e.material.materials){console.error("THREE.PropertyBinding: Can not bind to material.materials as node.material does not have a materials array.",this);return}e=e.material.materials;break;case"bones":if(!e.skeleton){console.error("THREE.PropertyBinding: Can not bind to bones as node does not have a skeleton.",this);return}e=e.skeleton.bones;for(let u=0;u<e.length;u++)if(e[u].name===c){c=u;break}break;case"map":if("map"in e){e=e.map;break}if(!e.material){console.error("THREE.PropertyBinding: Can not bind to material as node does not have a material.",this);return}if(!e.material.map){console.error("THREE.PropertyBinding: Can not bind to material.map as node.material does not have a map.",this);return}e=e.material.map;break;default:if(e[n]===void 0){console.error("THREE.PropertyBinding: Can not bind to objectName of node undefined.",this);return}e=e[n]}if(c!==void 0){if(e[c]===void 0){console.error("THREE.PropertyBinding: Trying to bind to objectIndex of objectName, but is undefined.",this,e);return}e=e[c]}}const o=e[i];if(o===void 0){const c=t.nodeName;console.error("THREE.PropertyBinding: Trying to update property for track: "+c+"."+i+" but it wasn't found.",e);return}let a=this.Versioning.None;this.targetObject=e,e.isMaterial===!0?a=this.Versioning.NeedsUpdate:e.isObject3D===!0&&(a=this.Versioning.MatrixWorldNeedsUpdate);let l=this.BindingType.Direct;if(r!==void 0){if(i==="morphTargetInfluences"){if(!e.geometry){console.error("THREE.PropertyBinding: Can not bind to morphTargetInfluences because node does not have a geometry.",this);return}if(!e.geometry.morphAttributes){console.error("THREE.PropertyBinding: Can not bind to morphTargetInfluences because node does not have a geometry.morphAttributes.",this);return}e.morphTargetDictionary[r]!==void 0&&(r=e.morphTargetDictionary[r])}l=this.BindingType.ArrayElement,this.resolvedProperty=o,this.propertyIndex=r}else o.fromArray!==void 0&&o.toArray!==void 0?(l=this.BindingType.HasFromToArray,this.resolvedProperty=o):Array.isArray(o)?(l=this.BindingType.EntireArray,this.resolvedProperty=o):this.propertyName=i;this.getValue=this.GetterByBindingType[l],this.setValue=this.SetterByBindingTypeAndVersioning[l][a]}unbind(){this.node=null,this.getValue=this._getValue_unbound,this.setValue=this._setValue_unbound}}rt.Composite=ym;rt.prototype.BindingType={Direct:0,EntireArray:1,ArrayElement:2,HasFromToArray:3};rt.prototype.Versioning={None:0,NeedsUpdate:1,MatrixWorldNeedsUpdate:2};rt.prototype.GetterByBindingType=[rt.prototype._getValue_direct,rt.prototype._getValue_array,rt.prototype._getValue_arrayElement,rt.prototype._getValue_toArray];rt.prototype.SetterByBindingTypeAndVersioning=[[rt.prototype._setValue_direct,rt.prototype._setValue_direct_setNeedsUpdate,rt.prototype._setValue_direct_setMatrixWorldNeedsUpdate],[rt.prototype._setValue_array,rt.prototype._setValue_array_setNeedsUpdate,rt.prototype._setValue_array_setMatrixWorldNeedsUpdate],[rt.prototype._setValue_arrayElement,rt.prototype._setValue_arrayElement_setNeedsUpdate,rt.prototype._setValue_arrayElement_setMatrixWorldNeedsUpdate],[rt.prototype._setValue_fromArray,rt.prototype._setValue_fromArray_setNeedsUpdate,rt.prototype._setValue_fromArray_setMatrixWorldNeedsUpdate]];const hu=new Le;class Mm{constructor(e,t,n=0,i=1/0){this.ray=new gr(e,t),this.near=n,this.far=i,this.camera=null,this.layers=new Bl,this.params={Mesh:{},Line:{threshold:1},LOD:{},Points:{threshold:1},Sprite:{}}}set(e,t){this.ray.set(e,t)}setFromCamera(e,t){t.isPerspectiveCamera?(this.ray.origin.setFromMatrixPosition(t.matrixWorld),this.ray.direction.set(e.x,e.y,.5).unproject(t).sub(this.ray.origin).normalize(),this.camera=t):t.isOrthographicCamera?(this.ray.origin.set(e.x,e.y,(t.near+t.far)/(t.near-t.far)).unproject(t),this.ray.direction.set(0,0,-1).transformDirection(t.matrixWorld),this.camera=t):console.error("THREE.Raycaster: Unsupported camera type: "+t.type)}setFromXRController(e){return hu.identity().extractRotation(e.matrixWorld),this.ray.origin.setFromMatrixPosition(e.matrixWorld),this.ray.direction.set(0,0,-1).applyMatrix4(hu),this}intersectObject(e,t=!0,n=[]){return Ml(e,this,n,t),n.sort(fu),n}intersectObjects(e,t=!0,n=[]){for(let i=0,r=e.length;i<r;i++)Ml(e[i],this,n,t);return n.sort(fu),n}}function fu(s,e){return s.distance-e.distance}function Ml(s,e,t,n){let i=!0;if(s.layers.test(e.layers)&&s.raycast(e,t)===!1&&(i=!1),i===!0&&n===!0){const r=s.children;for(let o=0,a=r.length;o<a;o++)Ml(r[o],e,t,!0)}}function du(s,e,t,n){const i=Sm(n);switch(t){case dh:return s*e;case To:return s*e/i.components*i.byteLength;case Nl:return s*e/i.components*i.byteLength;case mh:return s*e*2/i.components*i.byteLength;case Ul:return s*e*2/i.components*i.byteLength;case ph:return s*e*3/i.components*i.byteLength;case Nt:return s*e*4/i.components*i.byteLength;case Fl:return s*e*4/i.components*i.byteLength;case ao:case lo:return Math.floor((s+3)/4)*Math.floor((e+3)/4)*8;case co:case uo:return Math.floor((s+3)/4)*Math.floor((e+3)/4)*16;case za:case Va:return Math.max(s,16)*Math.max(e,8)/4;case Ba:case Ha:return Math.max(s,8)*Math.max(e,8)/2;case Ga:case Wa:return Math.floor((s+3)/4)*Math.floor((e+3)/4)*8;case Xa:return Math.floor((s+3)/4)*Math.floor((e+3)/4)*16;case qa:return Math.floor((s+3)/4)*Math.floor((e+3)/4)*16;case Ka:return Math.floor((s+4)/5)*Math.floor((e+3)/4)*16;case $a:return Math.floor((s+4)/5)*Math.floor((e+4)/5)*16;case Ya:return Math.floor((s+5)/6)*Math.floor((e+4)/5)*16;case ja:return Math.floor((s+5)/6)*Math.floor((e+5)/6)*16;case Za:return Math.floor((s+7)/8)*Math.floor((e+4)/5)*16;case Ja:return Math.floor((s+7)/8)*Math.floor((e+5)/6)*16;case Qa:return Math.floor((s+7)/8)*Math.floor((e+7)/8)*16;case el:return Math.floor((s+9)/10)*Math.floor((e+4)/5)*16;case tl:return Math.floor((s+9)/10)*Math.floor((e+5)/6)*16;case nl:return Math.floor((s+9)/10)*Math.floor((e+7)/8)*16;case il:return Math.floor((s+9)/10)*Math.floor((e+9)/10)*16;case sl:return Math.floor((s+11)/12)*Math.floor((e+9)/10)*16;case rl:return Math.floor((s+11)/12)*Math.floor((e+11)/12)*16;case ol:case al:case ll:return Math.ceil(s/4)*Math.ceil(e/4)*16;case cl:case ul:return Math.ceil(s/4)*Math.ceil(e/4)*8;case hl:case fl:return Math.ceil(s/4)*Math.ceil(e/4)*16}throw new Error(`Unable to determine texture byte length for ${t} format.`)}function Sm(s){switch(s){case yn:case ch:return{byteLength:1,components:1};case ir:case uh:case nn:return{byteLength:2,components:1};case Il:case Dl:return{byteLength:2,components:4};case Li:case Ll:case gn:return{byteLength:4,components:1};case hh:case fh:return{byteLength:4,components:3}}throw new Error(`Unknown texture type ${s}.`)}typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("register",{detail:{revision:Pl}}));typeof window<"u"&&(window.__THREE__?console.warn("WARNING: Multiple instances of Three.js being imported."):window.__THREE__=Pl);/**
 * @license
 * Copyright 2010-2025 Three.js Authors
 * SPDX-License-Identifier: MIT
 */function qh(){let s=null,e=!1,t=null,n=null;function i(r,o){t(r,o),n=s.requestAnimationFrame(i)}return{start:function(){e!==!0&&t!==null&&(n=s.requestAnimationFrame(i),e=!0)},stop:function(){s.cancelAnimationFrame(n),e=!1},setAnimationLoop:function(r){t=r},setContext:function(r){s=r}}}function bm(s){const e=new WeakMap;function t(a,l){const c=a.array,u=a.usage,h=c.byteLength,f=s.createBuffer();s.bindBuffer(l,f),s.bufferData(l,c,u),a.onUploadCallback();let d;if(c instanceof Float32Array)d=s.FLOAT;else if(typeof Float16Array<"u"&&c instanceof Float16Array)d=s.HALF_FLOAT;else if(c instanceof Uint16Array)a.isFloat16BufferAttribute?d=s.HALF_FLOAT:d=s.UNSIGNED_SHORT;else if(c instanceof Int16Array)d=s.SHORT;else if(c instanceof Uint32Array)d=s.UNSIGNED_INT;else if(c instanceof Int32Array)d=s.INT;else if(c instanceof Int8Array)d=s.BYTE;else if(c instanceof Uint8Array)d=s.UNSIGNED_BYTE;else if(c instanceof Uint8ClampedArray)d=s.UNSIGNED_BYTE;else throw new Error("THREE.WebGLAttributes: Unsupported buffer data format: "+c);return{buffer:f,type:d,bytesPerElement:c.BYTES_PER_ELEMENT,version:a.version,size:h}}function n(a,l,c){const u=l.array,h=l.updateRanges;if(s.bindBuffer(c,a),h.length===0)s.bufferSubData(c,0,u);else{h.sort((d,p)=>d.start-p.start);let f=0;for(let d=1;d<h.length;d++){const p=h[f],v=h[d];v.start<=p.start+p.count+1?p.count=Math.max(p.count,v.start+v.count-p.start):(++f,h[f]=v)}h.length=f+1;for(let d=0,p=h.length;d<p;d++){const v=h[d];s.bufferSubData(c,v.start*u.BYTES_PER_ELEMENT,u,v.start,v.count)}l.clearUpdateRanges()}l.onUploadCallback()}function i(a){return a.isInterleavedBufferAttribute&&(a=a.data),e.get(a)}function r(a){a.isInterleavedBufferAttribute&&(a=a.data);const l=e.get(a);l&&(s.deleteBuffer(l.buffer),e.delete(a))}function o(a,l){if(a.isInterleavedBufferAttribute&&(a=a.data),a.isGLBufferAttribute){const u=e.get(a);(!u||u.version<a.version)&&e.set(a,{buffer:a.buffer,type:a.type,bytesPerElement:a.elementSize,version:a.version});return}const c=e.get(a);if(c===void 0)e.set(a,t(a,l));else if(c.version<a.version){if(c.size!==a.array.byteLength)throw new Error("THREE.WebGLAttributes: The size of the buffer attribute's array buffer does not match the original size. Resizing buffer attributes is not supported.");n(c.buffer,a,l),c.version=a.version}}return{get:i,remove:r,update:o}}var Tm=`#ifdef USE_ALPHAHASH
	if ( diffuseColor.a < getAlphaHashThreshold( vPosition ) ) discard;
#endif`,Em=`#ifdef USE_ALPHAHASH
	const float ALPHA_HASH_SCALE = 0.05;
	float hash2D( vec2 value ) {
		return fract( 1.0e4 * sin( 17.0 * value.x + 0.1 * value.y ) * ( 0.1 + abs( sin( 13.0 * value.y + value.x ) ) ) );
	}
	float hash3D( vec3 value ) {
		return hash2D( vec2( hash2D( value.xy ), value.z ) );
	}
	float getAlphaHashThreshold( vec3 position ) {
		float maxDeriv = max(
			length( dFdx( position.xyz ) ),
			length( dFdy( position.xyz ) )
		);
		float pixScale = 1.0 / ( ALPHA_HASH_SCALE * maxDeriv );
		vec2 pixScales = vec2(
			exp2( floor( log2( pixScale ) ) ),
			exp2( ceil( log2( pixScale ) ) )
		);
		vec2 alpha = vec2(
			hash3D( floor( pixScales.x * position.xyz ) ),
			hash3D( floor( pixScales.y * position.xyz ) )
		);
		float lerpFactor = fract( log2( pixScale ) );
		float x = ( 1.0 - lerpFactor ) * alpha.x + lerpFactor * alpha.y;
		float a = min( lerpFactor, 1.0 - lerpFactor );
		vec3 cases = vec3(
			x * x / ( 2.0 * a * ( 1.0 - a ) ),
			( x - 0.5 * a ) / ( 1.0 - a ),
			1.0 - ( ( 1.0 - x ) * ( 1.0 - x ) / ( 2.0 * a * ( 1.0 - a ) ) )
		);
		float threshold = ( x < ( 1.0 - a ) )
			? ( ( x < a ) ? cases.x : cases.y )
			: cases.z;
		return clamp( threshold , 1.0e-6, 1.0 );
	}
#endif`,wm=`#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, vAlphaMapUv ).g;
#endif`,Am=`#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,Rm=`#ifdef USE_ALPHATEST
	#ifdef ALPHA_TO_COVERAGE
	diffuseColor.a = smoothstep( alphaTest, alphaTest + fwidth( diffuseColor.a ), diffuseColor.a );
	if ( diffuseColor.a == 0.0 ) discard;
	#else
	if ( diffuseColor.a < alphaTest ) discard;
	#endif
#endif`,Cm=`#ifdef USE_ALPHATEST
	uniform float alphaTest;
#endif`,Pm=`#ifdef USE_AOMAP
	float ambientOcclusion = ( texture2D( aoMap, vAoMapUv ).r - 1.0 ) * aoMapIntensity + 1.0;
	reflectedLight.indirectDiffuse *= ambientOcclusion;
	#if defined( USE_CLEARCOAT ) 
		clearcoatSpecularIndirect *= ambientOcclusion;
	#endif
	#if defined( USE_SHEEN ) 
		sheenSpecularIndirect *= ambientOcclusion;
	#endif
	#if defined( USE_ENVMAP ) && defined( STANDARD )
		float dotNV = saturate( dot( geometryNormal, geometryViewDir ) );
		reflectedLight.indirectSpecular *= computeSpecularOcclusion( dotNV, ambientOcclusion, material.roughness );
	#endif
#endif`,Lm=`#ifdef USE_AOMAP
	uniform sampler2D aoMap;
	uniform float aoMapIntensity;
#endif`,Im=`#ifdef USE_BATCHING
	#if ! defined( GL_ANGLE_multi_draw )
	#define gl_DrawID _gl_DrawID
	uniform int _gl_DrawID;
	#endif
	uniform highp sampler2D batchingTexture;
	uniform highp usampler2D batchingIdTexture;
	mat4 getBatchingMatrix( const in float i ) {
		int size = textureSize( batchingTexture, 0 ).x;
		int j = int( i ) * 4;
		int x = j % size;
		int y = j / size;
		vec4 v1 = texelFetch( batchingTexture, ivec2( x, y ), 0 );
		vec4 v2 = texelFetch( batchingTexture, ivec2( x + 1, y ), 0 );
		vec4 v3 = texelFetch( batchingTexture, ivec2( x + 2, y ), 0 );
		vec4 v4 = texelFetch( batchingTexture, ivec2( x + 3, y ), 0 );
		return mat4( v1, v2, v3, v4 );
	}
	float getIndirectIndex( const in int i ) {
		int size = textureSize( batchingIdTexture, 0 ).x;
		int x = i % size;
		int y = i / size;
		return float( texelFetch( batchingIdTexture, ivec2( x, y ), 0 ).r );
	}
#endif
#ifdef USE_BATCHING_COLOR
	uniform sampler2D batchingColorTexture;
	vec3 getBatchingColor( const in float i ) {
		int size = textureSize( batchingColorTexture, 0 ).x;
		int j = int( i );
		int x = j % size;
		int y = j / size;
		return texelFetch( batchingColorTexture, ivec2( x, y ), 0 ).rgb;
	}
#endif`,Dm=`#ifdef USE_BATCHING
	mat4 batchingMatrix = getBatchingMatrix( getIndirectIndex( gl_DrawID ) );
#endif`,Nm=`vec3 transformed = vec3( position );
#ifdef USE_ALPHAHASH
	vPosition = vec3( position );
#endif`,Um=`vec3 objectNormal = vec3( normal );
#ifdef USE_TANGENT
	vec3 objectTangent = vec3( tangent.xyz );
#endif`,Fm=`float G_BlinnPhong_Implicit( ) {
	return 0.25;
}
float D_BlinnPhong( const in float shininess, const in float dotNH ) {
	return RECIPROCAL_PI * ( shininess * 0.5 + 1.0 ) * pow( dotNH, shininess );
}
vec3 BRDF_BlinnPhong( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in vec3 specularColor, const in float shininess ) {
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNH = saturate( dot( normal, halfDir ) );
	float dotVH = saturate( dot( viewDir, halfDir ) );
	vec3 F = F_Schlick( specularColor, 1.0, dotVH );
	float G = G_BlinnPhong_Implicit( );
	float D = D_BlinnPhong( shininess, dotNH );
	return F * ( G * D );
} // validated`,Om=`#ifdef USE_IRIDESCENCE
	const mat3 XYZ_TO_REC709 = mat3(
		 3.2404542, -0.9692660,  0.0556434,
		-1.5371385,  1.8760108, -0.2040259,
		-0.4985314,  0.0415560,  1.0572252
	);
	vec3 Fresnel0ToIor( vec3 fresnel0 ) {
		vec3 sqrtF0 = sqrt( fresnel0 );
		return ( vec3( 1.0 ) + sqrtF0 ) / ( vec3( 1.0 ) - sqrtF0 );
	}
	vec3 IorToFresnel0( vec3 transmittedIor, float incidentIor ) {
		return pow2( ( transmittedIor - vec3( incidentIor ) ) / ( transmittedIor + vec3( incidentIor ) ) );
	}
	float IorToFresnel0( float transmittedIor, float incidentIor ) {
		return pow2( ( transmittedIor - incidentIor ) / ( transmittedIor + incidentIor ));
	}
	vec3 evalSensitivity( float OPD, vec3 shift ) {
		float phase = 2.0 * PI * OPD * 1.0e-9;
		vec3 val = vec3( 5.4856e-13, 4.4201e-13, 5.2481e-13 );
		vec3 pos = vec3( 1.6810e+06, 1.7953e+06, 2.2084e+06 );
		vec3 var = vec3( 4.3278e+09, 9.3046e+09, 6.6121e+09 );
		vec3 xyz = val * sqrt( 2.0 * PI * var ) * cos( pos * phase + shift ) * exp( - pow2( phase ) * var );
		xyz.x += 9.7470e-14 * sqrt( 2.0 * PI * 4.5282e+09 ) * cos( 2.2399e+06 * phase + shift[ 0 ] ) * exp( - 4.5282e+09 * pow2( phase ) );
		xyz /= 1.0685e-7;
		vec3 rgb = XYZ_TO_REC709 * xyz;
		return rgb;
	}
	vec3 evalIridescence( float outsideIOR, float eta2, float cosTheta1, float thinFilmThickness, vec3 baseF0 ) {
		vec3 I;
		float iridescenceIOR = mix( outsideIOR, eta2, smoothstep( 0.0, 0.03, thinFilmThickness ) );
		float sinTheta2Sq = pow2( outsideIOR / iridescenceIOR ) * ( 1.0 - pow2( cosTheta1 ) );
		float cosTheta2Sq = 1.0 - sinTheta2Sq;
		if ( cosTheta2Sq < 0.0 ) {
			return vec3( 1.0 );
		}
		float cosTheta2 = sqrt( cosTheta2Sq );
		float R0 = IorToFresnel0( iridescenceIOR, outsideIOR );
		float R12 = F_Schlick( R0, 1.0, cosTheta1 );
		float T121 = 1.0 - R12;
		float phi12 = 0.0;
		if ( iridescenceIOR < outsideIOR ) phi12 = PI;
		float phi21 = PI - phi12;
		vec3 baseIOR = Fresnel0ToIor( clamp( baseF0, 0.0, 0.9999 ) );		vec3 R1 = IorToFresnel0( baseIOR, iridescenceIOR );
		vec3 R23 = F_Schlick( R1, 1.0, cosTheta2 );
		vec3 phi23 = vec3( 0.0 );
		if ( baseIOR[ 0 ] < iridescenceIOR ) phi23[ 0 ] = PI;
		if ( baseIOR[ 1 ] < iridescenceIOR ) phi23[ 1 ] = PI;
		if ( baseIOR[ 2 ] < iridescenceIOR ) phi23[ 2 ] = PI;
		float OPD = 2.0 * iridescenceIOR * thinFilmThickness * cosTheta2;
		vec3 phi = vec3( phi21 ) + phi23;
		vec3 R123 = clamp( R12 * R23, 1e-5, 0.9999 );
		vec3 r123 = sqrt( R123 );
		vec3 Rs = pow2( T121 ) * R23 / ( vec3( 1.0 ) - R123 );
		vec3 C0 = R12 + Rs;
		I = C0;
		vec3 Cm = Rs - T121;
		for ( int m = 1; m <= 2; ++ m ) {
			Cm *= r123;
			vec3 Sm = 2.0 * evalSensitivity( float( m ) * OPD, float( m ) * phi );
			I += Cm * Sm;
		}
		return max( I, vec3( 0.0 ) );
	}
#endif`,km=`#ifdef USE_BUMPMAP
	uniform sampler2D bumpMap;
	uniform float bumpScale;
	vec2 dHdxy_fwd() {
		vec2 dSTdx = dFdx( vBumpMapUv );
		vec2 dSTdy = dFdy( vBumpMapUv );
		float Hll = bumpScale * texture2D( bumpMap, vBumpMapUv ).x;
		float dBx = bumpScale * texture2D( bumpMap, vBumpMapUv + dSTdx ).x - Hll;
		float dBy = bumpScale * texture2D( bumpMap, vBumpMapUv + dSTdy ).x - Hll;
		return vec2( dBx, dBy );
	}
	vec3 perturbNormalArb( vec3 surf_pos, vec3 surf_norm, vec2 dHdxy, float faceDirection ) {
		vec3 vSigmaX = normalize( dFdx( surf_pos.xyz ) );
		vec3 vSigmaY = normalize( dFdy( surf_pos.xyz ) );
		vec3 vN = surf_norm;
		vec3 R1 = cross( vSigmaY, vN );
		vec3 R2 = cross( vN, vSigmaX );
		float fDet = dot( vSigmaX, R1 ) * faceDirection;
		vec3 vGrad = sign( fDet ) * ( dHdxy.x * R1 + dHdxy.y * R2 );
		return normalize( abs( fDet ) * surf_norm - vGrad );
	}
#endif`,Bm=`#if NUM_CLIPPING_PLANES > 0
	vec4 plane;
	#ifdef ALPHA_TO_COVERAGE
		float distanceToPlane, distanceGradient;
		float clipOpacity = 1.0;
		#pragma unroll_loop_start
		for ( int i = 0; i < UNION_CLIPPING_PLANES; i ++ ) {
			plane = clippingPlanes[ i ];
			distanceToPlane = - dot( vClipPosition, plane.xyz ) + plane.w;
			distanceGradient = fwidth( distanceToPlane ) / 2.0;
			clipOpacity *= smoothstep( - distanceGradient, distanceGradient, distanceToPlane );
			if ( clipOpacity == 0.0 ) discard;
		}
		#pragma unroll_loop_end
		#if UNION_CLIPPING_PLANES < NUM_CLIPPING_PLANES
			float unionClipOpacity = 1.0;
			#pragma unroll_loop_start
			for ( int i = UNION_CLIPPING_PLANES; i < NUM_CLIPPING_PLANES; i ++ ) {
				plane = clippingPlanes[ i ];
				distanceToPlane = - dot( vClipPosition, plane.xyz ) + plane.w;
				distanceGradient = fwidth( distanceToPlane ) / 2.0;
				unionClipOpacity *= 1.0 - smoothstep( - distanceGradient, distanceGradient, distanceToPlane );
			}
			#pragma unroll_loop_end
			clipOpacity *= 1.0 - unionClipOpacity;
		#endif
		diffuseColor.a *= clipOpacity;
		if ( diffuseColor.a == 0.0 ) discard;
	#else
		#pragma unroll_loop_start
		for ( int i = 0; i < UNION_CLIPPING_PLANES; i ++ ) {
			plane = clippingPlanes[ i ];
			if ( dot( vClipPosition, plane.xyz ) > plane.w ) discard;
		}
		#pragma unroll_loop_end
		#if UNION_CLIPPING_PLANES < NUM_CLIPPING_PLANES
			bool clipped = true;
			#pragma unroll_loop_start
			for ( int i = UNION_CLIPPING_PLANES; i < NUM_CLIPPING_PLANES; i ++ ) {
				plane = clippingPlanes[ i ];
				clipped = ( dot( vClipPosition, plane.xyz ) > plane.w ) && clipped;
			}
			#pragma unroll_loop_end
			if ( clipped ) discard;
		#endif
	#endif
#endif`,zm=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
	uniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];
#endif`,Hm=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
#endif`,Vm=`#if NUM_CLIPPING_PLANES > 0
	vClipPosition = - mvPosition.xyz;
#endif`,Gm=`#if defined( USE_COLOR_ALPHA )
	diffuseColor *= vColor;
#elif defined( USE_COLOR )
	diffuseColor.rgb *= vColor;
#endif`,Wm=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR )
	varying vec3 vColor;
#endif`,Xm=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	varying vec3 vColor;
#endif`,qm=`#if defined( USE_COLOR_ALPHA )
	vColor = vec4( 1.0 );
#elif defined( USE_COLOR ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	vColor = vec3( 1.0 );
#endif
#ifdef USE_COLOR
	vColor *= color;
#endif
#ifdef USE_INSTANCING_COLOR
	vColor.xyz *= instanceColor.xyz;
#endif
#ifdef USE_BATCHING_COLOR
	vec3 batchingColor = getBatchingColor( getIndirectIndex( gl_DrawID ) );
	vColor.xyz *= batchingColor.xyz;
#endif`,Km=`#define PI 3.141592653589793
#define PI2 6.283185307179586
#define PI_HALF 1.5707963267948966
#define RECIPROCAL_PI 0.3183098861837907
#define RECIPROCAL_PI2 0.15915494309189535
#define EPSILON 1e-6
#ifndef saturate
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
#define whiteComplement( a ) ( 1.0 - saturate( a ) )
float pow2( const in float x ) { return x*x; }
vec3 pow2( const in vec3 x ) { return x*x; }
float pow3( const in float x ) { return x*x*x; }
float pow4( const in float x ) { float x2 = x*x; return x2*x2; }
float max3( const in vec3 v ) { return max( max( v.x, v.y ), v.z ); }
float average( const in vec3 v ) { return dot( v, vec3( 0.3333333 ) ); }
highp float rand( const in vec2 uv ) {
	const highp float a = 12.9898, b = 78.233, c = 43758.5453;
	highp float dt = dot( uv.xy, vec2( a,b ) ), sn = mod( dt, PI );
	return fract( sin( sn ) * c );
}
#ifdef HIGH_PRECISION
	float precisionSafeLength( vec3 v ) { return length( v ); }
#else
	float precisionSafeLength( vec3 v ) {
		float maxComponent = max3( abs( v ) );
		return length( v / maxComponent ) * maxComponent;
	}
#endif
struct IncidentLight {
	vec3 color;
	vec3 direction;
	bool visible;
};
struct ReflectedLight {
	vec3 directDiffuse;
	vec3 directSpecular;
	vec3 indirectDiffuse;
	vec3 indirectSpecular;
};
#ifdef USE_ALPHAHASH
	varying vec3 vPosition;
#endif
vec3 transformDirection( in vec3 dir, in mat4 matrix ) {
	return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );
}
vec3 inverseTransformDirection( in vec3 dir, in mat4 matrix ) {
	return normalize( ( vec4( dir, 0.0 ) * matrix ).xyz );
}
mat3 transposeMat3( const in mat3 m ) {
	mat3 tmp;
	tmp[ 0 ] = vec3( m[ 0 ].x, m[ 1 ].x, m[ 2 ].x );
	tmp[ 1 ] = vec3( m[ 0 ].y, m[ 1 ].y, m[ 2 ].y );
	tmp[ 2 ] = vec3( m[ 0 ].z, m[ 1 ].z, m[ 2 ].z );
	return tmp;
}
bool isPerspectiveMatrix( mat4 m ) {
	return m[ 2 ][ 3 ] == - 1.0;
}
vec2 equirectUv( in vec3 dir ) {
	float u = atan( dir.z, dir.x ) * RECIPROCAL_PI2 + 0.5;
	float v = asin( clamp( dir.y, - 1.0, 1.0 ) ) * RECIPROCAL_PI + 0.5;
	return vec2( u, v );
}
vec3 BRDF_Lambert( const in vec3 diffuseColor ) {
	return RECIPROCAL_PI * diffuseColor;
}
vec3 F_Schlick( const in vec3 f0, const in float f90, const in float dotVH ) {
	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );
	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );
}
float F_Schlick( const in float f0, const in float f90, const in float dotVH ) {
	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );
	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );
} // validated`,$m=`#ifdef ENVMAP_TYPE_CUBE_UV
	#define cubeUV_minMipLevel 4.0
	#define cubeUV_minTileSize 16.0
	float getFace( vec3 direction ) {
		vec3 absDirection = abs( direction );
		float face = - 1.0;
		if ( absDirection.x > absDirection.z ) {
			if ( absDirection.x > absDirection.y )
				face = direction.x > 0.0 ? 0.0 : 3.0;
			else
				face = direction.y > 0.0 ? 1.0 : 4.0;
		} else {
			if ( absDirection.z > absDirection.y )
				face = direction.z > 0.0 ? 2.0 : 5.0;
			else
				face = direction.y > 0.0 ? 1.0 : 4.0;
		}
		return face;
	}
	vec2 getUV( vec3 direction, float face ) {
		vec2 uv;
		if ( face == 0.0 ) {
			uv = vec2( direction.z, direction.y ) / abs( direction.x );
		} else if ( face == 1.0 ) {
			uv = vec2( - direction.x, - direction.z ) / abs( direction.y );
		} else if ( face == 2.0 ) {
			uv = vec2( - direction.x, direction.y ) / abs( direction.z );
		} else if ( face == 3.0 ) {
			uv = vec2( - direction.z, direction.y ) / abs( direction.x );
		} else if ( face == 4.0 ) {
			uv = vec2( - direction.x, direction.z ) / abs( direction.y );
		} else {
			uv = vec2( direction.x, direction.y ) / abs( direction.z );
		}
		return 0.5 * ( uv + 1.0 );
	}
	vec3 bilinearCubeUV( sampler2D envMap, vec3 direction, float mipInt ) {
		float face = getFace( direction );
		float filterInt = max( cubeUV_minMipLevel - mipInt, 0.0 );
		mipInt = max( mipInt, cubeUV_minMipLevel );
		float faceSize = exp2( mipInt );
		highp vec2 uv = getUV( direction, face ) * ( faceSize - 2.0 ) + 1.0;
		if ( face > 2.0 ) {
			uv.y += faceSize;
			face -= 3.0;
		}
		uv.x += face * faceSize;
		uv.x += filterInt * 3.0 * cubeUV_minTileSize;
		uv.y += 4.0 * ( exp2( CUBEUV_MAX_MIP ) - faceSize );
		uv.x *= CUBEUV_TEXEL_WIDTH;
		uv.y *= CUBEUV_TEXEL_HEIGHT;
		#ifdef texture2DGradEXT
			return texture2DGradEXT( envMap, uv, vec2( 0.0 ), vec2( 0.0 ) ).rgb;
		#else
			return texture2D( envMap, uv ).rgb;
		#endif
	}
	#define cubeUV_r0 1.0
	#define cubeUV_m0 - 2.0
	#define cubeUV_r1 0.8
	#define cubeUV_m1 - 1.0
	#define cubeUV_r4 0.4
	#define cubeUV_m4 2.0
	#define cubeUV_r5 0.305
	#define cubeUV_m5 3.0
	#define cubeUV_r6 0.21
	#define cubeUV_m6 4.0
	float roughnessToMip( float roughness ) {
		float mip = 0.0;
		if ( roughness >= cubeUV_r1 ) {
			mip = ( cubeUV_r0 - roughness ) * ( cubeUV_m1 - cubeUV_m0 ) / ( cubeUV_r0 - cubeUV_r1 ) + cubeUV_m0;
		} else if ( roughness >= cubeUV_r4 ) {
			mip = ( cubeUV_r1 - roughness ) * ( cubeUV_m4 - cubeUV_m1 ) / ( cubeUV_r1 - cubeUV_r4 ) + cubeUV_m1;
		} else if ( roughness >= cubeUV_r5 ) {
			mip = ( cubeUV_r4 - roughness ) * ( cubeUV_m5 - cubeUV_m4 ) / ( cubeUV_r4 - cubeUV_r5 ) + cubeUV_m4;
		} else if ( roughness >= cubeUV_r6 ) {
			mip = ( cubeUV_r5 - roughness ) * ( cubeUV_m6 - cubeUV_m5 ) / ( cubeUV_r5 - cubeUV_r6 ) + cubeUV_m5;
		} else {
			mip = - 2.0 * log2( 1.16 * roughness );		}
		return mip;
	}
	vec4 textureCubeUV( sampler2D envMap, vec3 sampleDir, float roughness ) {
		float mip = clamp( roughnessToMip( roughness ), cubeUV_m0, CUBEUV_MAX_MIP );
		float mipF = fract( mip );
		float mipInt = floor( mip );
		vec3 color0 = bilinearCubeUV( envMap, sampleDir, mipInt );
		if ( mipF == 0.0 ) {
			return vec4( color0, 1.0 );
		} else {
			vec3 color1 = bilinearCubeUV( envMap, sampleDir, mipInt + 1.0 );
			return vec4( mix( color0, color1, mipF ), 1.0 );
		}
	}
#endif`,Ym=`vec3 transformedNormal = objectNormal;
#ifdef USE_TANGENT
	vec3 transformedTangent = objectTangent;
#endif
#ifdef USE_BATCHING
	mat3 bm = mat3( batchingMatrix );
	transformedNormal /= vec3( dot( bm[ 0 ], bm[ 0 ] ), dot( bm[ 1 ], bm[ 1 ] ), dot( bm[ 2 ], bm[ 2 ] ) );
	transformedNormal = bm * transformedNormal;
	#ifdef USE_TANGENT
		transformedTangent = bm * transformedTangent;
	#endif
#endif
#ifdef USE_INSTANCING
	mat3 im = mat3( instanceMatrix );
	transformedNormal /= vec3( dot( im[ 0 ], im[ 0 ] ), dot( im[ 1 ], im[ 1 ] ), dot( im[ 2 ], im[ 2 ] ) );
	transformedNormal = im * transformedNormal;
	#ifdef USE_TANGENT
		transformedTangent = im * transformedTangent;
	#endif
#endif
transformedNormal = normalMatrix * transformedNormal;
#ifdef FLIP_SIDED
	transformedNormal = - transformedNormal;
#endif
#ifdef USE_TANGENT
	transformedTangent = ( modelViewMatrix * vec4( transformedTangent, 0.0 ) ).xyz;
	#ifdef FLIP_SIDED
		transformedTangent = - transformedTangent;
	#endif
#endif`,jm=`#ifdef USE_DISPLACEMENTMAP
	uniform sampler2D displacementMap;
	uniform float displacementScale;
	uniform float displacementBias;
#endif`,Zm=`#ifdef USE_DISPLACEMENTMAP
	transformed += normalize( objectNormal ) * ( texture2D( displacementMap, vDisplacementMapUv ).x * displacementScale + displacementBias );
#endif`,Jm=`#ifdef USE_EMISSIVEMAP
	vec4 emissiveColor = texture2D( emissiveMap, vEmissiveMapUv );
	#ifdef DECODE_VIDEO_TEXTURE_EMISSIVE
		emissiveColor = sRGBTransferEOTF( emissiveColor );
	#endif
	totalEmissiveRadiance *= emissiveColor.rgb;
#endif`,Qm=`#ifdef USE_EMISSIVEMAP
	uniform sampler2D emissiveMap;
#endif`,e0="gl_FragColor = linearToOutputTexel( gl_FragColor );",t0=`vec4 LinearTransferOETF( in vec4 value ) {
	return value;
}
vec4 sRGBTransferEOTF( in vec4 value ) {
	return vec4( mix( pow( value.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), value.rgb * 0.0773993808, vec3( lessThanEqual( value.rgb, vec3( 0.04045 ) ) ) ), value.a );
}
vec4 sRGBTransferOETF( in vec4 value ) {
	return vec4( mix( pow( value.rgb, vec3( 0.41666 ) ) * 1.055 - vec3( 0.055 ), value.rgb * 12.92, vec3( lessThanEqual( value.rgb, vec3( 0.0031308 ) ) ) ), value.a );
}`,n0=`#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vec3 cameraToFrag;
		if ( isOrthographic ) {
			cameraToFrag = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToFrag = normalize( vWorldPosition - cameraPosition );
		}
		vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vec3 reflectVec = reflect( cameraToFrag, worldNormal );
		#else
			vec3 reflectVec = refract( cameraToFrag, worldNormal, refractionRatio );
		#endif
	#else
		vec3 reflectVec = vReflect;
	#endif
	#ifdef ENVMAP_TYPE_CUBE
		vec4 envColor = textureCube( envMap, envMapRotation * vec3( flipEnvMap * reflectVec.x, reflectVec.yz ) );
	#else
		vec4 envColor = vec4( 0.0 );
	#endif
	#ifdef ENVMAP_BLENDING_MULTIPLY
		outgoingLight = mix( outgoingLight, outgoingLight * envColor.xyz, specularStrength * reflectivity );
	#elif defined( ENVMAP_BLENDING_MIX )
		outgoingLight = mix( outgoingLight, envColor.xyz, specularStrength * reflectivity );
	#elif defined( ENVMAP_BLENDING_ADD )
		outgoingLight += envColor.xyz * specularStrength * reflectivity;
	#endif
#endif`,i0=`#ifdef USE_ENVMAP
	uniform float envMapIntensity;
	uniform float flipEnvMap;
	uniform mat3 envMapRotation;
	#ifdef ENVMAP_TYPE_CUBE
		uniform samplerCube envMap;
	#else
		uniform sampler2D envMap;
	#endif
	
#endif`,s0=`#ifdef USE_ENVMAP
	uniform float reflectivity;
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		varying vec3 vWorldPosition;
		uniform float refractionRatio;
	#else
		varying vec3 vReflect;
	#endif
#endif`,r0=`#ifdef USE_ENVMAP
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		
		varying vec3 vWorldPosition;
	#else
		varying vec3 vReflect;
		uniform float refractionRatio;
	#endif
#endif`,o0=`#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vWorldPosition = worldPosition.xyz;
	#else
		vec3 cameraToVertex;
		if ( isOrthographic ) {
			cameraToVertex = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToVertex = normalize( worldPosition.xyz - cameraPosition );
		}
		vec3 worldNormal = inverseTransformDirection( transformedNormal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vReflect = reflect( cameraToVertex, worldNormal );
		#else
			vReflect = refract( cameraToVertex, worldNormal, refractionRatio );
		#endif
	#endif
#endif`,a0=`#ifdef USE_FOG
	vFogDepth = - mvPosition.z;
#endif`,l0=`#ifdef USE_FOG
	varying float vFogDepth;
#endif`,c0=`#ifdef USE_FOG
	#ifdef FOG_EXP2
		float fogFactor = 1.0 - exp( - fogDensity * fogDensity * vFogDepth * vFogDepth );
	#else
		float fogFactor = smoothstep( fogNear, fogFar, vFogDepth );
	#endif
	gl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );
#endif`,u0=`#ifdef USE_FOG
	uniform vec3 fogColor;
	varying float vFogDepth;
	#ifdef FOG_EXP2
		uniform float fogDensity;
	#else
		uniform float fogNear;
		uniform float fogFar;
	#endif
#endif`,h0=`#ifdef USE_GRADIENTMAP
	uniform sampler2D gradientMap;
#endif
vec3 getGradientIrradiance( vec3 normal, vec3 lightDirection ) {
	float dotNL = dot( normal, lightDirection );
	vec2 coord = vec2( dotNL * 0.5 + 0.5, 0.0 );
	#ifdef USE_GRADIENTMAP
		return vec3( texture2D( gradientMap, coord ).r );
	#else
		vec2 fw = fwidth( coord ) * 0.5;
		return mix( vec3( 0.7 ), vec3( 1.0 ), smoothstep( 0.7 - fw.x, 0.7 + fw.x, coord.x ) );
	#endif
}`,f0=`#ifdef USE_LIGHTMAP
	uniform sampler2D lightMap;
	uniform float lightMapIntensity;
#endif`,d0=`LambertMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularStrength = specularStrength;`,p0=`varying vec3 vViewPosition;
struct LambertMaterial {
	vec3 diffuseColor;
	float specularStrength;
};
void RE_Direct_Lambert( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Lambert( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_Lambert
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Lambert`,m0=`uniform bool receiveShadow;
uniform vec3 ambientLightColor;
#if defined( USE_LIGHT_PROBES )
	uniform vec3 lightProbe[ 9 ];
#endif
vec3 shGetIrradianceAt( in vec3 normal, in vec3 shCoefficients[ 9 ] ) {
	float x = normal.x, y = normal.y, z = normal.z;
	vec3 result = shCoefficients[ 0 ] * 0.886227;
	result += shCoefficients[ 1 ] * 2.0 * 0.511664 * y;
	result += shCoefficients[ 2 ] * 2.0 * 0.511664 * z;
	result += shCoefficients[ 3 ] * 2.0 * 0.511664 * x;
	result += shCoefficients[ 4 ] * 2.0 * 0.429043 * x * y;
	result += shCoefficients[ 5 ] * 2.0 * 0.429043 * y * z;
	result += shCoefficients[ 6 ] * ( 0.743125 * z * z - 0.247708 );
	result += shCoefficients[ 7 ] * 2.0 * 0.429043 * x * z;
	result += shCoefficients[ 8 ] * 0.429043 * ( x * x - y * y );
	return result;
}
vec3 getLightProbeIrradiance( const in vec3 lightProbe[ 9 ], const in vec3 normal ) {
	vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
	vec3 irradiance = shGetIrradianceAt( worldNormal, lightProbe );
	return irradiance;
}
vec3 getAmbientLightIrradiance( const in vec3 ambientLightColor ) {
	vec3 irradiance = ambientLightColor;
	return irradiance;
}
float getDistanceAttenuation( const in float lightDistance, const in float cutoffDistance, const in float decayExponent ) {
	float distanceFalloff = 1.0 / max( pow( lightDistance, decayExponent ), 0.01 );
	if ( cutoffDistance > 0.0 ) {
		distanceFalloff *= pow2( saturate( 1.0 - pow4( lightDistance / cutoffDistance ) ) );
	}
	return distanceFalloff;
}
float getSpotAttenuation( const in float coneCosine, const in float penumbraCosine, const in float angleCosine ) {
	return smoothstep( coneCosine, penumbraCosine, angleCosine );
}
#if NUM_DIR_LIGHTS > 0
	struct DirectionalLight {
		vec3 direction;
		vec3 color;
	};
	uniform DirectionalLight directionalLights[ NUM_DIR_LIGHTS ];
	void getDirectionalLightInfo( const in DirectionalLight directionalLight, out IncidentLight light ) {
		light.color = directionalLight.color;
		light.direction = directionalLight.direction;
		light.visible = true;
	}
#endif
#if NUM_POINT_LIGHTS > 0
	struct PointLight {
		vec3 position;
		vec3 color;
		float distance;
		float decay;
	};
	uniform PointLight pointLights[ NUM_POINT_LIGHTS ];
	void getPointLightInfo( const in PointLight pointLight, const in vec3 geometryPosition, out IncidentLight light ) {
		vec3 lVector = pointLight.position - geometryPosition;
		light.direction = normalize( lVector );
		float lightDistance = length( lVector );
		light.color = pointLight.color;
		light.color *= getDistanceAttenuation( lightDistance, pointLight.distance, pointLight.decay );
		light.visible = ( light.color != vec3( 0.0 ) );
	}
#endif
#if NUM_SPOT_LIGHTS > 0
	struct SpotLight {
		vec3 position;
		vec3 direction;
		vec3 color;
		float distance;
		float decay;
		float coneCos;
		float penumbraCos;
	};
	uniform SpotLight spotLights[ NUM_SPOT_LIGHTS ];
	void getSpotLightInfo( const in SpotLight spotLight, const in vec3 geometryPosition, out IncidentLight light ) {
		vec3 lVector = spotLight.position - geometryPosition;
		light.direction = normalize( lVector );
		float angleCos = dot( light.direction, spotLight.direction );
		float spotAttenuation = getSpotAttenuation( spotLight.coneCos, spotLight.penumbraCos, angleCos );
		if ( spotAttenuation > 0.0 ) {
			float lightDistance = length( lVector );
			light.color = spotLight.color * spotAttenuation;
			light.color *= getDistanceAttenuation( lightDistance, spotLight.distance, spotLight.decay );
			light.visible = ( light.color != vec3( 0.0 ) );
		} else {
			light.color = vec3( 0.0 );
			light.visible = false;
		}
	}
#endif
#if NUM_RECT_AREA_LIGHTS > 0
	struct RectAreaLight {
		vec3 color;
		vec3 position;
		vec3 halfWidth;
		vec3 halfHeight;
	};
	uniform sampler2D ltc_1;	uniform sampler2D ltc_2;
	uniform RectAreaLight rectAreaLights[ NUM_RECT_AREA_LIGHTS ];
#endif
#if NUM_HEMI_LIGHTS > 0
	struct HemisphereLight {
		vec3 direction;
		vec3 skyColor;
		vec3 groundColor;
	};
	uniform HemisphereLight hemisphereLights[ NUM_HEMI_LIGHTS ];
	vec3 getHemisphereLightIrradiance( const in HemisphereLight hemiLight, const in vec3 normal ) {
		float dotNL = dot( normal, hemiLight.direction );
		float hemiDiffuseWeight = 0.5 * dotNL + 0.5;
		vec3 irradiance = mix( hemiLight.groundColor, hemiLight.skyColor, hemiDiffuseWeight );
		return irradiance;
	}
#endif`,g0=`#ifdef USE_ENVMAP
	vec3 getIBLIrradiance( const in vec3 normal ) {
		#ifdef ENVMAP_TYPE_CUBE_UV
			vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
			vec4 envMapColor = textureCubeUV( envMap, envMapRotation * worldNormal, 1.0 );
			return PI * envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	vec3 getIBLRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness ) {
		#ifdef ENVMAP_TYPE_CUBE_UV
			vec3 reflectVec = reflect( - viewDir, normal );
			reflectVec = normalize( mix( reflectVec, normal, roughness * roughness) );
			reflectVec = inverseTransformDirection( reflectVec, viewMatrix );
			vec4 envMapColor = textureCubeUV( envMap, envMapRotation * reflectVec, roughness );
			return envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	#ifdef USE_ANISOTROPY
		vec3 getIBLAnisotropyRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness, const in vec3 bitangent, const in float anisotropy ) {
			#ifdef ENVMAP_TYPE_CUBE_UV
				vec3 bentNormal = cross( bitangent, viewDir );
				bentNormal = normalize( cross( bentNormal, bitangent ) );
				bentNormal = normalize( mix( bentNormal, normal, pow2( pow2( 1.0 - anisotropy * ( 1.0 - roughness ) ) ) ) );
				return getIBLRadiance( viewDir, bentNormal, roughness );
			#else
				return vec3( 0.0 );
			#endif
		}
	#endif
#endif`,v0=`ToonMaterial material;
material.diffuseColor = diffuseColor.rgb;`,x0=`varying vec3 vViewPosition;
struct ToonMaterial {
	vec3 diffuseColor;
};
void RE_Direct_Toon( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {
	vec3 irradiance = getGradientIrradiance( geometryNormal, directLight.direction ) * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Toon( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_Toon
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Toon`,_0=`BlinnPhongMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularColor = specular;
material.specularShininess = shininess;
material.specularStrength = specularStrength;`,y0=`varying vec3 vViewPosition;
struct BlinnPhongMaterial {
	vec3 diffuseColor;
	vec3 specularColor;
	float specularShininess;
	float specularStrength;
};
void RE_Direct_BlinnPhong( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
	reflectedLight.directSpecular += irradiance * BRDF_BlinnPhong( directLight.direction, geometryViewDir, geometryNormal, material.specularColor, material.specularShininess ) * material.specularStrength;
}
void RE_IndirectDiffuse_BlinnPhong( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_BlinnPhong
#define RE_IndirectDiffuse		RE_IndirectDiffuse_BlinnPhong`,M0=`PhysicalMaterial material;
material.diffuseColor = diffuseColor.rgb * ( 1.0 - metalnessFactor );
vec3 dxy = max( abs( dFdx( nonPerturbedNormal ) ), abs( dFdy( nonPerturbedNormal ) ) );
float geometryRoughness = max( max( dxy.x, dxy.y ), dxy.z );
material.roughness = max( roughnessFactor, 0.0525 );material.roughness += geometryRoughness;
material.roughness = min( material.roughness, 1.0 );
#ifdef IOR
	material.ior = ior;
	#ifdef USE_SPECULAR
		float specularIntensityFactor = specularIntensity;
		vec3 specularColorFactor = specularColor;
		#ifdef USE_SPECULAR_COLORMAP
			specularColorFactor *= texture2D( specularColorMap, vSpecularColorMapUv ).rgb;
		#endif
		#ifdef USE_SPECULAR_INTENSITYMAP
			specularIntensityFactor *= texture2D( specularIntensityMap, vSpecularIntensityMapUv ).a;
		#endif
		material.specularF90 = mix( specularIntensityFactor, 1.0, metalnessFactor );
	#else
		float specularIntensityFactor = 1.0;
		vec3 specularColorFactor = vec3( 1.0 );
		material.specularF90 = 1.0;
	#endif
	material.specularColor = mix( min( pow2( ( material.ior - 1.0 ) / ( material.ior + 1.0 ) ) * specularColorFactor, vec3( 1.0 ) ) * specularIntensityFactor, diffuseColor.rgb, metalnessFactor );
#else
	material.specularColor = mix( vec3( 0.04 ), diffuseColor.rgb, metalnessFactor );
	material.specularF90 = 1.0;
#endif
#ifdef USE_CLEARCOAT
	material.clearcoat = clearcoat;
	material.clearcoatRoughness = clearcoatRoughness;
	material.clearcoatF0 = vec3( 0.04 );
	material.clearcoatF90 = 1.0;
	#ifdef USE_CLEARCOATMAP
		material.clearcoat *= texture2D( clearcoatMap, vClearcoatMapUv ).x;
	#endif
	#ifdef USE_CLEARCOAT_ROUGHNESSMAP
		material.clearcoatRoughness *= texture2D( clearcoatRoughnessMap, vClearcoatRoughnessMapUv ).y;
	#endif
	material.clearcoat = saturate( material.clearcoat );	material.clearcoatRoughness = max( material.clearcoatRoughness, 0.0525 );
	material.clearcoatRoughness += geometryRoughness;
	material.clearcoatRoughness = min( material.clearcoatRoughness, 1.0 );
#endif
#ifdef USE_DISPERSION
	material.dispersion = dispersion;
#endif
#ifdef USE_IRIDESCENCE
	material.iridescence = iridescence;
	material.iridescenceIOR = iridescenceIOR;
	#ifdef USE_IRIDESCENCEMAP
		material.iridescence *= texture2D( iridescenceMap, vIridescenceMapUv ).r;
	#endif
	#ifdef USE_IRIDESCENCE_THICKNESSMAP
		material.iridescenceThickness = (iridescenceThicknessMaximum - iridescenceThicknessMinimum) * texture2D( iridescenceThicknessMap, vIridescenceThicknessMapUv ).g + iridescenceThicknessMinimum;
	#else
		material.iridescenceThickness = iridescenceThicknessMaximum;
	#endif
#endif
#ifdef USE_SHEEN
	material.sheenColor = sheenColor;
	#ifdef USE_SHEEN_COLORMAP
		material.sheenColor *= texture2D( sheenColorMap, vSheenColorMapUv ).rgb;
	#endif
	material.sheenRoughness = clamp( sheenRoughness, 0.07, 1.0 );
	#ifdef USE_SHEEN_ROUGHNESSMAP
		material.sheenRoughness *= texture2D( sheenRoughnessMap, vSheenRoughnessMapUv ).a;
	#endif
#endif
#ifdef USE_ANISOTROPY
	#ifdef USE_ANISOTROPYMAP
		mat2 anisotropyMat = mat2( anisotropyVector.x, anisotropyVector.y, - anisotropyVector.y, anisotropyVector.x );
		vec3 anisotropyPolar = texture2D( anisotropyMap, vAnisotropyMapUv ).rgb;
		vec2 anisotropyV = anisotropyMat * normalize( 2.0 * anisotropyPolar.rg - vec2( 1.0 ) ) * anisotropyPolar.b;
	#else
		vec2 anisotropyV = anisotropyVector;
	#endif
	material.anisotropy = length( anisotropyV );
	if( material.anisotropy == 0.0 ) {
		anisotropyV = vec2( 1.0, 0.0 );
	} else {
		anisotropyV /= material.anisotropy;
		material.anisotropy = saturate( material.anisotropy );
	}
	material.alphaT = mix( pow2( material.roughness ), 1.0, pow2( material.anisotropy ) );
	material.anisotropyT = tbn[ 0 ] * anisotropyV.x + tbn[ 1 ] * anisotropyV.y;
	material.anisotropyB = tbn[ 1 ] * anisotropyV.x - tbn[ 0 ] * anisotropyV.y;
#endif`,S0=`struct PhysicalMaterial {
	vec3 diffuseColor;
	float roughness;
	vec3 specularColor;
	float specularF90;
	float dispersion;
	#ifdef USE_CLEARCOAT
		float clearcoat;
		float clearcoatRoughness;
		vec3 clearcoatF0;
		float clearcoatF90;
	#endif
	#ifdef USE_IRIDESCENCE
		float iridescence;
		float iridescenceIOR;
		float iridescenceThickness;
		vec3 iridescenceFresnel;
		vec3 iridescenceF0;
	#endif
	#ifdef USE_SHEEN
		vec3 sheenColor;
		float sheenRoughness;
	#endif
	#ifdef IOR
		float ior;
	#endif
	#ifdef USE_TRANSMISSION
		float transmission;
		float transmissionAlpha;
		float thickness;
		float attenuationDistance;
		vec3 attenuationColor;
	#endif
	#ifdef USE_ANISOTROPY
		float anisotropy;
		float alphaT;
		vec3 anisotropyT;
		vec3 anisotropyB;
	#endif
};
vec3 clearcoatSpecularDirect = vec3( 0.0 );
vec3 clearcoatSpecularIndirect = vec3( 0.0 );
vec3 sheenSpecularDirect = vec3( 0.0 );
vec3 sheenSpecularIndirect = vec3(0.0 );
vec3 Schlick_to_F0( const in vec3 f, const in float f90, const in float dotVH ) {
    float x = clamp( 1.0 - dotVH, 0.0, 1.0 );
    float x2 = x * x;
    float x5 = clamp( x * x2 * x2, 0.0, 0.9999 );
    return ( f - vec3( f90 ) * x5 ) / ( 1.0 - x5 );
}
float V_GGX_SmithCorrelated( const in float alpha, const in float dotNL, const in float dotNV ) {
	float a2 = pow2( alpha );
	float gv = dotNL * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNV ) );
	float gl = dotNV * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNL ) );
	return 0.5 / max( gv + gl, EPSILON );
}
float D_GGX( const in float alpha, const in float dotNH ) {
	float a2 = pow2( alpha );
	float denom = pow2( dotNH ) * ( a2 - 1.0 ) + 1.0;
	return RECIPROCAL_PI * a2 / pow2( denom );
}
#ifdef USE_ANISOTROPY
	float V_GGX_SmithCorrelated_Anisotropic( const in float alphaT, const in float alphaB, const in float dotTV, const in float dotBV, const in float dotTL, const in float dotBL, const in float dotNV, const in float dotNL ) {
		float gv = dotNL * length( vec3( alphaT * dotTV, alphaB * dotBV, dotNV ) );
		float gl = dotNV * length( vec3( alphaT * dotTL, alphaB * dotBL, dotNL ) );
		float v = 0.5 / ( gv + gl );
		return saturate(v);
	}
	float D_GGX_Anisotropic( const in float alphaT, const in float alphaB, const in float dotNH, const in float dotTH, const in float dotBH ) {
		float a2 = alphaT * alphaB;
		highp vec3 v = vec3( alphaB * dotTH, alphaT * dotBH, a2 * dotNH );
		highp float v2 = dot( v, v );
		float w2 = a2 / v2;
		return RECIPROCAL_PI * a2 * pow2 ( w2 );
	}
#endif
#ifdef USE_CLEARCOAT
	vec3 BRDF_GGX_Clearcoat( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material) {
		vec3 f0 = material.clearcoatF0;
		float f90 = material.clearcoatF90;
		float roughness = material.clearcoatRoughness;
		float alpha = pow2( roughness );
		vec3 halfDir = normalize( lightDir + viewDir );
		float dotNL = saturate( dot( normal, lightDir ) );
		float dotNV = saturate( dot( normal, viewDir ) );
		float dotNH = saturate( dot( normal, halfDir ) );
		float dotVH = saturate( dot( viewDir, halfDir ) );
		vec3 F = F_Schlick( f0, f90, dotVH );
		float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );
		float D = D_GGX( alpha, dotNH );
		return F * ( V * D );
	}
#endif
vec3 BRDF_GGX( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material ) {
	vec3 f0 = material.specularColor;
	float f90 = material.specularF90;
	float roughness = material.roughness;
	float alpha = pow2( roughness );
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	float dotNH = saturate( dot( normal, halfDir ) );
	float dotVH = saturate( dot( viewDir, halfDir ) );
	vec3 F = F_Schlick( f0, f90, dotVH );
	#ifdef USE_IRIDESCENCE
		F = mix( F, material.iridescenceFresnel, material.iridescence );
	#endif
	#ifdef USE_ANISOTROPY
		float dotTL = dot( material.anisotropyT, lightDir );
		float dotTV = dot( material.anisotropyT, viewDir );
		float dotTH = dot( material.anisotropyT, halfDir );
		float dotBL = dot( material.anisotropyB, lightDir );
		float dotBV = dot( material.anisotropyB, viewDir );
		float dotBH = dot( material.anisotropyB, halfDir );
		float V = V_GGX_SmithCorrelated_Anisotropic( material.alphaT, alpha, dotTV, dotBV, dotTL, dotBL, dotNV, dotNL );
		float D = D_GGX_Anisotropic( material.alphaT, alpha, dotNH, dotTH, dotBH );
	#else
		float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );
		float D = D_GGX( alpha, dotNH );
	#endif
	return F * ( V * D );
}
vec2 LTC_Uv( const in vec3 N, const in vec3 V, const in float roughness ) {
	const float LUT_SIZE = 64.0;
	const float LUT_SCALE = ( LUT_SIZE - 1.0 ) / LUT_SIZE;
	const float LUT_BIAS = 0.5 / LUT_SIZE;
	float dotNV = saturate( dot( N, V ) );
	vec2 uv = vec2( roughness, sqrt( 1.0 - dotNV ) );
	uv = uv * LUT_SCALE + LUT_BIAS;
	return uv;
}
float LTC_ClippedSphereFormFactor( const in vec3 f ) {
	float l = length( f );
	return max( ( l * l + f.z ) / ( l + 1.0 ), 0.0 );
}
vec3 LTC_EdgeVectorFormFactor( const in vec3 v1, const in vec3 v2 ) {
	float x = dot( v1, v2 );
	float y = abs( x );
	float a = 0.8543985 + ( 0.4965155 + 0.0145206 * y ) * y;
	float b = 3.4175940 + ( 4.1616724 + y ) * y;
	float v = a / b;
	float theta_sintheta = ( x > 0.0 ) ? v : 0.5 * inversesqrt( max( 1.0 - x * x, 1e-7 ) ) - v;
	return cross( v1, v2 ) * theta_sintheta;
}
vec3 LTC_Evaluate( const in vec3 N, const in vec3 V, const in vec3 P, const in mat3 mInv, const in vec3 rectCoords[ 4 ] ) {
	vec3 v1 = rectCoords[ 1 ] - rectCoords[ 0 ];
	vec3 v2 = rectCoords[ 3 ] - rectCoords[ 0 ];
	vec3 lightNormal = cross( v1, v2 );
	if( dot( lightNormal, P - rectCoords[ 0 ] ) < 0.0 ) return vec3( 0.0 );
	vec3 T1, T2;
	T1 = normalize( V - N * dot( V, N ) );
	T2 = - cross( N, T1 );
	mat3 mat = mInv * transposeMat3( mat3( T1, T2, N ) );
	vec3 coords[ 4 ];
	coords[ 0 ] = mat * ( rectCoords[ 0 ] - P );
	coords[ 1 ] = mat * ( rectCoords[ 1 ] - P );
	coords[ 2 ] = mat * ( rectCoords[ 2 ] - P );
	coords[ 3 ] = mat * ( rectCoords[ 3 ] - P );
	coords[ 0 ] = normalize( coords[ 0 ] );
	coords[ 1 ] = normalize( coords[ 1 ] );
	coords[ 2 ] = normalize( coords[ 2 ] );
	coords[ 3 ] = normalize( coords[ 3 ] );
	vec3 vectorFormFactor = vec3( 0.0 );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 0 ], coords[ 1 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 1 ], coords[ 2 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 2 ], coords[ 3 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 3 ], coords[ 0 ] );
	float result = LTC_ClippedSphereFormFactor( vectorFormFactor );
	return vec3( result );
}
#if defined( USE_SHEEN )
float D_Charlie( float roughness, float dotNH ) {
	float alpha = pow2( roughness );
	float invAlpha = 1.0 / alpha;
	float cos2h = dotNH * dotNH;
	float sin2h = max( 1.0 - cos2h, 0.0078125 );
	return ( 2.0 + invAlpha ) * pow( sin2h, invAlpha * 0.5 ) / ( 2.0 * PI );
}
float V_Neubelt( float dotNV, float dotNL ) {
	return saturate( 1.0 / ( 4.0 * ( dotNL + dotNV - dotNL * dotNV ) ) );
}
vec3 BRDF_Sheen( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, vec3 sheenColor, const in float sheenRoughness ) {
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	float dotNH = saturate( dot( normal, halfDir ) );
	float D = D_Charlie( sheenRoughness, dotNH );
	float V = V_Neubelt( dotNV, dotNL );
	return sheenColor * ( D * V );
}
#endif
float IBLSheenBRDF( const in vec3 normal, const in vec3 viewDir, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	float r2 = roughness * roughness;
	float a = roughness < 0.25 ? -339.2 * r2 + 161.4 * roughness - 25.9 : -8.48 * r2 + 14.3 * roughness - 9.95;
	float b = roughness < 0.25 ? 44.0 * r2 - 23.7 * roughness + 3.26 : 1.97 * r2 - 3.27 * roughness + 0.72;
	float DG = exp( a * dotNV + b ) + ( roughness < 0.25 ? 0.0 : 0.1 * ( roughness - 0.25 ) );
	return saturate( DG * RECIPROCAL_PI );
}
vec2 DFGApprox( const in vec3 normal, const in vec3 viewDir, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	const vec4 c0 = vec4( - 1, - 0.0275, - 0.572, 0.022 );
	const vec4 c1 = vec4( 1, 0.0425, 1.04, - 0.04 );
	vec4 r = roughness * c0 + c1;
	float a004 = min( r.x * r.x, exp2( - 9.28 * dotNV ) ) * r.x + r.y;
	vec2 fab = vec2( - 1.04, 1.04 ) * a004 + r.zw;
	return fab;
}
vec3 EnvironmentBRDF( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float roughness ) {
	vec2 fab = DFGApprox( normal, viewDir, roughness );
	return specularColor * fab.x + specularF90 * fab.y;
}
#ifdef USE_IRIDESCENCE
void computeMultiscatteringIridescence( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float iridescence, const in vec3 iridescenceF0, const in float roughness, inout vec3 singleScatter, inout vec3 multiScatter ) {
#else
void computeMultiscattering( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float roughness, inout vec3 singleScatter, inout vec3 multiScatter ) {
#endif
	vec2 fab = DFGApprox( normal, viewDir, roughness );
	#ifdef USE_IRIDESCENCE
		vec3 Fr = mix( specularColor, iridescenceF0, iridescence );
	#else
		vec3 Fr = specularColor;
	#endif
	vec3 FssEss = Fr * fab.x + specularF90 * fab.y;
	float Ess = fab.x + fab.y;
	float Ems = 1.0 - Ess;
	vec3 Favg = Fr + ( 1.0 - Fr ) * 0.047619;	vec3 Fms = FssEss * Favg / ( 1.0 - Ems * Favg );
	singleScatter += FssEss;
	multiScatter += Fms * Ems;
}
#if NUM_RECT_AREA_LIGHTS > 0
	void RE_Direct_RectArea_Physical( const in RectAreaLight rectAreaLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
		vec3 normal = geometryNormal;
		vec3 viewDir = geometryViewDir;
		vec3 position = geometryPosition;
		vec3 lightPos = rectAreaLight.position;
		vec3 halfWidth = rectAreaLight.halfWidth;
		vec3 halfHeight = rectAreaLight.halfHeight;
		vec3 lightColor = rectAreaLight.color;
		float roughness = material.roughness;
		vec3 rectCoords[ 4 ];
		rectCoords[ 0 ] = lightPos + halfWidth - halfHeight;		rectCoords[ 1 ] = lightPos - halfWidth - halfHeight;
		rectCoords[ 2 ] = lightPos - halfWidth + halfHeight;
		rectCoords[ 3 ] = lightPos + halfWidth + halfHeight;
		vec2 uv = LTC_Uv( normal, viewDir, roughness );
		vec4 t1 = texture2D( ltc_1, uv );
		vec4 t2 = texture2D( ltc_2, uv );
		mat3 mInv = mat3(
			vec3( t1.x, 0, t1.y ),
			vec3(    0, 1,    0 ),
			vec3( t1.z, 0, t1.w )
		);
		vec3 fresnel = ( material.specularColor * t2.x + ( vec3( 1.0 ) - material.specularColor ) * t2.y );
		reflectedLight.directSpecular += lightColor * fresnel * LTC_Evaluate( normal, viewDir, position, mInv, rectCoords );
		reflectedLight.directDiffuse += lightColor * material.diffuseColor * LTC_Evaluate( normal, viewDir, position, mat3( 1.0 ), rectCoords );
	}
#endif
void RE_Direct_Physical( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	#ifdef USE_CLEARCOAT
		float dotNLcc = saturate( dot( geometryClearcoatNormal, directLight.direction ) );
		vec3 ccIrradiance = dotNLcc * directLight.color;
		clearcoatSpecularDirect += ccIrradiance * BRDF_GGX_Clearcoat( directLight.direction, geometryViewDir, geometryClearcoatNormal, material );
	#endif
	#ifdef USE_SHEEN
		sheenSpecularDirect += irradiance * BRDF_Sheen( directLight.direction, geometryViewDir, geometryNormal, material.sheenColor, material.sheenRoughness );
	#endif
	reflectedLight.directSpecular += irradiance * BRDF_GGX( directLight.direction, geometryViewDir, geometryNormal, material );
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Physical( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectSpecular_Physical( const in vec3 radiance, const in vec3 irradiance, const in vec3 clearcoatRadiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight) {
	#ifdef USE_CLEARCOAT
		clearcoatSpecularIndirect += clearcoatRadiance * EnvironmentBRDF( geometryClearcoatNormal, geometryViewDir, material.clearcoatF0, material.clearcoatF90, material.clearcoatRoughness );
	#endif
	#ifdef USE_SHEEN
		sheenSpecularIndirect += irradiance * material.sheenColor * IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness );
	#endif
	vec3 singleScattering = vec3( 0.0 );
	vec3 multiScattering = vec3( 0.0 );
	vec3 cosineWeightedIrradiance = irradiance * RECIPROCAL_PI;
	#ifdef USE_IRIDESCENCE
		computeMultiscatteringIridescence( geometryNormal, geometryViewDir, material.specularColor, material.specularF90, material.iridescence, material.iridescenceFresnel, material.roughness, singleScattering, multiScattering );
	#else
		computeMultiscattering( geometryNormal, geometryViewDir, material.specularColor, material.specularF90, material.roughness, singleScattering, multiScattering );
	#endif
	vec3 totalScattering = singleScattering + multiScattering;
	vec3 diffuse = material.diffuseColor * ( 1.0 - max( max( totalScattering.r, totalScattering.g ), totalScattering.b ) );
	reflectedLight.indirectSpecular += radiance * singleScattering;
	reflectedLight.indirectSpecular += multiScattering * cosineWeightedIrradiance;
	reflectedLight.indirectDiffuse += diffuse * cosineWeightedIrradiance;
}
#define RE_Direct				RE_Direct_Physical
#define RE_Direct_RectArea		RE_Direct_RectArea_Physical
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Physical
#define RE_IndirectSpecular		RE_IndirectSpecular_Physical
float computeSpecularOcclusion( const in float dotNV, const in float ambientOcclusion, const in float roughness ) {
	return saturate( pow( dotNV + ambientOcclusion, exp2( - 16.0 * roughness - 1.0 ) ) - 1.0 + ambientOcclusion );
}`,b0=`
vec3 geometryPosition = - vViewPosition;
vec3 geometryNormal = normal;
vec3 geometryViewDir = ( isOrthographic ) ? vec3( 0, 0, 1 ) : normalize( vViewPosition );
vec3 geometryClearcoatNormal = vec3( 0.0 );
#ifdef USE_CLEARCOAT
	geometryClearcoatNormal = clearcoatNormal;
#endif
#ifdef USE_IRIDESCENCE
	float dotNVi = saturate( dot( normal, geometryViewDir ) );
	if ( material.iridescenceThickness == 0.0 ) {
		material.iridescence = 0.0;
	} else {
		material.iridescence = saturate( material.iridescence );
	}
	if ( material.iridescence > 0.0 ) {
		material.iridescenceFresnel = evalIridescence( 1.0, material.iridescenceIOR, dotNVi, material.iridescenceThickness, material.specularColor );
		material.iridescenceF0 = Schlick_to_F0( material.iridescenceFresnel, 1.0, dotNVi );
	}
#endif
IncidentLight directLight;
#if ( NUM_POINT_LIGHTS > 0 ) && defined( RE_Direct )
	PointLight pointLight;
	#if defined( USE_SHADOWMAP ) && NUM_POINT_LIGHT_SHADOWS > 0
	PointLightShadow pointLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHTS; i ++ ) {
		pointLight = pointLights[ i ];
		getPointLightInfo( pointLight, geometryPosition, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_POINT_LIGHT_SHADOWS )
		pointLightShadow = pointLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getPointShadow( pointShadowMap[ i ], pointLightShadow.shadowMapSize, pointLightShadow.shadowIntensity, pointLightShadow.shadowBias, pointLightShadow.shadowRadius, vPointShadowCoord[ i ], pointLightShadow.shadowCameraNear, pointLightShadow.shadowCameraFar ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_SPOT_LIGHTS > 0 ) && defined( RE_Direct )
	SpotLight spotLight;
	vec4 spotColor;
	vec3 spotLightCoord;
	bool inSpotLightMap;
	#if defined( USE_SHADOWMAP ) && NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHTS; i ++ ) {
		spotLight = spotLights[ i ];
		getSpotLightInfo( spotLight, geometryPosition, directLight );
		#if ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )
		#define SPOT_LIGHT_MAP_INDEX UNROLLED_LOOP_INDEX
		#elif ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		#define SPOT_LIGHT_MAP_INDEX NUM_SPOT_LIGHT_MAPS
		#else
		#define SPOT_LIGHT_MAP_INDEX ( UNROLLED_LOOP_INDEX - NUM_SPOT_LIGHT_SHADOWS + NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )
		#endif
		#if ( SPOT_LIGHT_MAP_INDEX < NUM_SPOT_LIGHT_MAPS )
			spotLightCoord = vSpotLightCoord[ i ].xyz / vSpotLightCoord[ i ].w;
			inSpotLightMap = all( lessThan( abs( spotLightCoord * 2. - 1. ), vec3( 1.0 ) ) );
			spotColor = texture2D( spotLightMap[ SPOT_LIGHT_MAP_INDEX ], spotLightCoord.xy );
			directLight.color = inSpotLightMap ? directLight.color * spotColor.rgb : directLight.color;
		#endif
		#undef SPOT_LIGHT_MAP_INDEX
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		spotLightShadow = spotLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( spotShadowMap[ i ], spotLightShadow.shadowMapSize, spotLightShadow.shadowIntensity, spotLightShadow.shadowBias, spotLightShadow.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_DIR_LIGHTS > 0 ) && defined( RE_Direct )
	DirectionalLight directionalLight;
	#if defined( USE_SHADOWMAP ) && NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHTS; i ++ ) {
		directionalLight = directionalLights[ i ];
		getDirectionalLightInfo( directionalLight, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_DIR_LIGHT_SHADOWS )
		directionalLightShadow = directionalLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( directionalShadowMap[ i ], directionalLightShadow.shadowMapSize, directionalLightShadow.shadowIntensity, directionalLightShadow.shadowBias, directionalLightShadow.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_RECT_AREA_LIGHTS > 0 ) && defined( RE_Direct_RectArea )
	RectAreaLight rectAreaLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_RECT_AREA_LIGHTS; i ++ ) {
		rectAreaLight = rectAreaLights[ i ];
		RE_Direct_RectArea( rectAreaLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if defined( RE_IndirectDiffuse )
	vec3 iblIrradiance = vec3( 0.0 );
	vec3 irradiance = getAmbientLightIrradiance( ambientLightColor );
	#if defined( USE_LIGHT_PROBES )
		irradiance += getLightProbeIrradiance( lightProbe, geometryNormal );
	#endif
	#if ( NUM_HEMI_LIGHTS > 0 )
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_HEMI_LIGHTS; i ++ ) {
			irradiance += getHemisphereLightIrradiance( hemisphereLights[ i ], geometryNormal );
		}
		#pragma unroll_loop_end
	#endif
#endif
#if defined( RE_IndirectSpecular )
	vec3 radiance = vec3( 0.0 );
	vec3 clearcoatRadiance = vec3( 0.0 );
#endif`,T0=`#if defined( RE_IndirectDiffuse )
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
		vec3 lightMapIrradiance = lightMapTexel.rgb * lightMapIntensity;
		irradiance += lightMapIrradiance;
	#endif
	#if defined( USE_ENVMAP ) && defined( STANDARD ) && defined( ENVMAP_TYPE_CUBE_UV )
		iblIrradiance += getIBLIrradiance( geometryNormal );
	#endif
#endif
#if defined( USE_ENVMAP ) && defined( RE_IndirectSpecular )
	#ifdef USE_ANISOTROPY
		radiance += getIBLAnisotropyRadiance( geometryViewDir, geometryNormal, material.roughness, material.anisotropyB, material.anisotropy );
	#else
		radiance += getIBLRadiance( geometryViewDir, geometryNormal, material.roughness );
	#endif
	#ifdef USE_CLEARCOAT
		clearcoatRadiance += getIBLRadiance( geometryViewDir, geometryClearcoatNormal, material.clearcoatRoughness );
	#endif
#endif`,E0=`#if defined( RE_IndirectDiffuse )
	RE_IndirectDiffuse( irradiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif
#if defined( RE_IndirectSpecular )
	RE_IndirectSpecular( radiance, iblIrradiance, clearcoatRadiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif`,w0=`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	gl_FragDepth = vIsPerspective == 0.0 ? gl_FragCoord.z : log2( vFragDepth ) * logDepthBufFC * 0.5;
#endif`,A0=`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	uniform float logDepthBufFC;
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,R0=`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,C0=`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	vFragDepth = 1.0 + gl_Position.w;
	vIsPerspective = float( isPerspectiveMatrix( projectionMatrix ) );
#endif`,P0=`#ifdef USE_MAP
	vec4 sampledDiffuseColor = texture2D( map, vMapUv );
	#ifdef DECODE_VIDEO_TEXTURE
		sampledDiffuseColor = sRGBTransferEOTF( sampledDiffuseColor );
	#endif
	diffuseColor *= sampledDiffuseColor;
#endif`,L0=`#ifdef USE_MAP
	uniform sampler2D map;
#endif`,I0=`#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
	#if defined( USE_POINTS_UV )
		vec2 uv = vUv;
	#else
		vec2 uv = ( uvTransform * vec3( gl_PointCoord.x, 1.0 - gl_PointCoord.y, 1 ) ).xy;
	#endif
#endif
#ifdef USE_MAP
	diffuseColor *= texture2D( map, uv );
#endif
#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, uv ).g;
#endif`,D0=`#if defined( USE_POINTS_UV )
	varying vec2 vUv;
#else
	#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
		uniform mat3 uvTransform;
	#endif
#endif
#ifdef USE_MAP
	uniform sampler2D map;
#endif
#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,N0=`float metalnessFactor = metalness;
#ifdef USE_METALNESSMAP
	vec4 texelMetalness = texture2D( metalnessMap, vMetalnessMapUv );
	metalnessFactor *= texelMetalness.b;
#endif`,U0=`#ifdef USE_METALNESSMAP
	uniform sampler2D metalnessMap;
#endif`,F0=`#ifdef USE_INSTANCING_MORPH
	float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	float morphTargetBaseInfluence = texelFetch( morphTexture, ivec2( 0, gl_InstanceID ), 0 ).r;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		morphTargetInfluences[i] =  texelFetch( morphTexture, ivec2( i + 1, gl_InstanceID ), 0 ).r;
	}
#endif`,O0=`#if defined( USE_MORPHCOLORS )
	vColor *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		#if defined( USE_COLOR_ALPHA )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ) * morphTargetInfluences[ i ];
		#elif defined( USE_COLOR )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ).rgb * morphTargetInfluences[ i ];
		#endif
	}
#endif`,k0=`#ifdef USE_MORPHNORMALS
	objectNormal *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) objectNormal += getMorph( gl_VertexID, i, 1 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,B0=`#ifdef USE_MORPHTARGETS
	#ifndef USE_INSTANCING_MORPH
		uniform float morphTargetBaseInfluence;
		uniform float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	#endif
	uniform sampler2DArray morphTargetsTexture;
	uniform ivec2 morphTargetsTextureSize;
	vec4 getMorph( const in int vertexIndex, const in int morphTargetIndex, const in int offset ) {
		int texelIndex = vertexIndex * MORPHTARGETS_TEXTURE_STRIDE + offset;
		int y = texelIndex / morphTargetsTextureSize.x;
		int x = texelIndex - y * morphTargetsTextureSize.x;
		ivec3 morphUV = ivec3( x, y, morphTargetIndex );
		return texelFetch( morphTargetsTexture, morphUV, 0 );
	}
#endif`,z0=`#ifdef USE_MORPHTARGETS
	transformed *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) transformed += getMorph( gl_VertexID, i, 0 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,H0=`float faceDirection = gl_FrontFacing ? 1.0 : - 1.0;
#ifdef FLAT_SHADED
	vec3 fdx = dFdx( vViewPosition );
	vec3 fdy = dFdy( vViewPosition );
	vec3 normal = normalize( cross( fdx, fdy ) );
#else
	vec3 normal = normalize( vNormal );
	#ifdef DOUBLE_SIDED
		normal *= faceDirection;
	#endif
#endif
#if defined( USE_NORMALMAP_TANGENTSPACE ) || defined( USE_CLEARCOAT_NORMALMAP ) || defined( USE_ANISOTROPY )
	#ifdef USE_TANGENT
		mat3 tbn = mat3( normalize( vTangent ), normalize( vBitangent ), normal );
	#else
		mat3 tbn = getTangentFrame( - vViewPosition, normal,
		#if defined( USE_NORMALMAP )
			vNormalMapUv
		#elif defined( USE_CLEARCOAT_NORMALMAP )
			vClearcoatNormalMapUv
		#else
			vUv
		#endif
		);
	#endif
	#if defined( DOUBLE_SIDED ) && ! defined( FLAT_SHADED )
		tbn[0] *= faceDirection;
		tbn[1] *= faceDirection;
	#endif
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	#ifdef USE_TANGENT
		mat3 tbn2 = mat3( normalize( vTangent ), normalize( vBitangent ), normal );
	#else
		mat3 tbn2 = getTangentFrame( - vViewPosition, normal, vClearcoatNormalMapUv );
	#endif
	#if defined( DOUBLE_SIDED ) && ! defined( FLAT_SHADED )
		tbn2[0] *= faceDirection;
		tbn2[1] *= faceDirection;
	#endif
#endif
vec3 nonPerturbedNormal = normal;`,V0=`#ifdef USE_NORMALMAP_OBJECTSPACE
	normal = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0;
	#ifdef FLIP_SIDED
		normal = - normal;
	#endif
	#ifdef DOUBLE_SIDED
		normal = normal * faceDirection;
	#endif
	normal = normalize( normalMatrix * normal );
#elif defined( USE_NORMALMAP_TANGENTSPACE )
	vec3 mapN = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0;
	mapN.xy *= normalScale;
	normal = normalize( tbn * mapN );
#elif defined( USE_BUMPMAP )
	normal = perturbNormalArb( - vViewPosition, normal, dHdxy_fwd(), faceDirection );
#endif`,G0=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,W0=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,X0=`#ifndef FLAT_SHADED
	vNormal = normalize( transformedNormal );
	#ifdef USE_TANGENT
		vTangent = normalize( transformedTangent );
		vBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );
	#endif
#endif`,q0=`#ifdef USE_NORMALMAP
	uniform sampler2D normalMap;
	uniform vec2 normalScale;
#endif
#ifdef USE_NORMALMAP_OBJECTSPACE
	uniform mat3 normalMatrix;
#endif
#if ! defined ( USE_TANGENT ) && ( defined ( USE_NORMALMAP_TANGENTSPACE ) || defined ( USE_CLEARCOAT_NORMALMAP ) || defined( USE_ANISOTROPY ) )
	mat3 getTangentFrame( vec3 eye_pos, vec3 surf_norm, vec2 uv ) {
		vec3 q0 = dFdx( eye_pos.xyz );
		vec3 q1 = dFdy( eye_pos.xyz );
		vec2 st0 = dFdx( uv.st );
		vec2 st1 = dFdy( uv.st );
		vec3 N = surf_norm;
		vec3 q1perp = cross( q1, N );
		vec3 q0perp = cross( N, q0 );
		vec3 T = q1perp * st0.x + q0perp * st1.x;
		vec3 B = q1perp * st0.y + q0perp * st1.y;
		float det = max( dot( T, T ), dot( B, B ) );
		float scale = ( det == 0.0 ) ? 0.0 : inversesqrt( det );
		return mat3( T * scale, B * scale, N );
	}
#endif`,K0=`#ifdef USE_CLEARCOAT
	vec3 clearcoatNormal = nonPerturbedNormal;
#endif`,$0=`#ifdef USE_CLEARCOAT_NORMALMAP
	vec3 clearcoatMapN = texture2D( clearcoatNormalMap, vClearcoatNormalMapUv ).xyz * 2.0 - 1.0;
	clearcoatMapN.xy *= clearcoatNormalScale;
	clearcoatNormal = normalize( tbn2 * clearcoatMapN );
#endif`,Y0=`#ifdef USE_CLEARCOATMAP
	uniform sampler2D clearcoatMap;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform sampler2D clearcoatNormalMap;
	uniform vec2 clearcoatNormalScale;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform sampler2D clearcoatRoughnessMap;
#endif`,j0=`#ifdef USE_IRIDESCENCEMAP
	uniform sampler2D iridescenceMap;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform sampler2D iridescenceThicknessMap;
#endif`,Z0=`#ifdef OPAQUE
diffuseColor.a = 1.0;
#endif
#ifdef USE_TRANSMISSION
diffuseColor.a *= material.transmissionAlpha;
#endif
gl_FragColor = vec4( outgoingLight, diffuseColor.a );`,J0=`vec3 packNormalToRGB( const in vec3 normal ) {
	return normalize( normal ) * 0.5 + 0.5;
}
vec3 unpackRGBToNormal( const in vec3 rgb ) {
	return 2.0 * rgb.xyz - 1.0;
}
const float PackUpscale = 256. / 255.;const float UnpackDownscale = 255. / 256.;const float ShiftRight8 = 1. / 256.;
const float Inv255 = 1. / 255.;
const vec4 PackFactors = vec4( 1.0, 256.0, 256.0 * 256.0, 256.0 * 256.0 * 256.0 );
const vec2 UnpackFactors2 = vec2( UnpackDownscale, 1.0 / PackFactors.g );
const vec3 UnpackFactors3 = vec3( UnpackDownscale / PackFactors.rg, 1.0 / PackFactors.b );
const vec4 UnpackFactors4 = vec4( UnpackDownscale / PackFactors.rgb, 1.0 / PackFactors.a );
vec4 packDepthToRGBA( const in float v ) {
	if( v <= 0.0 )
		return vec4( 0., 0., 0., 0. );
	if( v >= 1.0 )
		return vec4( 1., 1., 1., 1. );
	float vuf;
	float af = modf( v * PackFactors.a, vuf );
	float bf = modf( vuf * ShiftRight8, vuf );
	float gf = modf( vuf * ShiftRight8, vuf );
	return vec4( vuf * Inv255, gf * PackUpscale, bf * PackUpscale, af );
}
vec3 packDepthToRGB( const in float v ) {
	if( v <= 0.0 )
		return vec3( 0., 0., 0. );
	if( v >= 1.0 )
		return vec3( 1., 1., 1. );
	float vuf;
	float bf = modf( v * PackFactors.b, vuf );
	float gf = modf( vuf * ShiftRight8, vuf );
	return vec3( vuf * Inv255, gf * PackUpscale, bf );
}
vec2 packDepthToRG( const in float v ) {
	if( v <= 0.0 )
		return vec2( 0., 0. );
	if( v >= 1.0 )
		return vec2( 1., 1. );
	float vuf;
	float gf = modf( v * 256., vuf );
	return vec2( vuf * Inv255, gf );
}
float unpackRGBAToDepth( const in vec4 v ) {
	return dot( v, UnpackFactors4 );
}
float unpackRGBToDepth( const in vec3 v ) {
	return dot( v, UnpackFactors3 );
}
float unpackRGToDepth( const in vec2 v ) {
	return v.r * UnpackFactors2.r + v.g * UnpackFactors2.g;
}
vec4 pack2HalfToRGBA( const in vec2 v ) {
	vec4 r = vec4( v.x, fract( v.x * 255.0 ), v.y, fract( v.y * 255.0 ) );
	return vec4( r.x - r.y / 255.0, r.y, r.z - r.w / 255.0, r.w );
}
vec2 unpackRGBATo2Half( const in vec4 v ) {
	return vec2( v.x + ( v.y / 255.0 ), v.z + ( v.w / 255.0 ) );
}
float viewZToOrthographicDepth( const in float viewZ, const in float near, const in float far ) {
	return ( viewZ + near ) / ( near - far );
}
float orthographicDepthToViewZ( const in float depth, const in float near, const in float far ) {
	return depth * ( near - far ) - near;
}
float viewZToPerspectiveDepth( const in float viewZ, const in float near, const in float far ) {
	return ( ( near + viewZ ) * far ) / ( ( far - near ) * viewZ );
}
float perspectiveDepthToViewZ( const in float depth, const in float near, const in float far ) {
	return ( near * far ) / ( ( far - near ) * depth - far );
}`,Q0=`#ifdef PREMULTIPLIED_ALPHA
	gl_FragColor.rgb *= gl_FragColor.a;
#endif`,eg=`vec4 mvPosition = vec4( transformed, 1.0 );
#ifdef USE_BATCHING
	mvPosition = batchingMatrix * mvPosition;
#endif
#ifdef USE_INSTANCING
	mvPosition = instanceMatrix * mvPosition;
#endif
mvPosition = modelViewMatrix * mvPosition;
gl_Position = projectionMatrix * mvPosition;`,tg=`#ifdef DITHERING
	gl_FragColor.rgb = dithering( gl_FragColor.rgb );
#endif`,ng=`#ifdef DITHERING
	vec3 dithering( vec3 color ) {
		float grid_position = rand( gl_FragCoord.xy );
		vec3 dither_shift_RGB = vec3( 0.25 / 255.0, -0.25 / 255.0, 0.25 / 255.0 );
		dither_shift_RGB = mix( 2.0 * dither_shift_RGB, -2.0 * dither_shift_RGB, grid_position );
		return color + dither_shift_RGB;
	}
#endif`,ig=`float roughnessFactor = roughness;
#ifdef USE_ROUGHNESSMAP
	vec4 texelRoughness = texture2D( roughnessMap, vRoughnessMapUv );
	roughnessFactor *= texelRoughness.g;
#endif`,sg=`#ifdef USE_ROUGHNESSMAP
	uniform sampler2D roughnessMap;
#endif`,rg=`#if NUM_SPOT_LIGHT_COORDS > 0
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#if NUM_SPOT_LIGHT_MAPS > 0
	uniform sampler2D spotLightMap[ NUM_SPOT_LIGHT_MAPS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
		uniform sampler2D directionalShadowMap[ NUM_DIR_LIGHT_SHADOWS ];
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		uniform sampler2D spotShadowMap[ NUM_SPOT_LIGHT_SHADOWS ];
		struct SpotLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		uniform sampler2D pointShadowMap[ NUM_POINT_LIGHT_SHADOWS ];
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];
		struct PointLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
	float texture2DCompare( sampler2D depths, vec2 uv, float compare ) {
		float depth = unpackRGBAToDepth( texture2D( depths, uv ) );
		#ifdef USE_REVERSED_DEPTH_BUFFER
			return step( depth, compare );
		#else
			return step( compare, depth );
		#endif
	}
	vec2 texture2DDistribution( sampler2D shadow, vec2 uv ) {
		return unpackRGBATo2Half( texture2D( shadow, uv ) );
	}
	float VSMShadow( sampler2D shadow, vec2 uv, float compare ) {
		float occlusion = 1.0;
		vec2 distribution = texture2DDistribution( shadow, uv );
		#ifdef USE_REVERSED_DEPTH_BUFFER
			float hard_shadow = step( distribution.x, compare );
		#else
			float hard_shadow = step( compare, distribution.x );
		#endif
		if ( hard_shadow != 1.0 ) {
			float distance = compare - distribution.x;
			float variance = max( 0.00000, distribution.y * distribution.y );
			float softness_probability = variance / (variance + distance * distance );			softness_probability = clamp( ( softness_probability - 0.3 ) / ( 0.95 - 0.3 ), 0.0, 1.0 );			occlusion = clamp( max( hard_shadow, softness_probability ), 0.0, 1.0 );
		}
		return occlusion;
	}
	float getShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord ) {
		float shadow = 1.0;
		shadowCoord.xyz /= shadowCoord.w;
		shadowCoord.z += shadowBias;
		bool inFrustum = shadowCoord.x >= 0.0 && shadowCoord.x <= 1.0 && shadowCoord.y >= 0.0 && shadowCoord.y <= 1.0;
		bool frustumTest = inFrustum && shadowCoord.z <= 1.0;
		if ( frustumTest ) {
		#if defined( SHADOWMAP_TYPE_PCF )
			vec2 texelSize = vec2( 1.0 ) / shadowMapSize;
			float dx0 = - texelSize.x * shadowRadius;
			float dy0 = - texelSize.y * shadowRadius;
			float dx1 = + texelSize.x * shadowRadius;
			float dy1 = + texelSize.y * shadowRadius;
			float dx2 = dx0 / 2.0;
			float dy2 = dy0 / 2.0;
			float dx3 = dx1 / 2.0;
			float dy3 = dy1 / 2.0;
			shadow = (
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, dy0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, dy0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx2, dy2 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy2 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx3, dy2 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx2, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy, shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx3, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx2, dy3 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy3 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx3, dy3 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, dy1 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy1 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, dy1 ), shadowCoord.z )
			) * ( 1.0 / 17.0 );
		#elif defined( SHADOWMAP_TYPE_PCF_SOFT )
			vec2 texelSize = vec2( 1.0 ) / shadowMapSize;
			float dx = texelSize.x;
			float dy = texelSize.y;
			vec2 uv = shadowCoord.xy;
			vec2 f = fract( uv * shadowMapSize + 0.5 );
			uv -= f * texelSize;
			shadow = (
				texture2DCompare( shadowMap, uv, shadowCoord.z ) +
				texture2DCompare( shadowMap, uv + vec2( dx, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, uv + vec2( 0.0, dy ), shadowCoord.z ) +
				texture2DCompare( shadowMap, uv + texelSize, shadowCoord.z ) +
				mix( texture2DCompare( shadowMap, uv + vec2( -dx, 0.0 ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, 0.0 ), shadowCoord.z ),
					 f.x ) +
				mix( texture2DCompare( shadowMap, uv + vec2( -dx, dy ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, dy ), shadowCoord.z ),
					 f.x ) +
				mix( texture2DCompare( shadowMap, uv + vec2( 0.0, -dy ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( 0.0, 2.0 * dy ), shadowCoord.z ),
					 f.y ) +
				mix( texture2DCompare( shadowMap, uv + vec2( dx, -dy ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( dx, 2.0 * dy ), shadowCoord.z ),
					 f.y ) +
				mix( mix( texture2DCompare( shadowMap, uv + vec2( -dx, -dy ), shadowCoord.z ),
						  texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, -dy ), shadowCoord.z ),
						  f.x ),
					 mix( texture2DCompare( shadowMap, uv + vec2( -dx, 2.0 * dy ), shadowCoord.z ),
						  texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, 2.0 * dy ), shadowCoord.z ),
						  f.x ),
					 f.y )
			) * ( 1.0 / 9.0 );
		#elif defined( SHADOWMAP_TYPE_VSM )
			shadow = VSMShadow( shadowMap, shadowCoord.xy, shadowCoord.z );
		#else
			shadow = texture2DCompare( shadowMap, shadowCoord.xy, shadowCoord.z );
		#endif
		}
		return mix( 1.0, shadow, shadowIntensity );
	}
	vec2 cubeToUV( vec3 v, float texelSizeY ) {
		vec3 absV = abs( v );
		float scaleToCube = 1.0 / max( absV.x, max( absV.y, absV.z ) );
		absV *= scaleToCube;
		v *= scaleToCube * ( 1.0 - 2.0 * texelSizeY );
		vec2 planar = v.xy;
		float almostATexel = 1.5 * texelSizeY;
		float almostOne = 1.0 - almostATexel;
		if ( absV.z >= almostOne ) {
			if ( v.z > 0.0 )
				planar.x = 4.0 - v.x;
		} else if ( absV.x >= almostOne ) {
			float signX = sign( v.x );
			planar.x = v.z * signX + 2.0 * signX;
		} else if ( absV.y >= almostOne ) {
			float signY = sign( v.y );
			planar.x = v.x + 2.0 * signY + 2.0;
			planar.y = v.z * signY - 2.0;
		}
		return vec2( 0.125, 0.25 ) * planar + vec2( 0.375, 0.75 );
	}
	float getPointShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord, float shadowCameraNear, float shadowCameraFar ) {
		float shadow = 1.0;
		vec3 lightToPosition = shadowCoord.xyz;
		
		float lightToPositionLength = length( lightToPosition );
		if ( lightToPositionLength - shadowCameraFar <= 0.0 && lightToPositionLength - shadowCameraNear >= 0.0 ) {
			float dp = ( lightToPositionLength - shadowCameraNear ) / ( shadowCameraFar - shadowCameraNear );			dp += shadowBias;
			vec3 bd3D = normalize( lightToPosition );
			vec2 texelSize = vec2( 1.0 ) / ( shadowMapSize * vec2( 4.0, 2.0 ) );
			#if defined( SHADOWMAP_TYPE_PCF ) || defined( SHADOWMAP_TYPE_PCF_SOFT ) || defined( SHADOWMAP_TYPE_VSM )
				vec2 offset = vec2( - 1, 1 ) * shadowRadius * texelSize.y;
				shadow = (
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xyy, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yyy, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xyx, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yyx, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xxy, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yxy, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xxx, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yxx, texelSize.y ), dp )
				) * ( 1.0 / 9.0 );
			#else
				shadow = texture2DCompare( shadowMap, cubeToUV( bd3D, texelSize.y ), dp );
			#endif
		}
		return mix( 1.0, shadow, shadowIntensity );
	}
#endif`,og=`#if NUM_SPOT_LIGHT_COORDS > 0
	uniform mat4 spotLightMatrix[ NUM_SPOT_LIGHT_COORDS ];
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
		uniform mat4 directionalShadowMatrix[ NUM_DIR_LIGHT_SHADOWS ];
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		struct SpotLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		uniform mat4 pointShadowMatrix[ NUM_POINT_LIGHT_SHADOWS ];
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];
		struct PointLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
#endif`,ag=`#if ( defined( USE_SHADOWMAP ) && ( NUM_DIR_LIGHT_SHADOWS > 0 || NUM_POINT_LIGHT_SHADOWS > 0 ) ) || ( NUM_SPOT_LIGHT_COORDS > 0 )
	vec3 shadowWorldNormal = inverseTransformDirection( transformedNormal, viewMatrix );
	vec4 shadowWorldPosition;
#endif
#if defined( USE_SHADOWMAP )
	#if NUM_DIR_LIGHT_SHADOWS > 0
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
			shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * directionalLightShadows[ i ].shadowNormalBias, 0 );
			vDirectionalShadowCoord[ i ] = directionalShadowMatrix[ i ] * shadowWorldPosition;
		}
		#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
			shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * pointLightShadows[ i ].shadowNormalBias, 0 );
			vPointShadowCoord[ i ] = pointShadowMatrix[ i ] * shadowWorldPosition;
		}
		#pragma unroll_loop_end
	#endif
#endif
#if NUM_SPOT_LIGHT_COORDS > 0
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_COORDS; i ++ ) {
		shadowWorldPosition = worldPosition;
		#if ( defined( USE_SHADOWMAP ) && UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
			shadowWorldPosition.xyz += shadowWorldNormal * spotLightShadows[ i ].shadowNormalBias;
		#endif
		vSpotLightCoord[ i ] = spotLightMatrix[ i ] * shadowWorldPosition;
	}
	#pragma unroll_loop_end
#endif`,lg=`float getShadowMask() {
	float shadow = 1.0;
	#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
		directionalLight = directionalLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( directionalShadowMap[ i ], directionalLight.shadowMapSize, directionalLight.shadowIntensity, directionalLight.shadowBias, directionalLight.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_SHADOWS; i ++ ) {
		spotLight = spotLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( spotShadowMap[ i ], spotLight.shadowMapSize, spotLight.shadowIntensity, spotLight.shadowBias, spotLight.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
	PointLightShadow pointLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
		pointLight = pointLightShadows[ i ];
		shadow *= receiveShadow ? getPointShadow( pointShadowMap[ i ], pointLight.shadowMapSize, pointLight.shadowIntensity, pointLight.shadowBias, pointLight.shadowRadius, vPointShadowCoord[ i ], pointLight.shadowCameraNear, pointLight.shadowCameraFar ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#endif
	return shadow;
}`,cg=`#ifdef USE_SKINNING
	mat4 boneMatX = getBoneMatrix( skinIndex.x );
	mat4 boneMatY = getBoneMatrix( skinIndex.y );
	mat4 boneMatZ = getBoneMatrix( skinIndex.z );
	mat4 boneMatW = getBoneMatrix( skinIndex.w );
#endif`,ug=`#ifdef USE_SKINNING
	uniform mat4 bindMatrix;
	uniform mat4 bindMatrixInverse;
	uniform highp sampler2D boneTexture;
	mat4 getBoneMatrix( const in float i ) {
		int size = textureSize( boneTexture, 0 ).x;
		int j = int( i ) * 4;
		int x = j % size;
		int y = j / size;
		vec4 v1 = texelFetch( boneTexture, ivec2( x, y ), 0 );
		vec4 v2 = texelFetch( boneTexture, ivec2( x + 1, y ), 0 );
		vec4 v3 = texelFetch( boneTexture, ivec2( x + 2, y ), 0 );
		vec4 v4 = texelFetch( boneTexture, ivec2( x + 3, y ), 0 );
		return mat4( v1, v2, v3, v4 );
	}
#endif`,hg=`#ifdef USE_SKINNING
	vec4 skinVertex = bindMatrix * vec4( transformed, 1.0 );
	vec4 skinned = vec4( 0.0 );
	skinned += boneMatX * skinVertex * skinWeight.x;
	skinned += boneMatY * skinVertex * skinWeight.y;
	skinned += boneMatZ * skinVertex * skinWeight.z;
	skinned += boneMatW * skinVertex * skinWeight.w;
	transformed = ( bindMatrixInverse * skinned ).xyz;
#endif`,fg=`#ifdef USE_SKINNING
	mat4 skinMatrix = mat4( 0.0 );
	skinMatrix += skinWeight.x * boneMatX;
	skinMatrix += skinWeight.y * boneMatY;
	skinMatrix += skinWeight.z * boneMatZ;
	skinMatrix += skinWeight.w * boneMatW;
	skinMatrix = bindMatrixInverse * skinMatrix * bindMatrix;
	objectNormal = vec4( skinMatrix * vec4( objectNormal, 0.0 ) ).xyz;
	#ifdef USE_TANGENT
		objectTangent = vec4( skinMatrix * vec4( objectTangent, 0.0 ) ).xyz;
	#endif
#endif`,dg=`float specularStrength;
#ifdef USE_SPECULARMAP
	vec4 texelSpecular = texture2D( specularMap, vSpecularMapUv );
	specularStrength = texelSpecular.r;
#else
	specularStrength = 1.0;
#endif`,pg=`#ifdef USE_SPECULARMAP
	uniform sampler2D specularMap;
#endif`,mg=`#if defined( TONE_MAPPING )
	gl_FragColor.rgb = toneMapping( gl_FragColor.rgb );
#endif`,gg=`#ifndef saturate
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
uniform float toneMappingExposure;
vec3 LinearToneMapping( vec3 color ) {
	return saturate( toneMappingExposure * color );
}
vec3 ReinhardToneMapping( vec3 color ) {
	color *= toneMappingExposure;
	return saturate( color / ( vec3( 1.0 ) + color ) );
}
vec3 CineonToneMapping( vec3 color ) {
	color *= toneMappingExposure;
	color = max( vec3( 0.0 ), color - 0.004 );
	return pow( ( color * ( 6.2 * color + 0.5 ) ) / ( color * ( 6.2 * color + 1.7 ) + 0.06 ), vec3( 2.2 ) );
}
vec3 RRTAndODTFit( vec3 v ) {
	vec3 a = v * ( v + 0.0245786 ) - 0.000090537;
	vec3 b = v * ( 0.983729 * v + 0.4329510 ) + 0.238081;
	return a / b;
}
vec3 ACESFilmicToneMapping( vec3 color ) {
	const mat3 ACESInputMat = mat3(
		vec3( 0.59719, 0.07600, 0.02840 ),		vec3( 0.35458, 0.90834, 0.13383 ),
		vec3( 0.04823, 0.01566, 0.83777 )
	);
	const mat3 ACESOutputMat = mat3(
		vec3(  1.60475, -0.10208, -0.00327 ),		vec3( -0.53108,  1.10813, -0.07276 ),
		vec3( -0.07367, -0.00605,  1.07602 )
	);
	color *= toneMappingExposure / 0.6;
	color = ACESInputMat * color;
	color = RRTAndODTFit( color );
	color = ACESOutputMat * color;
	return saturate( color );
}
const mat3 LINEAR_REC2020_TO_LINEAR_SRGB = mat3(
	vec3( 1.6605, - 0.1246, - 0.0182 ),
	vec3( - 0.5876, 1.1329, - 0.1006 ),
	vec3( - 0.0728, - 0.0083, 1.1187 )
);
const mat3 LINEAR_SRGB_TO_LINEAR_REC2020 = mat3(
	vec3( 0.6274, 0.0691, 0.0164 ),
	vec3( 0.3293, 0.9195, 0.0880 ),
	vec3( 0.0433, 0.0113, 0.8956 )
);
vec3 agxDefaultContrastApprox( vec3 x ) {
	vec3 x2 = x * x;
	vec3 x4 = x2 * x2;
	return + 15.5 * x4 * x2
		- 40.14 * x4 * x
		+ 31.96 * x4
		- 6.868 * x2 * x
		+ 0.4298 * x2
		+ 0.1191 * x
		- 0.00232;
}
vec3 AgXToneMapping( vec3 color ) {
	const mat3 AgXInsetMatrix = mat3(
		vec3( 0.856627153315983, 0.137318972929847, 0.11189821299995 ),
		vec3( 0.0951212405381588, 0.761241990602591, 0.0767994186031903 ),
		vec3( 0.0482516061458583, 0.101439036467562, 0.811302368396859 )
	);
	const mat3 AgXOutsetMatrix = mat3(
		vec3( 1.1271005818144368, - 0.1413297634984383, - 0.14132976349843826 ),
		vec3( - 0.11060664309660323, 1.157823702216272, - 0.11060664309660294 ),
		vec3( - 0.016493938717834573, - 0.016493938717834257, 1.2519364065950405 )
	);
	const float AgxMinEv = - 12.47393;	const float AgxMaxEv = 4.026069;
	color *= toneMappingExposure;
	color = LINEAR_SRGB_TO_LINEAR_REC2020 * color;
	color = AgXInsetMatrix * color;
	color = max( color, 1e-10 );	color = log2( color );
	color = ( color - AgxMinEv ) / ( AgxMaxEv - AgxMinEv );
	color = clamp( color, 0.0, 1.0 );
	color = agxDefaultContrastApprox( color );
	color = AgXOutsetMatrix * color;
	color = pow( max( vec3( 0.0 ), color ), vec3( 2.2 ) );
	color = LINEAR_REC2020_TO_LINEAR_SRGB * color;
	color = clamp( color, 0.0, 1.0 );
	return color;
}
vec3 NeutralToneMapping( vec3 color ) {
	const float StartCompression = 0.8 - 0.04;
	const float Desaturation = 0.15;
	color *= toneMappingExposure;
	float x = min( color.r, min( color.g, color.b ) );
	float offset = x < 0.08 ? x - 6.25 * x * x : 0.04;
	color -= offset;
	float peak = max( color.r, max( color.g, color.b ) );
	if ( peak < StartCompression ) return color;
	float d = 1. - StartCompression;
	float newPeak = 1. - d * d / ( peak + d - StartCompression );
	color *= newPeak / peak;
	float g = 1. - 1. / ( Desaturation * ( peak - newPeak ) + 1. );
	return mix( color, vec3( newPeak ), g );
}
vec3 CustomToneMapping( vec3 color ) { return color; }`,vg=`#ifdef USE_TRANSMISSION
	material.transmission = transmission;
	material.transmissionAlpha = 1.0;
	material.thickness = thickness;
	material.attenuationDistance = attenuationDistance;
	material.attenuationColor = attenuationColor;
	#ifdef USE_TRANSMISSIONMAP
		material.transmission *= texture2D( transmissionMap, vTransmissionMapUv ).r;
	#endif
	#ifdef USE_THICKNESSMAP
		material.thickness *= texture2D( thicknessMap, vThicknessMapUv ).g;
	#endif
	vec3 pos = vWorldPosition;
	vec3 v = normalize( cameraPosition - pos );
	vec3 n = inverseTransformDirection( normal, viewMatrix );
	vec4 transmitted = getIBLVolumeRefraction(
		n, v, material.roughness, material.diffuseColor, material.specularColor, material.specularF90,
		pos, modelMatrix, viewMatrix, projectionMatrix, material.dispersion, material.ior, material.thickness,
		material.attenuationColor, material.attenuationDistance );
	material.transmissionAlpha = mix( material.transmissionAlpha, transmitted.a, material.transmission );
	totalDiffuse = mix( totalDiffuse, transmitted.rgb, material.transmission );
#endif`,xg=`#ifdef USE_TRANSMISSION
	uniform float transmission;
	uniform float thickness;
	uniform float attenuationDistance;
	uniform vec3 attenuationColor;
	#ifdef USE_TRANSMISSIONMAP
		uniform sampler2D transmissionMap;
	#endif
	#ifdef USE_THICKNESSMAP
		uniform sampler2D thicknessMap;
	#endif
	uniform vec2 transmissionSamplerSize;
	uniform sampler2D transmissionSamplerMap;
	uniform mat4 modelMatrix;
	uniform mat4 projectionMatrix;
	varying vec3 vWorldPosition;
	float w0( float a ) {
		return ( 1.0 / 6.0 ) * ( a * ( a * ( - a + 3.0 ) - 3.0 ) + 1.0 );
	}
	float w1( float a ) {
		return ( 1.0 / 6.0 ) * ( a *  a * ( 3.0 * a - 6.0 ) + 4.0 );
	}
	float w2( float a ){
		return ( 1.0 / 6.0 ) * ( a * ( a * ( - 3.0 * a + 3.0 ) + 3.0 ) + 1.0 );
	}
	float w3( float a ) {
		return ( 1.0 / 6.0 ) * ( a * a * a );
	}
	float g0( float a ) {
		return w0( a ) + w1( a );
	}
	float g1( float a ) {
		return w2( a ) + w3( a );
	}
	float h0( float a ) {
		return - 1.0 + w1( a ) / ( w0( a ) + w1( a ) );
	}
	float h1( float a ) {
		return 1.0 + w3( a ) / ( w2( a ) + w3( a ) );
	}
	vec4 bicubic( sampler2D tex, vec2 uv, vec4 texelSize, float lod ) {
		uv = uv * texelSize.zw + 0.5;
		vec2 iuv = floor( uv );
		vec2 fuv = fract( uv );
		float g0x = g0( fuv.x );
		float g1x = g1( fuv.x );
		float h0x = h0( fuv.x );
		float h1x = h1( fuv.x );
		float h0y = h0( fuv.y );
		float h1y = h1( fuv.y );
		vec2 p0 = ( vec2( iuv.x + h0x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;
		vec2 p1 = ( vec2( iuv.x + h1x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;
		vec2 p2 = ( vec2( iuv.x + h0x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;
		vec2 p3 = ( vec2( iuv.x + h1x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;
		return g0( fuv.y ) * ( g0x * textureLod( tex, p0, lod ) + g1x * textureLod( tex, p1, lod ) ) +
			g1( fuv.y ) * ( g0x * textureLod( tex, p2, lod ) + g1x * textureLod( tex, p3, lod ) );
	}
	vec4 textureBicubic( sampler2D sampler, vec2 uv, float lod ) {
		vec2 fLodSize = vec2( textureSize( sampler, int( lod ) ) );
		vec2 cLodSize = vec2( textureSize( sampler, int( lod + 1.0 ) ) );
		vec2 fLodSizeInv = 1.0 / fLodSize;
		vec2 cLodSizeInv = 1.0 / cLodSize;
		vec4 fSample = bicubic( sampler, uv, vec4( fLodSizeInv, fLodSize ), floor( lod ) );
		vec4 cSample = bicubic( sampler, uv, vec4( cLodSizeInv, cLodSize ), ceil( lod ) );
		return mix( fSample, cSample, fract( lod ) );
	}
	vec3 getVolumeTransmissionRay( const in vec3 n, const in vec3 v, const in float thickness, const in float ior, const in mat4 modelMatrix ) {
		vec3 refractionVector = refract( - v, normalize( n ), 1.0 / ior );
		vec3 modelScale;
		modelScale.x = length( vec3( modelMatrix[ 0 ].xyz ) );
		modelScale.y = length( vec3( modelMatrix[ 1 ].xyz ) );
		modelScale.z = length( vec3( modelMatrix[ 2 ].xyz ) );
		return normalize( refractionVector ) * thickness * modelScale;
	}
	float applyIorToRoughness( const in float roughness, const in float ior ) {
		return roughness * clamp( ior * 2.0 - 2.0, 0.0, 1.0 );
	}
	vec4 getTransmissionSample( const in vec2 fragCoord, const in float roughness, const in float ior ) {
		float lod = log2( transmissionSamplerSize.x ) * applyIorToRoughness( roughness, ior );
		return textureBicubic( transmissionSamplerMap, fragCoord.xy, lod );
	}
	vec3 volumeAttenuation( const in float transmissionDistance, const in vec3 attenuationColor, const in float attenuationDistance ) {
		if ( isinf( attenuationDistance ) ) {
			return vec3( 1.0 );
		} else {
			vec3 attenuationCoefficient = -log( attenuationColor ) / attenuationDistance;
			vec3 transmittance = exp( - attenuationCoefficient * transmissionDistance );			return transmittance;
		}
	}
	vec4 getIBLVolumeRefraction( const in vec3 n, const in vec3 v, const in float roughness, const in vec3 diffuseColor,
		const in vec3 specularColor, const in float specularF90, const in vec3 position, const in mat4 modelMatrix,
		const in mat4 viewMatrix, const in mat4 projMatrix, const in float dispersion, const in float ior, const in float thickness,
		const in vec3 attenuationColor, const in float attenuationDistance ) {
		vec4 transmittedLight;
		vec3 transmittance;
		#ifdef USE_DISPERSION
			float halfSpread = ( ior - 1.0 ) * 0.025 * dispersion;
			vec3 iors = vec3( ior - halfSpread, ior, ior + halfSpread );
			for ( int i = 0; i < 3; i ++ ) {
				vec3 transmissionRay = getVolumeTransmissionRay( n, v, thickness, iors[ i ], modelMatrix );
				vec3 refractedRayExit = position + transmissionRay;
				vec4 ndcPos = projMatrix * viewMatrix * vec4( refractedRayExit, 1.0 );
				vec2 refractionCoords = ndcPos.xy / ndcPos.w;
				refractionCoords += 1.0;
				refractionCoords /= 2.0;
				vec4 transmissionSample = getTransmissionSample( refractionCoords, roughness, iors[ i ] );
				transmittedLight[ i ] = transmissionSample[ i ];
				transmittedLight.a += transmissionSample.a;
				transmittance[ i ] = diffuseColor[ i ] * volumeAttenuation( length( transmissionRay ), attenuationColor, attenuationDistance )[ i ];
			}
			transmittedLight.a /= 3.0;
		#else
			vec3 transmissionRay = getVolumeTransmissionRay( n, v, thickness, ior, modelMatrix );
			vec3 refractedRayExit = position + transmissionRay;
			vec4 ndcPos = projMatrix * viewMatrix * vec4( refractedRayExit, 1.0 );
			vec2 refractionCoords = ndcPos.xy / ndcPos.w;
			refractionCoords += 1.0;
			refractionCoords /= 2.0;
			transmittedLight = getTransmissionSample( refractionCoords, roughness, ior );
			transmittance = diffuseColor * volumeAttenuation( length( transmissionRay ), attenuationColor, attenuationDistance );
		#endif
		vec3 attenuatedColor = transmittance * transmittedLight.rgb;
		vec3 F = EnvironmentBRDF( n, v, specularColor, specularF90, roughness );
		float transmittanceFactor = ( transmittance.r + transmittance.g + transmittance.b ) / 3.0;
		return vec4( ( 1.0 - F ) * attenuatedColor, 1.0 - ( 1.0 - transmittedLight.a ) * transmittanceFactor );
	}
#endif`,_g=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	varying vec2 vUv;
#endif
#ifdef USE_MAP
	varying vec2 vMapUv;
#endif
#ifdef USE_ALPHAMAP
	varying vec2 vAlphaMapUv;
#endif
#ifdef USE_LIGHTMAP
	varying vec2 vLightMapUv;
#endif
#ifdef USE_AOMAP
	varying vec2 vAoMapUv;
#endif
#ifdef USE_BUMPMAP
	varying vec2 vBumpMapUv;
#endif
#ifdef USE_NORMALMAP
	varying vec2 vNormalMapUv;
#endif
#ifdef USE_EMISSIVEMAP
	varying vec2 vEmissiveMapUv;
#endif
#ifdef USE_METALNESSMAP
	varying vec2 vMetalnessMapUv;
#endif
#ifdef USE_ROUGHNESSMAP
	varying vec2 vRoughnessMapUv;
#endif
#ifdef USE_ANISOTROPYMAP
	varying vec2 vAnisotropyMapUv;
#endif
#ifdef USE_CLEARCOATMAP
	varying vec2 vClearcoatMapUv;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	varying vec2 vClearcoatNormalMapUv;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	varying vec2 vClearcoatRoughnessMapUv;
#endif
#ifdef USE_IRIDESCENCEMAP
	varying vec2 vIridescenceMapUv;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	varying vec2 vIridescenceThicknessMapUv;
#endif
#ifdef USE_SHEEN_COLORMAP
	varying vec2 vSheenColorMapUv;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	varying vec2 vSheenRoughnessMapUv;
#endif
#ifdef USE_SPECULARMAP
	varying vec2 vSpecularMapUv;
#endif
#ifdef USE_SPECULAR_COLORMAP
	varying vec2 vSpecularColorMapUv;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	varying vec2 vSpecularIntensityMapUv;
#endif
#ifdef USE_TRANSMISSIONMAP
	uniform mat3 transmissionMapTransform;
	varying vec2 vTransmissionMapUv;
#endif
#ifdef USE_THICKNESSMAP
	uniform mat3 thicknessMapTransform;
	varying vec2 vThicknessMapUv;
#endif`,yg=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	varying vec2 vUv;
#endif
#ifdef USE_MAP
	uniform mat3 mapTransform;
	varying vec2 vMapUv;
#endif
#ifdef USE_ALPHAMAP
	uniform mat3 alphaMapTransform;
	varying vec2 vAlphaMapUv;
#endif
#ifdef USE_LIGHTMAP
	uniform mat3 lightMapTransform;
	varying vec2 vLightMapUv;
#endif
#ifdef USE_AOMAP
	uniform mat3 aoMapTransform;
	varying vec2 vAoMapUv;
#endif
#ifdef USE_BUMPMAP
	uniform mat3 bumpMapTransform;
	varying vec2 vBumpMapUv;
#endif
#ifdef USE_NORMALMAP
	uniform mat3 normalMapTransform;
	varying vec2 vNormalMapUv;
#endif
#ifdef USE_DISPLACEMENTMAP
	uniform mat3 displacementMapTransform;
	varying vec2 vDisplacementMapUv;
#endif
#ifdef USE_EMISSIVEMAP
	uniform mat3 emissiveMapTransform;
	varying vec2 vEmissiveMapUv;
#endif
#ifdef USE_METALNESSMAP
	uniform mat3 metalnessMapTransform;
	varying vec2 vMetalnessMapUv;
#endif
#ifdef USE_ROUGHNESSMAP
	uniform mat3 roughnessMapTransform;
	varying vec2 vRoughnessMapUv;
#endif
#ifdef USE_ANISOTROPYMAP
	uniform mat3 anisotropyMapTransform;
	varying vec2 vAnisotropyMapUv;
#endif
#ifdef USE_CLEARCOATMAP
	uniform mat3 clearcoatMapTransform;
	varying vec2 vClearcoatMapUv;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform mat3 clearcoatNormalMapTransform;
	varying vec2 vClearcoatNormalMapUv;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform mat3 clearcoatRoughnessMapTransform;
	varying vec2 vClearcoatRoughnessMapUv;
#endif
#ifdef USE_SHEEN_COLORMAP
	uniform mat3 sheenColorMapTransform;
	varying vec2 vSheenColorMapUv;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	uniform mat3 sheenRoughnessMapTransform;
	varying vec2 vSheenRoughnessMapUv;
#endif
#ifdef USE_IRIDESCENCEMAP
	uniform mat3 iridescenceMapTransform;
	varying vec2 vIridescenceMapUv;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform mat3 iridescenceThicknessMapTransform;
	varying vec2 vIridescenceThicknessMapUv;
#endif
#ifdef USE_SPECULARMAP
	uniform mat3 specularMapTransform;
	varying vec2 vSpecularMapUv;
#endif
#ifdef USE_SPECULAR_COLORMAP
	uniform mat3 specularColorMapTransform;
	varying vec2 vSpecularColorMapUv;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	uniform mat3 specularIntensityMapTransform;
	varying vec2 vSpecularIntensityMapUv;
#endif
#ifdef USE_TRANSMISSIONMAP
	uniform mat3 transmissionMapTransform;
	varying vec2 vTransmissionMapUv;
#endif
#ifdef USE_THICKNESSMAP
	uniform mat3 thicknessMapTransform;
	varying vec2 vThicknessMapUv;
#endif`,Mg=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	vUv = vec3( uv, 1 ).xy;
#endif
#ifdef USE_MAP
	vMapUv = ( mapTransform * vec3( MAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ALPHAMAP
	vAlphaMapUv = ( alphaMapTransform * vec3( ALPHAMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_LIGHTMAP
	vLightMapUv = ( lightMapTransform * vec3( LIGHTMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_AOMAP
	vAoMapUv = ( aoMapTransform * vec3( AOMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_BUMPMAP
	vBumpMapUv = ( bumpMapTransform * vec3( BUMPMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_NORMALMAP
	vNormalMapUv = ( normalMapTransform * vec3( NORMALMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_DISPLACEMENTMAP
	vDisplacementMapUv = ( displacementMapTransform * vec3( DISPLACEMENTMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_EMISSIVEMAP
	vEmissiveMapUv = ( emissiveMapTransform * vec3( EMISSIVEMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_METALNESSMAP
	vMetalnessMapUv = ( metalnessMapTransform * vec3( METALNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ROUGHNESSMAP
	vRoughnessMapUv = ( roughnessMapTransform * vec3( ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ANISOTROPYMAP
	vAnisotropyMapUv = ( anisotropyMapTransform * vec3( ANISOTROPYMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOATMAP
	vClearcoatMapUv = ( clearcoatMapTransform * vec3( CLEARCOATMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	vClearcoatNormalMapUv = ( clearcoatNormalMapTransform * vec3( CLEARCOAT_NORMALMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	vClearcoatRoughnessMapUv = ( clearcoatRoughnessMapTransform * vec3( CLEARCOAT_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_IRIDESCENCEMAP
	vIridescenceMapUv = ( iridescenceMapTransform * vec3( IRIDESCENCEMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	vIridescenceThicknessMapUv = ( iridescenceThicknessMapTransform * vec3( IRIDESCENCE_THICKNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SHEEN_COLORMAP
	vSheenColorMapUv = ( sheenColorMapTransform * vec3( SHEEN_COLORMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	vSheenRoughnessMapUv = ( sheenRoughnessMapTransform * vec3( SHEEN_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULARMAP
	vSpecularMapUv = ( specularMapTransform * vec3( SPECULARMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULAR_COLORMAP
	vSpecularColorMapUv = ( specularColorMapTransform * vec3( SPECULAR_COLORMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	vSpecularIntensityMapUv = ( specularIntensityMapTransform * vec3( SPECULAR_INTENSITYMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_TRANSMISSIONMAP
	vTransmissionMapUv = ( transmissionMapTransform * vec3( TRANSMISSIONMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_THICKNESSMAP
	vThicknessMapUv = ( thicknessMapTransform * vec3( THICKNESSMAP_UV, 1 ) ).xy;
#endif`,Sg=`#if defined( USE_ENVMAP ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP ) || defined ( USE_TRANSMISSION ) || NUM_SPOT_LIGHT_COORDS > 0
	vec4 worldPosition = vec4( transformed, 1.0 );
	#ifdef USE_BATCHING
		worldPosition = batchingMatrix * worldPosition;
	#endif
	#ifdef USE_INSTANCING
		worldPosition = instanceMatrix * worldPosition;
	#endif
	worldPosition = modelMatrix * worldPosition;
#endif`;const bg=`varying vec2 vUv;
uniform mat3 uvTransform;
void main() {
	vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	gl_Position = vec4( position.xy, 1.0, 1.0 );
}`,Tg=`uniform sampler2D t2D;
uniform float backgroundIntensity;
varying vec2 vUv;
void main() {
	vec4 texColor = texture2D( t2D, vUv );
	#ifdef DECODE_VIDEO_TEXTURE
		texColor = vec4( mix( pow( texColor.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), texColor.rgb * 0.0773993808, vec3( lessThanEqual( texColor.rgb, vec3( 0.04045 ) ) ) ), texColor.w );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,Eg=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,wg=`#ifdef ENVMAP_TYPE_CUBE
	uniform samplerCube envMap;
#elif defined( ENVMAP_TYPE_CUBE_UV )
	uniform sampler2D envMap;
#endif
uniform float flipEnvMap;
uniform float backgroundBlurriness;
uniform float backgroundIntensity;
uniform mat3 backgroundRotation;
varying vec3 vWorldDirection;
#include <cube_uv_reflection_fragment>
void main() {
	#ifdef ENVMAP_TYPE_CUBE
		vec4 texColor = textureCube( envMap, backgroundRotation * vec3( flipEnvMap * vWorldDirection.x, vWorldDirection.yz ) );
	#elif defined( ENVMAP_TYPE_CUBE_UV )
		vec4 texColor = textureCubeUV( envMap, backgroundRotation * vWorldDirection, backgroundBlurriness );
	#else
		vec4 texColor = vec4( 0.0, 0.0, 0.0, 1.0 );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,Ag=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,Rg=`uniform samplerCube tCube;
uniform float tFlip;
uniform float opacity;
varying vec3 vWorldDirection;
void main() {
	vec4 texColor = textureCube( tCube, vec3( tFlip * vWorldDirection.x, vWorldDirection.yz ) );
	gl_FragColor = texColor;
	gl_FragColor.a *= opacity;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,Cg=`#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
varying vec2 vHighPrecisionZW;
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <skinbase_vertex>
	#include <morphinstance_vertex>
	#ifdef USE_DISPLACEMENTMAP
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vHighPrecisionZW = gl_Position.zw;
}`,Pg=`#if DEPTH_PACKING == 3200
	uniform float opacity;
#endif
#include <common>
#include <packing>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
varying vec2 vHighPrecisionZW;
void main() {
	vec4 diffuseColor = vec4( 1.0 );
	#include <clipping_planes_fragment>
	#if DEPTH_PACKING == 3200
		diffuseColor.a = opacity;
	#endif
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <logdepthbuf_fragment>
	#ifdef USE_REVERSED_DEPTH_BUFFER
		float fragCoordZ = vHighPrecisionZW[ 0 ] / vHighPrecisionZW[ 1 ];
	#else
		float fragCoordZ = 0.5 * vHighPrecisionZW[ 0 ] / vHighPrecisionZW[ 1 ] + 0.5;
	#endif
	#if DEPTH_PACKING == 3200
		gl_FragColor = vec4( vec3( 1.0 - fragCoordZ ), opacity );
	#elif DEPTH_PACKING == 3201
		gl_FragColor = packDepthToRGBA( fragCoordZ );
	#elif DEPTH_PACKING == 3202
		gl_FragColor = vec4( packDepthToRGB( fragCoordZ ), 1.0 );
	#elif DEPTH_PACKING == 3203
		gl_FragColor = vec4( packDepthToRG( fragCoordZ ), 0.0, 1.0 );
	#endif
}`,Lg=`#define DISTANCE
varying vec3 vWorldPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <skinbase_vertex>
	#include <morphinstance_vertex>
	#ifdef USE_DISPLACEMENTMAP
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <worldpos_vertex>
	#include <clipping_planes_vertex>
	vWorldPosition = worldPosition.xyz;
}`,Ig=`#define DISTANCE
uniform vec3 referencePosition;
uniform float nearDistance;
uniform float farDistance;
varying vec3 vWorldPosition;
#include <common>
#include <packing>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <clipping_planes_pars_fragment>
void main () {
	vec4 diffuseColor = vec4( 1.0 );
	#include <clipping_planes_fragment>
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	float dist = length( vWorldPosition - referencePosition );
	dist = ( dist - nearDistance ) / ( farDistance - nearDistance );
	dist = saturate( dist );
	gl_FragColor = packDepthToRGBA( dist );
}`,Dg=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
}`,Ng=`uniform sampler2D tEquirect;
varying vec3 vWorldDirection;
#include <common>
void main() {
	vec3 direction = normalize( vWorldDirection );
	vec2 sampleUV = equirectUv( direction );
	gl_FragColor = texture2D( tEquirect, sampleUV );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,Ug=`uniform float scale;
attribute float lineDistance;
varying float vLineDistance;
#include <common>
#include <uv_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	vLineDistance = scale * lineDistance;
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`,Fg=`uniform vec3 diffuse;
uniform float opacity;
uniform float dashSize;
uniform float totalSize;
varying float vLineDistance;
#include <common>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	if ( mod( vLineDistance, totalSize ) > dashSize ) {
		discard;
	}
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,Og=`#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#if defined ( USE_ENVMAP ) || defined ( USE_SKINNING )
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinbase_vertex>
		#include <skinnormal_vertex>
		#include <defaultnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <fog_vertex>
}`,kg=`uniform vec3 diffuse;
uniform float opacity;
#ifndef FLAT_SHADED
	varying vec3 vNormal;
#endif
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
		reflectedLight.indirectDiffuse += lightMapTexel.rgb * lightMapIntensity * RECIPROCAL_PI;
	#else
		reflectedLight.indirectDiffuse += vec3( 1.0 );
	#endif
	#include <aomap_fragment>
	reflectedLight.indirectDiffuse *= diffuseColor.rgb;
	vec3 outgoingLight = reflectedLight.indirectDiffuse;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,Bg=`#define LAMBERT
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,zg=`#define LAMBERT
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_lambert_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_lambert_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,Hg=`#define MATCAP
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <color_pars_vertex>
#include <displacementmap_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
	vViewPosition = - mvPosition.xyz;
}`,Vg=`#define MATCAP
uniform vec3 diffuse;
uniform float opacity;
uniform sampler2D matcap;
varying vec3 vViewPosition;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	vec3 viewDir = normalize( vViewPosition );
	vec3 x = normalize( vec3( viewDir.z, 0.0, - viewDir.x ) );
	vec3 y = cross( viewDir, x );
	vec2 uv = vec2( dot( x, normal ), dot( y, normal ) ) * 0.495 + 0.5;
	#ifdef USE_MATCAP
		vec4 matcapColor = texture2D( matcap, uv );
	#else
		vec4 matcapColor = vec4( vec3( mix( 0.2, 0.8, uv.y ) ), 1.0 );
	#endif
	vec3 outgoingLight = diffuseColor.rgb * matcapColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,Gg=`#define NORMAL
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	varying vec3 vViewPosition;
#endif
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	vViewPosition = - mvPosition.xyz;
#endif
}`,Wg=`#define NORMAL
uniform float opacity;
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	varying vec3 vViewPosition;
#endif
#include <packing>
#include <uv_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( 0.0, 0.0, 0.0, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	gl_FragColor = vec4( packNormalToRGB( normal ), diffuseColor.a );
	#ifdef OPAQUE
		gl_FragColor.a = 1.0;
	#endif
}`,Xg=`#define PHONG
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,qg=`#define PHONG
uniform vec3 diffuse;
uniform vec3 emissive;
uniform vec3 specular;
uniform float shininess;
uniform float opacity;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_phong_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_phong_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + reflectedLight.directSpecular + reflectedLight.indirectSpecular + totalEmissiveRadiance;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,Kg=`#define STANDARD
varying vec3 vViewPosition;
#ifdef USE_TRANSMISSION
	varying vec3 vWorldPosition;
#endif
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
#ifdef USE_TRANSMISSION
	vWorldPosition = worldPosition.xyz;
#endif
}`,$g=`#define STANDARD
#ifdef PHYSICAL
	#define IOR
	#define USE_SPECULAR
#endif
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float roughness;
uniform float metalness;
uniform float opacity;
#ifdef IOR
	uniform float ior;
#endif
#ifdef USE_SPECULAR
	uniform float specularIntensity;
	uniform vec3 specularColor;
	#ifdef USE_SPECULAR_COLORMAP
		uniform sampler2D specularColorMap;
	#endif
	#ifdef USE_SPECULAR_INTENSITYMAP
		uniform sampler2D specularIntensityMap;
	#endif
#endif
#ifdef USE_CLEARCOAT
	uniform float clearcoat;
	uniform float clearcoatRoughness;
#endif
#ifdef USE_DISPERSION
	uniform float dispersion;
#endif
#ifdef USE_IRIDESCENCE
	uniform float iridescence;
	uniform float iridescenceIOR;
	uniform float iridescenceThicknessMinimum;
	uniform float iridescenceThicknessMaximum;
#endif
#ifdef USE_SHEEN
	uniform vec3 sheenColor;
	uniform float sheenRoughness;
	#ifdef USE_SHEEN_COLORMAP
		uniform sampler2D sheenColorMap;
	#endif
	#ifdef USE_SHEEN_ROUGHNESSMAP
		uniform sampler2D sheenRoughnessMap;
	#endif
#endif
#ifdef USE_ANISOTROPY
	uniform vec2 anisotropyVector;
	#ifdef USE_ANISOTROPYMAP
		uniform sampler2D anisotropyMap;
	#endif
#endif
varying vec3 vViewPosition;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <iridescence_fragment>
#include <cube_uv_reflection_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_physical_pars_fragment>
#include <fog_pars_fragment>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_physical_pars_fragment>
#include <transmission_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <clearcoat_pars_fragment>
#include <iridescence_pars_fragment>
#include <roughnessmap_pars_fragment>
#include <metalnessmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <roughnessmap_fragment>
	#include <metalnessmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <clearcoat_normal_fragment_begin>
	#include <clearcoat_normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_physical_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 totalDiffuse = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse;
	vec3 totalSpecular = reflectedLight.directSpecular + reflectedLight.indirectSpecular;
	#include <transmission_fragment>
	vec3 outgoingLight = totalDiffuse + totalSpecular + totalEmissiveRadiance;
	#ifdef USE_SHEEN
		float sheenEnergyComp = 1.0 - 0.157 * max3( material.sheenColor );
		outgoingLight = outgoingLight * sheenEnergyComp + sheenSpecularDirect + sheenSpecularIndirect;
	#endif
	#ifdef USE_CLEARCOAT
		float dotNVcc = saturate( dot( geometryClearcoatNormal, geometryViewDir ) );
		vec3 Fcc = F_Schlick( material.clearcoatF0, material.clearcoatF90, dotNVcc );
		outgoingLight = outgoingLight * ( 1.0 - material.clearcoat * Fcc ) + ( clearcoatSpecularDirect + clearcoatSpecularIndirect ) * material.clearcoat;
	#endif
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,Yg=`#define TOON
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,jg=`#define TOON
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <gradientmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_toon_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_toon_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,Zg=`uniform float size;
uniform float scale;
#include <common>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
#ifdef USE_POINTS_UV
	varying vec2 vUv;
	uniform mat3 uvTransform;
#endif
void main() {
	#ifdef USE_POINTS_UV
		vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	#endif
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	gl_PointSize = size;
	#ifdef USE_SIZEATTENUATION
		bool isPerspective = isPerspectiveMatrix( projectionMatrix );
		if ( isPerspective ) gl_PointSize *= ( scale / - mvPosition.z );
	#endif
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
	#include <fog_vertex>
}`,Jg=`uniform vec3 diffuse;
uniform float opacity;
#include <common>
#include <color_pars_fragment>
#include <map_particle_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_particle_fragment>
	#include <color_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,Qg=`#include <common>
#include <batching_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <shadowmap_pars_vertex>
void main() {
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,ev=`uniform vec3 color;
uniform float opacity;
#include <common>
#include <packing>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <logdepthbuf_pars_fragment>
#include <shadowmap_pars_fragment>
#include <shadowmask_pars_fragment>
void main() {
	#include <logdepthbuf_fragment>
	gl_FragColor = vec4( color, opacity * ( 1.0 - getShadowMask() ) );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
}`,tv=`uniform float rotation;
uniform vec2 center;
#include <common>
#include <uv_pars_vertex>
#include <fog_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	vec4 mvPosition = modelViewMatrix[ 3 ];
	vec2 scale = vec2( length( modelMatrix[ 0 ].xyz ), length( modelMatrix[ 1 ].xyz ) );
	#ifndef USE_SIZEATTENUATION
		bool isPerspective = isPerspectiveMatrix( projectionMatrix );
		if ( isPerspective ) scale *= - mvPosition.z;
	#endif
	vec2 alignedPosition = ( position.xy - ( center - vec2( 0.5 ) ) ) * scale;
	vec2 rotatedPosition;
	rotatedPosition.x = cos( rotation ) * alignedPosition.x - sin( rotation ) * alignedPosition.y;
	rotatedPosition.y = sin( rotation ) * alignedPosition.x + cos( rotation ) * alignedPosition.y;
	mvPosition.xy += rotatedPosition;
	gl_Position = projectionMatrix * mvPosition;
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`,nv=`uniform vec3 diffuse;
uniform float opacity;
#include <common>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
}`,Ke={alphahash_fragment:Tm,alphahash_pars_fragment:Em,alphamap_fragment:wm,alphamap_pars_fragment:Am,alphatest_fragment:Rm,alphatest_pars_fragment:Cm,aomap_fragment:Pm,aomap_pars_fragment:Lm,batching_pars_vertex:Im,batching_vertex:Dm,begin_vertex:Nm,beginnormal_vertex:Um,bsdfs:Fm,iridescence_fragment:Om,bumpmap_pars_fragment:km,clipping_planes_fragment:Bm,clipping_planes_pars_fragment:zm,clipping_planes_pars_vertex:Hm,clipping_planes_vertex:Vm,color_fragment:Gm,color_pars_fragment:Wm,color_pars_vertex:Xm,color_vertex:qm,common:Km,cube_uv_reflection_fragment:$m,defaultnormal_vertex:Ym,displacementmap_pars_vertex:jm,displacementmap_vertex:Zm,emissivemap_fragment:Jm,emissivemap_pars_fragment:Qm,colorspace_fragment:e0,colorspace_pars_fragment:t0,envmap_fragment:n0,envmap_common_pars_fragment:i0,envmap_pars_fragment:s0,envmap_pars_vertex:r0,envmap_physical_pars_fragment:g0,envmap_vertex:o0,fog_vertex:a0,fog_pars_vertex:l0,fog_fragment:c0,fog_pars_fragment:u0,gradientmap_pars_fragment:h0,lightmap_pars_fragment:f0,lights_lambert_fragment:d0,lights_lambert_pars_fragment:p0,lights_pars_begin:m0,lights_toon_fragment:v0,lights_toon_pars_fragment:x0,lights_phong_fragment:_0,lights_phong_pars_fragment:y0,lights_physical_fragment:M0,lights_physical_pars_fragment:S0,lights_fragment_begin:b0,lights_fragment_maps:T0,lights_fragment_end:E0,logdepthbuf_fragment:w0,logdepthbuf_pars_fragment:A0,logdepthbuf_pars_vertex:R0,logdepthbuf_vertex:C0,map_fragment:P0,map_pars_fragment:L0,map_particle_fragment:I0,map_particle_pars_fragment:D0,metalnessmap_fragment:N0,metalnessmap_pars_fragment:U0,morphinstance_vertex:F0,morphcolor_vertex:O0,morphnormal_vertex:k0,morphtarget_pars_vertex:B0,morphtarget_vertex:z0,normal_fragment_begin:H0,normal_fragment_maps:V0,normal_pars_fragment:G0,normal_pars_vertex:W0,normal_vertex:X0,normalmap_pars_fragment:q0,clearcoat_normal_fragment_begin:K0,clearcoat_normal_fragment_maps:$0,clearcoat_pars_fragment:Y0,iridescence_pars_fragment:j0,opaque_fragment:Z0,packing:J0,premultiplied_alpha_fragment:Q0,project_vertex:eg,dithering_fragment:tg,dithering_pars_fragment:ng,roughnessmap_fragment:ig,roughnessmap_pars_fragment:sg,shadowmap_pars_fragment:rg,shadowmap_pars_vertex:og,shadowmap_vertex:ag,shadowmask_pars_fragment:lg,skinbase_vertex:cg,skinning_pars_vertex:ug,skinning_vertex:hg,skinnormal_vertex:fg,specularmap_fragment:dg,specularmap_pars_fragment:pg,tonemapping_fragment:mg,tonemapping_pars_fragment:gg,transmission_fragment:vg,transmission_pars_fragment:xg,uv_pars_fragment:_g,uv_pars_vertex:yg,uv_vertex:Mg,worldpos_vertex:Sg,background_vert:bg,background_frag:Tg,backgroundCube_vert:Eg,backgroundCube_frag:wg,cube_vert:Ag,cube_frag:Rg,depth_vert:Cg,depth_frag:Pg,distanceRGBA_vert:Lg,distanceRGBA_frag:Ig,equirect_vert:Dg,equirect_frag:Ng,linedashed_vert:Ug,linedashed_frag:Fg,meshbasic_vert:Og,meshbasic_frag:kg,meshlambert_vert:Bg,meshlambert_frag:zg,meshmatcap_vert:Hg,meshmatcap_frag:Vg,meshnormal_vert:Gg,meshnormal_frag:Wg,meshphong_vert:Xg,meshphong_frag:qg,meshphysical_vert:Kg,meshphysical_frag:$g,meshtoon_vert:Yg,meshtoon_frag:jg,points_vert:Zg,points_frag:Jg,shadow_vert:Qg,shadow_frag:ev,sprite_vert:tv,sprite_frag:nv},ge={common:{diffuse:{value:new Ue(16777215)},opacity:{value:1},map:{value:null},mapTransform:{value:new Ce},alphaMap:{value:null},alphaMapTransform:{value:new Ce},alphaTest:{value:0}},specularmap:{specularMap:{value:null},specularMapTransform:{value:new Ce}},envmap:{envMap:{value:null},envMapRotation:{value:new Ce},flipEnvMap:{value:-1},reflectivity:{value:1},ior:{value:1.5},refractionRatio:{value:.98}},aomap:{aoMap:{value:null},aoMapIntensity:{value:1},aoMapTransform:{value:new Ce}},lightmap:{lightMap:{value:null},lightMapIntensity:{value:1},lightMapTransform:{value:new Ce}},bumpmap:{bumpMap:{value:null},bumpMapTransform:{value:new Ce},bumpScale:{value:1}},normalmap:{normalMap:{value:null},normalMapTransform:{value:new Ce},normalScale:{value:new ne(1,1)}},displacementmap:{displacementMap:{value:null},displacementMapTransform:{value:new Ce},displacementScale:{value:1},displacementBias:{value:0}},emissivemap:{emissiveMap:{value:null},emissiveMapTransform:{value:new Ce}},metalnessmap:{metalnessMap:{value:null},metalnessMapTransform:{value:new Ce}},roughnessmap:{roughnessMap:{value:null},roughnessMapTransform:{value:new Ce}},gradientmap:{gradientMap:{value:null}},fog:{fogDensity:{value:25e-5},fogNear:{value:1},fogFar:{value:2e3},fogColor:{value:new Ue(16777215)}},lights:{ambientLightColor:{value:[]},lightProbe:{value:[]},directionalLights:{value:[],properties:{direction:{},color:{}}},directionalLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},directionalShadowMap:{value:[]},directionalShadowMatrix:{value:[]},spotLights:{value:[],properties:{color:{},position:{},direction:{},distance:{},coneCos:{},penumbraCos:{},decay:{}}},spotLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},spotLightMap:{value:[]},spotShadowMap:{value:[]},spotLightMatrix:{value:[]},pointLights:{value:[],properties:{color:{},position:{},decay:{},distance:{}}},pointLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{},shadowCameraNear:{},shadowCameraFar:{}}},pointShadowMap:{value:[]},pointShadowMatrix:{value:[]},hemisphereLights:{value:[],properties:{direction:{},skyColor:{},groundColor:{}}},rectAreaLights:{value:[],properties:{color:{},position:{},width:{},height:{}}},ltc_1:{value:null},ltc_2:{value:null}},points:{diffuse:{value:new Ue(16777215)},opacity:{value:1},size:{value:1},scale:{value:1},map:{value:null},alphaMap:{value:null},alphaMapTransform:{value:new Ce},alphaTest:{value:0},uvTransform:{value:new Ce}},sprite:{diffuse:{value:new Ue(16777215)},opacity:{value:1},center:{value:new ne(.5,.5)},rotation:{value:0},map:{value:null},mapTransform:{value:new Ce},alphaMap:{value:null},alphaMapTransform:{value:new Ce},alphaTest:{value:0}}},wn={basic:{uniforms:zt([ge.common,ge.specularmap,ge.envmap,ge.aomap,ge.lightmap,ge.fog]),vertexShader:Ke.meshbasic_vert,fragmentShader:Ke.meshbasic_frag},lambert:{uniforms:zt([ge.common,ge.specularmap,ge.envmap,ge.aomap,ge.lightmap,ge.emissivemap,ge.bumpmap,ge.normalmap,ge.displacementmap,ge.fog,ge.lights,{emissive:{value:new Ue(0)}}]),vertexShader:Ke.meshlambert_vert,fragmentShader:Ke.meshlambert_frag},phong:{uniforms:zt([ge.common,ge.specularmap,ge.envmap,ge.aomap,ge.lightmap,ge.emissivemap,ge.bumpmap,ge.normalmap,ge.displacementmap,ge.fog,ge.lights,{emissive:{value:new Ue(0)},specular:{value:new Ue(1118481)},shininess:{value:30}}]),vertexShader:Ke.meshphong_vert,fragmentShader:Ke.meshphong_frag},standard:{uniforms:zt([ge.common,ge.envmap,ge.aomap,ge.lightmap,ge.emissivemap,ge.bumpmap,ge.normalmap,ge.displacementmap,ge.roughnessmap,ge.metalnessmap,ge.fog,ge.lights,{emissive:{value:new Ue(0)},roughness:{value:1},metalness:{value:0},envMapIntensity:{value:1}}]),vertexShader:Ke.meshphysical_vert,fragmentShader:Ke.meshphysical_frag},toon:{uniforms:zt([ge.common,ge.aomap,ge.lightmap,ge.emissivemap,ge.bumpmap,ge.normalmap,ge.displacementmap,ge.gradientmap,ge.fog,ge.lights,{emissive:{value:new Ue(0)}}]),vertexShader:Ke.meshtoon_vert,fragmentShader:Ke.meshtoon_frag},matcap:{uniforms:zt([ge.common,ge.bumpmap,ge.normalmap,ge.displacementmap,ge.fog,{matcap:{value:null}}]),vertexShader:Ke.meshmatcap_vert,fragmentShader:Ke.meshmatcap_frag},points:{uniforms:zt([ge.points,ge.fog]),vertexShader:Ke.points_vert,fragmentShader:Ke.points_frag},dashed:{uniforms:zt([ge.common,ge.fog,{scale:{value:1},dashSize:{value:1},totalSize:{value:2}}]),vertexShader:Ke.linedashed_vert,fragmentShader:Ke.linedashed_frag},depth:{uniforms:zt([ge.common,ge.displacementmap]),vertexShader:Ke.depth_vert,fragmentShader:Ke.depth_frag},normal:{uniforms:zt([ge.common,ge.bumpmap,ge.normalmap,ge.displacementmap,{opacity:{value:1}}]),vertexShader:Ke.meshnormal_vert,fragmentShader:Ke.meshnormal_frag},sprite:{uniforms:zt([ge.sprite,ge.fog]),vertexShader:Ke.sprite_vert,fragmentShader:Ke.sprite_frag},background:{uniforms:{uvTransform:{value:new Ce},t2D:{value:null},backgroundIntensity:{value:1}},vertexShader:Ke.background_vert,fragmentShader:Ke.background_frag},backgroundCube:{uniforms:{envMap:{value:null},flipEnvMap:{value:-1},backgroundBlurriness:{value:0},backgroundIntensity:{value:1},backgroundRotation:{value:new Ce}},vertexShader:Ke.backgroundCube_vert,fragmentShader:Ke.backgroundCube_frag},cube:{uniforms:{tCube:{value:null},tFlip:{value:-1},opacity:{value:1}},vertexShader:Ke.cube_vert,fragmentShader:Ke.cube_frag},equirect:{uniforms:{tEquirect:{value:null}},vertexShader:Ke.equirect_vert,fragmentShader:Ke.equirect_frag},distanceRGBA:{uniforms:zt([ge.common,ge.displacementmap,{referencePosition:{value:new w},nearDistance:{value:1},farDistance:{value:1e3}}]),vertexShader:Ke.distanceRGBA_vert,fragmentShader:Ke.distanceRGBA_frag},shadow:{uniforms:zt([ge.lights,ge.fog,{color:{value:new Ue(0)},opacity:{value:1}}]),vertexShader:Ke.shadow_vert,fragmentShader:Ke.shadow_frag}};wn.physical={uniforms:zt([wn.standard.uniforms,{clearcoat:{value:0},clearcoatMap:{value:null},clearcoatMapTransform:{value:new Ce},clearcoatNormalMap:{value:null},clearcoatNormalMapTransform:{value:new Ce},clearcoatNormalScale:{value:new ne(1,1)},clearcoatRoughness:{value:0},clearcoatRoughnessMap:{value:null},clearcoatRoughnessMapTransform:{value:new Ce},dispersion:{value:0},iridescence:{value:0},iridescenceMap:{value:null},iridescenceMapTransform:{value:new Ce},iridescenceIOR:{value:1.3},iridescenceThicknessMinimum:{value:100},iridescenceThicknessMaximum:{value:400},iridescenceThicknessMap:{value:null},iridescenceThicknessMapTransform:{value:new Ce},sheen:{value:0},sheenColor:{value:new Ue(0)},sheenColorMap:{value:null},sheenColorMapTransform:{value:new Ce},sheenRoughness:{value:1},sheenRoughnessMap:{value:null},sheenRoughnessMapTransform:{value:new Ce},transmission:{value:0},transmissionMap:{value:null},transmissionMapTransform:{value:new Ce},transmissionSamplerSize:{value:new ne},transmissionSamplerMap:{value:null},thickness:{value:0},thicknessMap:{value:null},thicknessMapTransform:{value:new Ce},attenuationDistance:{value:0},attenuationColor:{value:new Ue(0)},specularColor:{value:new Ue(1,1,1)},specularColorMap:{value:null},specularColorMapTransform:{value:new Ce},specularIntensity:{value:1},specularIntensityMap:{value:null},specularIntensityMapTransform:{value:new Ce},anisotropyVector:{value:new ne},anisotropyMap:{value:null},anisotropyMapTransform:{value:new Ce}}]),vertexShader:Ke.meshphysical_vert,fragmentShader:Ke.meshphysical_frag};const Zr={r:0,b:0,g:0},yi=new Xt,iv=new Le;function sv(s,e,t,n,i,r,o){const a=new Ue(0);let l=r===!0?0:1,c,u,h=null,f=0,d=null;function p(y){let x=y.isScene===!0?y.background:null;return x&&x.isTexture&&(x=(y.backgroundBlurriness>0?t:e).get(x)),x}function v(y){let x=!1;const E=p(y);E===null?m(a,l):E&&E.isColor&&(m(E,1),x=!0);const A=s.xr.getEnvironmentBlendMode();A==="additive"?n.buffers.color.setClear(0,0,0,1,o):A==="alpha-blend"&&n.buffers.color.setClear(0,0,0,0,o),(s.autoClear||x)&&(n.buffers.depth.setTest(!0),n.buffers.depth.setMask(!0),n.buffers.color.setMask(!0),s.clear(s.autoClearColor,s.autoClearDepth,s.autoClearStencil))}function g(y,x){const E=p(x);E&&(E.isCubeTexture||E.mapping===bo)?(u===void 0&&(u=new Ye(new Qn(1,1,1),new Tt({name:"BackgroundCubeMaterial",uniforms:ps(wn.backgroundCube.uniforms),vertexShader:wn.backgroundCube.vertexShader,fragmentShader:wn.backgroundCube.fragmentShader,side:Lt,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),u.geometry.deleteAttribute("normal"),u.geometry.deleteAttribute("uv"),u.onBeforeRender=function(A,R,L){this.matrixWorld.copyPosition(L.matrixWorld)},Object.defineProperty(u.material,"envMap",{get:function(){return this.uniforms.envMap.value}}),i.update(u)),yi.copy(x.backgroundRotation),yi.x*=-1,yi.y*=-1,yi.z*=-1,E.isCubeTexture&&E.isRenderTargetTexture===!1&&(yi.y*=-1,yi.z*=-1),u.material.uniforms.envMap.value=E,u.material.uniforms.flipEnvMap.value=E.isCubeTexture&&E.isRenderTargetTexture===!1?-1:1,u.material.uniforms.backgroundBlurriness.value=x.backgroundBlurriness,u.material.uniforms.backgroundIntensity.value=x.backgroundIntensity,u.material.uniforms.backgroundRotation.value.setFromMatrix4(iv.makeRotationFromEuler(yi)),u.material.toneMapped=et.getTransfer(E.colorSpace)!==ct,(h!==E||f!==E.version||d!==s.toneMapping)&&(u.material.needsUpdate=!0,h=E,f=E.version,d=s.toneMapping),u.layers.enableAll(),y.unshift(u,u.geometry,u.material,0,0,null)):E&&E.isTexture&&(c===void 0&&(c=new Ye(new Zn(2,2),new Tt({name:"BackgroundMaterial",uniforms:ps(wn.background.uniforms),vertexShader:wn.background.vertexShader,fragmentShader:wn.background.fragmentShader,side:Yn,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),c.geometry.deleteAttribute("normal"),Object.defineProperty(c.material,"map",{get:function(){return this.uniforms.t2D.value}}),i.update(c)),c.material.uniforms.t2D.value=E,c.material.uniforms.backgroundIntensity.value=x.backgroundIntensity,c.material.toneMapped=et.getTransfer(E.colorSpace)!==ct,E.matrixAutoUpdate===!0&&E.updateMatrix(),c.material.uniforms.uvTransform.value.copy(E.matrix),(h!==E||f!==E.version||d!==s.toneMapping)&&(c.material.needsUpdate=!0,h=E,f=E.version,d=s.toneMapping),c.layers.enableAll(),y.unshift(c,c.geometry,c.material,0,0,null))}function m(y,x){y.getRGB(Zr,Th(s)),n.buffers.color.setClear(Zr.r,Zr.g,Zr.b,x,o)}function _(){u!==void 0&&(u.geometry.dispose(),u.material.dispose(),u=void 0),c!==void 0&&(c.geometry.dispose(),c.material.dispose(),c=void 0)}return{getClearColor:function(){return a},setClearColor:function(y,x=1){a.set(y),l=x,m(a,l)},getClearAlpha:function(){return l},setClearAlpha:function(y){l=y,m(a,l)},render:v,addToRenderList:g,dispose:_}}function rv(s,e){const t=s.getParameter(s.MAX_VERTEX_ATTRIBS),n={},i=f(null);let r=i,o=!1;function a(M,P,D,O,V){let B=!1;const W=h(O,D,P);r!==W&&(r=W,c(r.object)),B=d(M,O,D,V),B&&p(M,O,D,V),V!==null&&e.update(V,s.ELEMENT_ARRAY_BUFFER),(B||o)&&(o=!1,x(M,P,D,O),V!==null&&s.bindBuffer(s.ELEMENT_ARRAY_BUFFER,e.get(V).buffer))}function l(){return s.createVertexArray()}function c(M){return s.bindVertexArray(M)}function u(M){return s.deleteVertexArray(M)}function h(M,P,D){const O=D.wireframe===!0;let V=n[M.id];V===void 0&&(V={},n[M.id]=V);let B=V[P.id];B===void 0&&(B={},V[P.id]=B);let W=B[O];return W===void 0&&(W=f(l()),B[O]=W),W}function f(M){const P=[],D=[],O=[];for(let V=0;V<t;V++)P[V]=0,D[V]=0,O[V]=0;return{geometry:null,program:null,wireframe:!1,newAttributes:P,enabledAttributes:D,attributeDivisors:O,object:M,attributes:{},index:null}}function d(M,P,D,O){const V=r.attributes,B=P.attributes;let W=0;const K=D.getAttributes();for(const G in K)if(K[G].location>=0){const de=V[G];let pe=B[G];if(pe===void 0&&(G==="instanceMatrix"&&M.instanceMatrix&&(pe=M.instanceMatrix),G==="instanceColor"&&M.instanceColor&&(pe=M.instanceColor)),de===void 0||de.attribute!==pe||pe&&de.data!==pe.data)return!0;W++}return r.attributesNum!==W||r.index!==O}function p(M,P,D,O){const V={},B=P.attributes;let W=0;const K=D.getAttributes();for(const G in K)if(K[G].location>=0){let de=B[G];de===void 0&&(G==="instanceMatrix"&&M.instanceMatrix&&(de=M.instanceMatrix),G==="instanceColor"&&M.instanceColor&&(de=M.instanceColor));const pe={};pe.attribute=de,de&&de.data&&(pe.data=de.data),V[G]=pe,W++}r.attributes=V,r.attributesNum=W,r.index=O}function v(){const M=r.newAttributes;for(let P=0,D=M.length;P<D;P++)M[P]=0}function g(M){m(M,0)}function m(M,P){const D=r.newAttributes,O=r.enabledAttributes,V=r.attributeDivisors;D[M]=1,O[M]===0&&(s.enableVertexAttribArray(M),O[M]=1),V[M]!==P&&(s.vertexAttribDivisor(M,P),V[M]=P)}function _(){const M=r.newAttributes,P=r.enabledAttributes;for(let D=0,O=P.length;D<O;D++)P[D]!==M[D]&&(s.disableVertexAttribArray(D),P[D]=0)}function y(M,P,D,O,V,B,W){W===!0?s.vertexAttribIPointer(M,P,D,V,B):s.vertexAttribPointer(M,P,D,O,V,B)}function x(M,P,D,O){v();const V=O.attributes,B=D.getAttributes(),W=P.defaultAttributeValues;for(const K in B){const G=B[K];if(G.location>=0){let le=V[K];if(le===void 0&&(K==="instanceMatrix"&&M.instanceMatrix&&(le=M.instanceMatrix),K==="instanceColor"&&M.instanceColor&&(le=M.instanceColor)),le!==void 0){const de=le.normalized,pe=le.itemSize,Ne=e.get(le);if(Ne===void 0)continue;const Xe=Ne.buffer,qe=Ne.type,je=Ne.bytesPerElement,$=qe===s.INT||qe===s.UNSIGNED_INT||le.gpuType===Ll;if(le.isInterleavedBufferAttribute){const Q=le.data,me=Q.stride,be=le.offset;if(Q.isInstancedInterleavedBuffer){for(let ye=0;ye<G.locationSize;ye++)m(G.location+ye,Q.meshPerAttribute);M.isInstancedMesh!==!0&&O._maxInstanceCount===void 0&&(O._maxInstanceCount=Q.meshPerAttribute*Q.count)}else for(let ye=0;ye<G.locationSize;ye++)g(G.location+ye);s.bindBuffer(s.ARRAY_BUFFER,Xe);for(let ye=0;ye<G.locationSize;ye++)y(G.location+ye,pe/G.locationSize,qe,de,me*je,(be+pe/G.locationSize*ye)*je,$)}else{if(le.isInstancedBufferAttribute){for(let Q=0;Q<G.locationSize;Q++)m(G.location+Q,le.meshPerAttribute);M.isInstancedMesh!==!0&&O._maxInstanceCount===void 0&&(O._maxInstanceCount=le.meshPerAttribute*le.count)}else for(let Q=0;Q<G.locationSize;Q++)g(G.location+Q);s.bindBuffer(s.ARRAY_BUFFER,Xe);for(let Q=0;Q<G.locationSize;Q++)y(G.location+Q,pe/G.locationSize,qe,de,pe*je,pe/G.locationSize*Q*je,$)}}else if(W!==void 0){const de=W[K];if(de!==void 0)switch(de.length){case 2:s.vertexAttrib2fv(G.location,de);break;case 3:s.vertexAttrib3fv(G.location,de);break;case 4:s.vertexAttrib4fv(G.location,de);break;default:s.vertexAttrib1fv(G.location,de)}}}}_()}function E(){L();for(const M in n){const P=n[M];for(const D in P){const O=P[D];for(const V in O)u(O[V].object),delete O[V];delete P[D]}delete n[M]}}function A(M){if(n[M.id]===void 0)return;const P=n[M.id];for(const D in P){const O=P[D];for(const V in O)u(O[V].object),delete O[V];delete P[D]}delete n[M.id]}function R(M){for(const P in n){const D=n[P];if(D[M.id]===void 0)continue;const O=D[M.id];for(const V in O)u(O[V].object),delete O[V];delete D[M.id]}}function L(){b(),o=!0,r!==i&&(r=i,c(r.object))}function b(){i.geometry=null,i.program=null,i.wireframe=!1}return{setup:a,reset:L,resetDefaultState:b,dispose:E,releaseStatesOfGeometry:A,releaseStatesOfProgram:R,initAttributes:v,enableAttribute:g,disableUnusedAttributes:_}}function ov(s,e,t){let n;function i(c){n=c}function r(c,u){s.drawArrays(n,c,u),t.update(u,n,1)}function o(c,u,h){h!==0&&(s.drawArraysInstanced(n,c,u,h),t.update(u,n,h))}function a(c,u,h){if(h===0)return;e.get("WEBGL_multi_draw").multiDrawArraysWEBGL(n,c,0,u,0,h);let d=0;for(let p=0;p<h;p++)d+=u[p];t.update(d,n,1)}function l(c,u,h,f){if(h===0)return;const d=e.get("WEBGL_multi_draw");if(d===null)for(let p=0;p<c.length;p++)o(c[p],u[p],f[p]);else{d.multiDrawArraysInstancedWEBGL(n,c,0,u,0,f,0,h);let p=0;for(let v=0;v<h;v++)p+=u[v]*f[v];t.update(p,n,1)}}this.setMode=i,this.render=r,this.renderInstances=o,this.renderMultiDraw=a,this.renderMultiDrawInstances=l}function av(s,e,t,n){let i;function r(){if(i!==void 0)return i;if(e.has("EXT_texture_filter_anisotropic")===!0){const R=e.get("EXT_texture_filter_anisotropic");i=s.getParameter(R.MAX_TEXTURE_MAX_ANISOTROPY_EXT)}else i=0;return i}function o(R){return!(R!==Nt&&n.convert(R)!==s.getParameter(s.IMPLEMENTATION_COLOR_READ_FORMAT))}function a(R){const L=R===nn&&(e.has("EXT_color_buffer_half_float")||e.has("EXT_color_buffer_float"));return!(R!==yn&&n.convert(R)!==s.getParameter(s.IMPLEMENTATION_COLOR_READ_TYPE)&&R!==gn&&!L)}function l(R){if(R==="highp"){if(s.getShaderPrecisionFormat(s.VERTEX_SHADER,s.HIGH_FLOAT).precision>0&&s.getShaderPrecisionFormat(s.FRAGMENT_SHADER,s.HIGH_FLOAT).precision>0)return"highp";R="mediump"}return R==="mediump"&&s.getShaderPrecisionFormat(s.VERTEX_SHADER,s.MEDIUM_FLOAT).precision>0&&s.getShaderPrecisionFormat(s.FRAGMENT_SHADER,s.MEDIUM_FLOAT).precision>0?"mediump":"lowp"}let c=t.precision!==void 0?t.precision:"highp";const u=l(c);u!==c&&(console.warn("THREE.WebGLRenderer:",c,"not supported, using",u,"instead."),c=u);const h=t.logarithmicDepthBuffer===!0,f=t.reversedDepthBuffer===!0&&e.has("EXT_clip_control"),d=s.getParameter(s.MAX_TEXTURE_IMAGE_UNITS),p=s.getParameter(s.MAX_VERTEX_TEXTURE_IMAGE_UNITS),v=s.getParameter(s.MAX_TEXTURE_SIZE),g=s.getParameter(s.MAX_CUBE_MAP_TEXTURE_SIZE),m=s.getParameter(s.MAX_VERTEX_ATTRIBS),_=s.getParameter(s.MAX_VERTEX_UNIFORM_VECTORS),y=s.getParameter(s.MAX_VARYING_VECTORS),x=s.getParameter(s.MAX_FRAGMENT_UNIFORM_VECTORS),E=p>0,A=s.getParameter(s.MAX_SAMPLES);return{isWebGL2:!0,getMaxAnisotropy:r,getMaxPrecision:l,textureFormatReadable:o,textureTypeReadable:a,precision:c,logarithmicDepthBuffer:h,reversedDepthBuffer:f,maxTextures:d,maxVertexTextures:p,maxTextureSize:v,maxCubemapSize:g,maxAttributes:m,maxVertexUniforms:_,maxVaryings:y,maxFragmentUniforms:x,vertexTextures:E,maxSamples:A}}function lv(s){const e=this;let t=null,n=0,i=!1,r=!1;const o=new bi,a=new Ce,l={value:null,needsUpdate:!1};this.uniform=l,this.numPlanes=0,this.numIntersection=0,this.init=function(h,f){const d=h.length!==0||f||n!==0||i;return i=f,n=h.length,d},this.beginShadows=function(){r=!0,u(null)},this.endShadows=function(){r=!1},this.setGlobalState=function(h,f){t=u(h,f,0)},this.setState=function(h,f,d){const p=h.clippingPlanes,v=h.clipIntersection,g=h.clipShadows,m=s.get(h);if(!i||p===null||p.length===0||r&&!g)r?u(null):c();else{const _=r?0:n,y=_*4;let x=m.clippingState||null;l.value=x,x=u(p,f,y,d);for(let E=0;E!==y;++E)x[E]=t[E];m.clippingState=x,this.numIntersection=v?this.numPlanes:0,this.numPlanes+=_}};function c(){l.value!==t&&(l.value=t,l.needsUpdate=n>0),e.numPlanes=n,e.numIntersection=0}function u(h,f,d,p){const v=h!==null?h.length:0;let g=null;if(v!==0){if(g=l.value,p!==!0||g===null){const m=d+v*4,_=f.matrixWorldInverse;a.getNormalMatrix(_),(g===null||g.length<m)&&(g=new Float32Array(m));for(let y=0,x=d;y!==v;++y,x+=4)o.copy(h[y]).applyMatrix4(_,a),o.normal.toArray(g,x),g[x+3]=o.constant}l.value=g,l.needsUpdate=!0}return e.numPlanes=v,e.numIntersection=0,g}}function cv(s){let e=new WeakMap;function t(o,a){return a===Oa?o.mapping=hs:a===ka&&(o.mapping=fs),o}function n(o){if(o&&o.isTexture){const a=o.mapping;if(a===Oa||a===ka)if(e.has(o)){const l=e.get(o).texture;return t(l,o.mapping)}else{const l=o.image;if(l&&l.height>0){const c=new Eo(l.height);return c.fromEquirectangularTexture(s,o),e.set(o,c),o.addEventListener("dispose",i),t(c.texture,o.mapping)}else return null}}return o}function i(o){const a=o.target;a.removeEventListener("dispose",i);const l=e.get(a);l!==void 0&&(e.delete(a),l.dispose())}function r(){e=new WeakMap}return{get:n,dispose:r}}const ss=4,pu=[.125,.215,.35,.446,.526,.582],Ei=20,da=new Ni,mu=new Ue;let pa=null,ma=0,ga=0,va=!1;const Ti=(1+Math.sqrt(5))/2,ts=1/Ti,gu=[new w(-Ti,ts,0),new w(Ti,ts,0),new w(-ts,0,Ti),new w(ts,0,Ti),new w(0,Ti,-ts),new w(0,Ti,ts),new w(-1,1,-1),new w(1,1,-1),new w(-1,1,1),new w(1,1,1)],uv=new w;class vu{constructor(e){this._renderer=e,this._pingPongRenderTarget=null,this._lodMax=0,this._cubeSize=0,this._lodPlanes=[],this._sizeLods=[],this._sigmas=[],this._blurMaterial=null,this._cubemapMaterial=null,this._equirectMaterial=null,this._compileMaterial(this._blurMaterial)}fromScene(e,t=0,n=.1,i=100,r={}){const{size:o=256,position:a=uv}=r;pa=this._renderer.getRenderTarget(),ma=this._renderer.getActiveCubeFace(),ga=this._renderer.getActiveMipmapLevel(),va=this._renderer.xr.enabled,this._renderer.xr.enabled=!1,this._setSize(o);const l=this._allocateTargets();return l.depthBuffer=!0,this._sceneToCubeUV(e,n,i,l,a),t>0&&this._blur(l,0,0,t),this._applyPMREM(l),this._cleanup(l),l}fromEquirectangular(e,t=null){return this._fromTexture(e,t)}fromCubemap(e,t=null){return this._fromTexture(e,t)}compileCubemapShader(){this._cubemapMaterial===null&&(this._cubemapMaterial=yu(),this._compileMaterial(this._cubemapMaterial))}compileEquirectangularShader(){this._equirectMaterial===null&&(this._equirectMaterial=_u(),this._compileMaterial(this._equirectMaterial))}dispose(){this._dispose(),this._cubemapMaterial!==null&&this._cubemapMaterial.dispose(),this._equirectMaterial!==null&&this._equirectMaterial.dispose()}_setSize(e){this._lodMax=Math.floor(Math.log2(e)),this._cubeSize=Math.pow(2,this._lodMax)}_dispose(){this._blurMaterial!==null&&this._blurMaterial.dispose(),this._pingPongRenderTarget!==null&&this._pingPongRenderTarget.dispose();for(let e=0;e<this._lodPlanes.length;e++)this._lodPlanes[e].dispose()}_cleanup(e){this._renderer.setRenderTarget(pa,ma,ga),this._renderer.xr.enabled=va,e.scissorTest=!1,Jr(e,0,0,e.width,e.height)}_fromTexture(e,t){e.mapping===hs||e.mapping===fs?this._setSize(e.image.length===0?16:e.image[0].width||e.image[0].image.width):this._setSize(e.image.width/4),pa=this._renderer.getRenderTarget(),ma=this._renderer.getActiveCubeFace(),ga=this._renderer.getActiveMipmapLevel(),va=this._renderer.xr.enabled,this._renderer.xr.enabled=!1;const n=t||this._allocateTargets();return this._textureToCubeUV(e,n),this._applyPMREM(n),this._cleanup(n),n}_allocateTargets(){const e=3*Math.max(this._cubeSize,112),t=4*this._cubeSize,n={magFilter:_t,minFilter:_t,generateMipmaps:!1,type:nn,format:Nt,colorSpace:Wt,depthBuffer:!1},i=xu(e,t,n);if(this._pingPongRenderTarget===null||this._pingPongRenderTarget.width!==e||this._pingPongRenderTarget.height!==t){this._pingPongRenderTarget!==null&&this._dispose(),this._pingPongRenderTarget=xu(e,t,n);const{_lodMax:r}=this;({sizeLods:this._sizeLods,lodPlanes:this._lodPlanes,sigmas:this._sigmas}=hv(r)),this._blurMaterial=fv(r,e,t)}return i}_compileMaterial(e){const t=new Ye(this._lodPlanes[0],e);this._renderer.compile(t,da)}_sceneToCubeUV(e,t,n,i,r){const l=new Dt(90,1,t,n),c=[1,-1,1,1,1,1],u=[1,1,1,-1,-1,-1],h=this._renderer,f=h.autoClear,d=h.toneMapping;h.getClearColor(mu),h.toneMapping=hi,h.autoClear=!1,h.state.buffers.depth.getReversed()&&(h.setRenderTarget(i),h.clearDepth(),h.setRenderTarget(null));const v=new Kt({name:"PMREM.Background",side:Lt,depthWrite:!1,depthTest:!1}),g=new Ye(new Qn,v);let m=!1;const _=e.background;_?_.isColor&&(v.color.copy(_),e.background=null,m=!0):(v.color.copy(mu),m=!0);for(let y=0;y<6;y++){const x=y%3;x===0?(l.up.set(0,c[y],0),l.position.set(r.x,r.y,r.z),l.lookAt(r.x+u[y],r.y,r.z)):x===1?(l.up.set(0,0,c[y]),l.position.set(r.x,r.y,r.z),l.lookAt(r.x,r.y+u[y],r.z)):(l.up.set(0,c[y],0),l.position.set(r.x,r.y,r.z),l.lookAt(r.x,r.y,r.z+u[y]));const E=this._cubeSize;Jr(i,x*E,y>2?E:0,E,E),h.setRenderTarget(i),m&&h.render(g,l),h.render(e,l)}g.geometry.dispose(),g.material.dispose(),h.toneMapping=d,h.autoClear=f,e.background=_}_textureToCubeUV(e,t){const n=this._renderer,i=e.mapping===hs||e.mapping===fs;i?(this._cubemapMaterial===null&&(this._cubemapMaterial=yu()),this._cubemapMaterial.uniforms.flipEnvMap.value=e.isRenderTargetTexture===!1?-1:1):this._equirectMaterial===null&&(this._equirectMaterial=_u());const r=i?this._cubemapMaterial:this._equirectMaterial,o=new Ye(this._lodPlanes[0],r),a=r.uniforms;a.envMap.value=e;const l=this._cubeSize;Jr(t,0,0,3*l,2*l),n.setRenderTarget(t),n.render(o,da)}_applyPMREM(e){const t=this._renderer,n=t.autoClear;t.autoClear=!1;const i=this._lodPlanes.length;for(let r=1;r<i;r++){const o=Math.sqrt(this._sigmas[r]*this._sigmas[r]-this._sigmas[r-1]*this._sigmas[r-1]),a=gu[(i-r-1)%gu.length];this._blur(e,r-1,r,o,a)}t.autoClear=n}_blur(e,t,n,i,r){const o=this._pingPongRenderTarget;this._halfBlur(e,o,t,n,i,"latitudinal",r),this._halfBlur(o,e,n,n,i,"longitudinal",r)}_halfBlur(e,t,n,i,r,o,a){const l=this._renderer,c=this._blurMaterial;o!=="latitudinal"&&o!=="longitudinal"&&console.error("blur direction must be either latitudinal or longitudinal!");const u=3,h=new Ye(this._lodPlanes[i],c),f=c.uniforms,d=this._sizeLods[n]-1,p=isFinite(r)?Math.PI/(2*d):2*Math.PI/(2*Ei-1),v=r/p,g=isFinite(r)?1+Math.floor(u*v):Ei;g>Ei&&console.warn(`sigmaRadians, ${r}, is too large and will clip, as it requested ${g} samples when the maximum is set to ${Ei}`);const m=[];let _=0;for(let R=0;R<Ei;++R){const L=R/v,b=Math.exp(-L*L/2);m.push(b),R===0?_+=b:R<g&&(_+=2*b)}for(let R=0;R<m.length;R++)m[R]=m[R]/_;f.envMap.value=e.texture,f.samples.value=g,f.weights.value=m,f.latitudinal.value=o==="latitudinal",a&&(f.poleAxis.value=a);const{_lodMax:y}=this;f.dTheta.value=p,f.mipInt.value=y-n;const x=this._sizeLods[i],E=3*x*(i>y-ss?i-y+ss:0),A=4*(this._cubeSize-x);Jr(t,E,A,3*x,2*x),l.setRenderTarget(t),l.render(h,da)}}function hv(s){const e=[],t=[],n=[];let i=s;const r=s-ss+1+pu.length;for(let o=0;o<r;o++){const a=Math.pow(2,i);t.push(a);let l=1/a;o>s-ss?l=pu[o-s+ss-1]:o===0&&(l=0),n.push(l);const c=1/(a-2),u=-c,h=1+c,f=[u,u,h,u,h,h,u,u,h,h,u,h],d=6,p=6,v=3,g=2,m=1,_=new Float32Array(v*p*d),y=new Float32Array(g*p*d),x=new Float32Array(m*p*d);for(let A=0;A<d;A++){const R=A%3*2/3-1,L=A>2?0:-1,b=[R,L,0,R+2/3,L,0,R+2/3,L+1,0,R,L,0,R+2/3,L+1,0,R,L+1,0];_.set(b,v*p*A),y.set(f,g*p*A);const M=[A,A,A,A,A,A];x.set(M,m*p*A)}const E=new Et;E.setAttribute("position",new Gt(_,v)),E.setAttribute("uv",new Gt(y,g)),E.setAttribute("faceIndex",new Gt(x,m)),e.push(E),i>ss&&i--}return{lodPlanes:e,sizeLods:t,sigmas:n}}function xu(s,e,t){const n=new Ln(s,e,t);return n.texture.mapping=bo,n.texture.name="PMREM.cubeUv",n.scissorTest=!0,n}function Jr(s,e,t,n,i){s.viewport.set(e,t,n,i),s.scissor.set(e,t,n,i)}function fv(s,e,t){const n=new Float32Array(Ei),i=new w(0,1,0);return new Tt({name:"SphericalGaussianBlur",defines:{n:Ei,CUBEUV_TEXEL_WIDTH:1/e,CUBEUV_TEXEL_HEIGHT:1/t,CUBEUV_MAX_MIP:`${s}.0`},uniforms:{envMap:{value:null},samples:{value:1},weights:{value:n},latitudinal:{value:!1},dTheta:{value:0},mipInt:{value:0},poleAxis:{value:i}},vertexShader:nc(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;
			uniform int samples;
			uniform float weights[ n ];
			uniform bool latitudinal;
			uniform float dTheta;
			uniform float mipInt;
			uniform vec3 poleAxis;

			#define ENVMAP_TYPE_CUBE_UV
			#include <cube_uv_reflection_fragment>

			vec3 getSample( float theta, vec3 axis ) {

				float cosTheta = cos( theta );
				// Rodrigues' axis-angle rotation
				vec3 sampleDirection = vOutputDirection * cosTheta
					+ cross( axis, vOutputDirection ) * sin( theta )
					+ axis * dot( axis, vOutputDirection ) * ( 1.0 - cosTheta );

				return bilinearCubeUV( envMap, sampleDirection, mipInt );

			}

			void main() {

				vec3 axis = latitudinal ? poleAxis : cross( poleAxis, vOutputDirection );

				if ( all( equal( axis, vec3( 0.0 ) ) ) ) {

					axis = vec3( vOutputDirection.z, 0.0, - vOutputDirection.x );

				}

				axis = normalize( axis );

				gl_FragColor = vec4( 0.0, 0.0, 0.0, 1.0 );
				gl_FragColor.rgb += weights[ 0 ] * getSample( 0.0, axis );

				for ( int i = 1; i < n; i++ ) {

					if ( i >= samples ) {

						break;

					}

					float theta = dTheta * float( i );
					gl_FragColor.rgb += weights[ i ] * getSample( -1.0 * theta, axis );
					gl_FragColor.rgb += weights[ i ] * getSample( theta, axis );

				}

			}
		`,blending:ui,depthTest:!1,depthWrite:!1})}function _u(){return new Tt({name:"EquirectangularToCubeUV",uniforms:{envMap:{value:null}},vertexShader:nc(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;

			#include <common>

			void main() {

				vec3 outputDirection = normalize( vOutputDirection );
				vec2 uv = equirectUv( outputDirection );

				gl_FragColor = vec4( texture2D ( envMap, uv ).rgb, 1.0 );

			}
		`,blending:ui,depthTest:!1,depthWrite:!1})}function yu(){return new Tt({name:"CubemapToCubeUV",uniforms:{envMap:{value:null},flipEnvMap:{value:-1}},vertexShader:nc(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			uniform float flipEnvMap;

			varying vec3 vOutputDirection;

			uniform samplerCube envMap;

			void main() {

				gl_FragColor = textureCube( envMap, vec3( flipEnvMap * vOutputDirection.x, vOutputDirection.yz ) );

			}
		`,blending:ui,depthTest:!1,depthWrite:!1})}function nc(){return`

		precision mediump float;
		precision mediump int;

		attribute float faceIndex;

		varying vec3 vOutputDirection;

		// RH coordinate system; PMREM face-indexing convention
		vec3 getDirection( vec2 uv, float face ) {

			uv = 2.0 * uv - 1.0;

			vec3 direction = vec3( uv, 1.0 );

			if ( face == 0.0 ) {

				direction = direction.zyx; // ( 1, v, u ) pos x

			} else if ( face == 1.0 ) {

				direction = direction.xzy;
				direction.xz *= -1.0; // ( -u, 1, -v ) pos y

			} else if ( face == 2.0 ) {

				direction.x *= -1.0; // ( -u, v, 1 ) pos z

			} else if ( face == 3.0 ) {

				direction = direction.zyx;
				direction.xz *= -1.0; // ( -1, v, -u ) neg x

			} else if ( face == 4.0 ) {

				direction = direction.xzy;
				direction.xy *= -1.0; // ( -u, -1, v ) neg y

			} else if ( face == 5.0 ) {

				direction.z *= -1.0; // ( u, v, -1 ) neg z

			}

			return direction;

		}

		void main() {

			vOutputDirection = getDirection( uv, faceIndex );
			gl_Position = vec4( position, 1.0 );

		}
	`}function dv(s){let e=new WeakMap,t=null;function n(a){if(a&&a.isTexture){const l=a.mapping,c=l===Oa||l===ka,u=l===hs||l===fs;if(c||u){let h=e.get(a);const f=h!==void 0?h.texture.pmremVersion:0;if(a.isRenderTargetTexture&&a.pmremVersion!==f)return t===null&&(t=new vu(s)),h=c?t.fromEquirectangular(a,h):t.fromCubemap(a,h),h.texture.pmremVersion=a.pmremVersion,e.set(a,h),h.texture;if(h!==void 0)return h.texture;{const d=a.image;return c&&d&&d.height>0||u&&d&&i(d)?(t===null&&(t=new vu(s)),h=c?t.fromEquirectangular(a):t.fromCubemap(a),h.texture.pmremVersion=a.pmremVersion,e.set(a,h),a.addEventListener("dispose",r),h.texture):null}}}return a}function i(a){let l=0;const c=6;for(let u=0;u<c;u++)a[u]!==void 0&&l++;return l===c}function r(a){const l=a.target;l.removeEventListener("dispose",r);const c=e.get(l);c!==void 0&&(e.delete(l),c.dispose())}function o(){e=new WeakMap,t!==null&&(t.dispose(),t=null)}return{get:n,dispose:o}}function pv(s){const e={};function t(n){if(e[n]!==void 0)return e[n];let i;switch(n){case"WEBGL_depth_texture":i=s.getExtension("WEBGL_depth_texture")||s.getExtension("MOZ_WEBGL_depth_texture")||s.getExtension("WEBKIT_WEBGL_depth_texture");break;case"EXT_texture_filter_anisotropic":i=s.getExtension("EXT_texture_filter_anisotropic")||s.getExtension("MOZ_EXT_texture_filter_anisotropic")||s.getExtension("WEBKIT_EXT_texture_filter_anisotropic");break;case"WEBGL_compressed_texture_s3tc":i=s.getExtension("WEBGL_compressed_texture_s3tc")||s.getExtension("MOZ_WEBGL_compressed_texture_s3tc")||s.getExtension("WEBKIT_WEBGL_compressed_texture_s3tc");break;case"WEBGL_compressed_texture_pvrtc":i=s.getExtension("WEBGL_compressed_texture_pvrtc")||s.getExtension("WEBKIT_WEBGL_compressed_texture_pvrtc");break;default:i=s.getExtension(n)}return e[n]=i,i}return{has:function(n){return t(n)!==null},init:function(){t("EXT_color_buffer_float"),t("WEBGL_clip_cull_distance"),t("OES_texture_float_linear"),t("EXT_color_buffer_half_float"),t("WEBGL_multisampled_render_to_texture"),t("WEBGL_render_shared_exponent")},get:function(n){const i=t(n);return i===null&&ur("THREE.WebGLRenderer: "+n+" extension not supported."),i}}}function mv(s,e,t,n){const i={},r=new WeakMap;function o(h){const f=h.target;f.index!==null&&e.remove(f.index);for(const p in f.attributes)e.remove(f.attributes[p]);f.removeEventListener("dispose",o),delete i[f.id];const d=r.get(f);d&&(e.remove(d),r.delete(f)),n.releaseStatesOfGeometry(f),f.isInstancedBufferGeometry===!0&&delete f._maxInstanceCount,t.memory.geometries--}function a(h,f){return i[f.id]===!0||(f.addEventListener("dispose",o),i[f.id]=!0,t.memory.geometries++),f}function l(h){const f=h.attributes;for(const d in f)e.update(f[d],s.ARRAY_BUFFER)}function c(h){const f=[],d=h.index,p=h.attributes.position;let v=0;if(d!==null){const _=d.array;v=d.version;for(let y=0,x=_.length;y<x;y+=3){const E=_[y+0],A=_[y+1],R=_[y+2];f.push(E,A,A,R,R,E)}}else if(p!==void 0){const _=p.array;v=p.version;for(let y=0,x=_.length/3-1;y<x;y+=3){const E=y+0,A=y+1,R=y+2;f.push(E,A,A,R,R,E)}}else return;const g=new(_h(f)?bh:Sh)(f,1);g.version=v;const m=r.get(h);m&&e.remove(m),r.set(h,g)}function u(h){const f=r.get(h);if(f){const d=h.index;d!==null&&f.version<d.version&&c(h)}else c(h);return r.get(h)}return{get:a,update:l,getWireframeAttribute:u}}function gv(s,e,t){let n;function i(f){n=f}let r,o;function a(f){r=f.type,o=f.bytesPerElement}function l(f,d){s.drawElements(n,d,r,f*o),t.update(d,n,1)}function c(f,d,p){p!==0&&(s.drawElementsInstanced(n,d,r,f*o,p),t.update(d,n,p))}function u(f,d,p){if(p===0)return;e.get("WEBGL_multi_draw").multiDrawElementsWEBGL(n,d,0,r,f,0,p);let g=0;for(let m=0;m<p;m++)g+=d[m];t.update(g,n,1)}function h(f,d,p,v){if(p===0)return;const g=e.get("WEBGL_multi_draw");if(g===null)for(let m=0;m<f.length;m++)c(f[m]/o,d[m],v[m]);else{g.multiDrawElementsInstancedWEBGL(n,d,0,r,f,0,v,0,p);let m=0;for(let _=0;_<p;_++)m+=d[_]*v[_];t.update(m,n,1)}}this.setMode=i,this.setIndex=a,this.render=l,this.renderInstances=c,this.renderMultiDraw=u,this.renderMultiDrawInstances=h}function vv(s){const e={geometries:0,textures:0},t={frame:0,calls:0,triangles:0,points:0,lines:0};function n(r,o,a){switch(t.calls++,o){case s.TRIANGLES:t.triangles+=a*(r/3);break;case s.LINES:t.lines+=a*(r/2);break;case s.LINE_STRIP:t.lines+=a*(r-1);break;case s.LINE_LOOP:t.lines+=a*r;break;case s.POINTS:t.points+=a*r;break;default:console.error("THREE.WebGLInfo: Unknown draw mode:",o);break}}function i(){t.calls=0,t.triangles=0,t.points=0,t.lines=0}return{memory:e,render:t,programs:null,autoReset:!0,reset:i,update:n}}function xv(s,e,t){const n=new WeakMap,i=new He;function r(o,a,l){const c=o.morphTargetInfluences,u=a.morphAttributes.position||a.morphAttributes.normal||a.morphAttributes.color,h=u!==void 0?u.length:0;let f=n.get(a);if(f===void 0||f.count!==h){let M=function(){L.dispose(),n.delete(a),a.removeEventListener("dispose",M)};var d=M;f!==void 0&&f.texture.dispose();const p=a.morphAttributes.position!==void 0,v=a.morphAttributes.normal!==void 0,g=a.morphAttributes.color!==void 0,m=a.morphAttributes.position||[],_=a.morphAttributes.normal||[],y=a.morphAttributes.color||[];let x=0;p===!0&&(x=1),v===!0&&(x=2),g===!0&&(x=3);let E=a.attributes.position.count*x,A=1;E>e.maxTextureSize&&(A=Math.ceil(E/e.maxTextureSize),E=e.maxTextureSize);const R=new Float32Array(E*A*4*h),L=new yh(R,E,A,h);L.type=gn,L.needsUpdate=!0;const b=x*4;for(let P=0;P<h;P++){const D=m[P],O=_[P],V=y[P],B=E*A*4*P;for(let W=0;W<D.count;W++){const K=W*b;p===!0&&(i.fromBufferAttribute(D,W),R[B+K+0]=i.x,R[B+K+1]=i.y,R[B+K+2]=i.z,R[B+K+3]=0),v===!0&&(i.fromBufferAttribute(O,W),R[B+K+4]=i.x,R[B+K+5]=i.y,R[B+K+6]=i.z,R[B+K+7]=0),g===!0&&(i.fromBufferAttribute(V,W),R[B+K+8]=i.x,R[B+K+9]=i.y,R[B+K+10]=i.z,R[B+K+11]=V.itemSize===4?i.w:1)}}f={count:h,texture:L,size:new ne(E,A)},n.set(a,f),a.addEventListener("dispose",M)}if(o.isInstancedMesh===!0&&o.morphTexture!==null)l.getUniforms().setValue(s,"morphTexture",o.morphTexture,t);else{let p=0;for(let g=0;g<c.length;g++)p+=c[g];const v=a.morphTargetsRelative?1:1-p;l.getUniforms().setValue(s,"morphTargetBaseInfluence",v),l.getUniforms().setValue(s,"morphTargetInfluences",c)}l.getUniforms().setValue(s,"morphTargetsTexture",f.texture,t),l.getUniforms().setValue(s,"morphTargetsTextureSize",f.size)}return{update:r}}function _v(s,e,t,n){let i=new WeakMap;function r(l){const c=n.render.frame,u=l.geometry,h=e.get(l,u);if(i.get(h)!==c&&(e.update(h),i.set(h,c)),l.isInstancedMesh&&(l.hasEventListener("dispose",a)===!1&&l.addEventListener("dispose",a),i.get(l)!==c&&(t.update(l.instanceMatrix,s.ARRAY_BUFFER),l.instanceColor!==null&&t.update(l.instanceColor,s.ARRAY_BUFFER),i.set(l,c))),l.isSkinnedMesh){const f=l.skeleton;i.get(f)!==c&&(f.update(),i.set(f,c))}return h}function o(){i=new WeakMap}function a(l){const c=l.target;c.removeEventListener("dispose",a),t.remove(c.instanceMatrix),c.instanceColor!==null&&t.remove(c.instanceColor)}return{update:r,dispose:o}}const Kh=new At,Mu=new Ih(1,1),$h=new yh,Yh=new Ld,jh=new wh,Su=[],bu=[],Tu=new Float32Array(16),Eu=new Float32Array(9),wu=new Float32Array(4);function Es(s,e,t){const n=s[0];if(n<=0||n>0)return s;const i=e*t;let r=Su[i];if(r===void 0&&(r=new Float32Array(i),Su[i]=r),e!==0){n.toArray(r,0);for(let o=1,a=0;o!==e;++o)a+=t,s[o].toArray(r,a)}return r}function Rt(s,e){if(s.length!==e.length)return!1;for(let t=0,n=s.length;t<n;t++)if(s[t]!==e[t])return!1;return!0}function Ct(s,e){for(let t=0,n=e.length;t<n;t++)s[t]=e[t]}function Ao(s,e){let t=bu[e];t===void 0&&(t=new Int32Array(e),bu[e]=t);for(let n=0;n!==e;++n)t[n]=s.allocateTextureUnit();return t}function yv(s,e){const t=this.cache;t[0]!==e&&(s.uniform1f(this.addr,e),t[0]=e)}function Mv(s,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(s.uniform2f(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(Rt(t,e))return;s.uniform2fv(this.addr,e),Ct(t,e)}}function Sv(s,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(s.uniform3f(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else if(e.r!==void 0)(t[0]!==e.r||t[1]!==e.g||t[2]!==e.b)&&(s.uniform3f(this.addr,e.r,e.g,e.b),t[0]=e.r,t[1]=e.g,t[2]=e.b);else{if(Rt(t,e))return;s.uniform3fv(this.addr,e),Ct(t,e)}}function bv(s,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(s.uniform4f(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(Rt(t,e))return;s.uniform4fv(this.addr,e),Ct(t,e)}}function Tv(s,e){const t=this.cache,n=e.elements;if(n===void 0){if(Rt(t,e))return;s.uniformMatrix2fv(this.addr,!1,e),Ct(t,e)}else{if(Rt(t,n))return;wu.set(n),s.uniformMatrix2fv(this.addr,!1,wu),Ct(t,n)}}function Ev(s,e){const t=this.cache,n=e.elements;if(n===void 0){if(Rt(t,e))return;s.uniformMatrix3fv(this.addr,!1,e),Ct(t,e)}else{if(Rt(t,n))return;Eu.set(n),s.uniformMatrix3fv(this.addr,!1,Eu),Ct(t,n)}}function wv(s,e){const t=this.cache,n=e.elements;if(n===void 0){if(Rt(t,e))return;s.uniformMatrix4fv(this.addr,!1,e),Ct(t,e)}else{if(Rt(t,n))return;Tu.set(n),s.uniformMatrix4fv(this.addr,!1,Tu),Ct(t,n)}}function Av(s,e){const t=this.cache;t[0]!==e&&(s.uniform1i(this.addr,e),t[0]=e)}function Rv(s,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(s.uniform2i(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(Rt(t,e))return;s.uniform2iv(this.addr,e),Ct(t,e)}}function Cv(s,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(s.uniform3i(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else{if(Rt(t,e))return;s.uniform3iv(this.addr,e),Ct(t,e)}}function Pv(s,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(s.uniform4i(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(Rt(t,e))return;s.uniform4iv(this.addr,e),Ct(t,e)}}function Lv(s,e){const t=this.cache;t[0]!==e&&(s.uniform1ui(this.addr,e),t[0]=e)}function Iv(s,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(s.uniform2ui(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(Rt(t,e))return;s.uniform2uiv(this.addr,e),Ct(t,e)}}function Dv(s,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(s.uniform3ui(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else{if(Rt(t,e))return;s.uniform3uiv(this.addr,e),Ct(t,e)}}function Nv(s,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(s.uniform4ui(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(Rt(t,e))return;s.uniform4uiv(this.addr,e),Ct(t,e)}}function Uv(s,e,t){const n=this.cache,i=t.allocateTextureUnit();n[0]!==i&&(s.uniform1i(this.addr,i),n[0]=i);let r;this.type===s.SAMPLER_2D_SHADOW?(Mu.compareFunction=xh,r=Mu):r=Kh,t.setTexture2D(e||r,i)}function Fv(s,e,t){const n=this.cache,i=t.allocateTextureUnit();n[0]!==i&&(s.uniform1i(this.addr,i),n[0]=i),t.setTexture3D(e||Yh,i)}function Ov(s,e,t){const n=this.cache,i=t.allocateTextureUnit();n[0]!==i&&(s.uniform1i(this.addr,i),n[0]=i),t.setTextureCube(e||jh,i)}function kv(s,e,t){const n=this.cache,i=t.allocateTextureUnit();n[0]!==i&&(s.uniform1i(this.addr,i),n[0]=i),t.setTexture2DArray(e||$h,i)}function Bv(s){switch(s){case 5126:return yv;case 35664:return Mv;case 35665:return Sv;case 35666:return bv;case 35674:return Tv;case 35675:return Ev;case 35676:return wv;case 5124:case 35670:return Av;case 35667:case 35671:return Rv;case 35668:case 35672:return Cv;case 35669:case 35673:return Pv;case 5125:return Lv;case 36294:return Iv;case 36295:return Dv;case 36296:return Nv;case 35678:case 36198:case 36298:case 36306:case 35682:return Uv;case 35679:case 36299:case 36307:return Fv;case 35680:case 36300:case 36308:case 36293:return Ov;case 36289:case 36303:case 36311:case 36292:return kv}}function zv(s,e){s.uniform1fv(this.addr,e)}function Hv(s,e){const t=Es(e,this.size,2);s.uniform2fv(this.addr,t)}function Vv(s,e){const t=Es(e,this.size,3);s.uniform3fv(this.addr,t)}function Gv(s,e){const t=Es(e,this.size,4);s.uniform4fv(this.addr,t)}function Wv(s,e){const t=Es(e,this.size,4);s.uniformMatrix2fv(this.addr,!1,t)}function Xv(s,e){const t=Es(e,this.size,9);s.uniformMatrix3fv(this.addr,!1,t)}function qv(s,e){const t=Es(e,this.size,16);s.uniformMatrix4fv(this.addr,!1,t)}function Kv(s,e){s.uniform1iv(this.addr,e)}function $v(s,e){s.uniform2iv(this.addr,e)}function Yv(s,e){s.uniform3iv(this.addr,e)}function jv(s,e){s.uniform4iv(this.addr,e)}function Zv(s,e){s.uniform1uiv(this.addr,e)}function Jv(s,e){s.uniform2uiv(this.addr,e)}function Qv(s,e){s.uniform3uiv(this.addr,e)}function ex(s,e){s.uniform4uiv(this.addr,e)}function tx(s,e,t){const n=this.cache,i=e.length,r=Ao(t,i);Rt(n,r)||(s.uniform1iv(this.addr,r),Ct(n,r));for(let o=0;o!==i;++o)t.setTexture2D(e[o]||Kh,r[o])}function nx(s,e,t){const n=this.cache,i=e.length,r=Ao(t,i);Rt(n,r)||(s.uniform1iv(this.addr,r),Ct(n,r));for(let o=0;o!==i;++o)t.setTexture3D(e[o]||Yh,r[o])}function ix(s,e,t){const n=this.cache,i=e.length,r=Ao(t,i);Rt(n,r)||(s.uniform1iv(this.addr,r),Ct(n,r));for(let o=0;o!==i;++o)t.setTextureCube(e[o]||jh,r[o])}function sx(s,e,t){const n=this.cache,i=e.length,r=Ao(t,i);Rt(n,r)||(s.uniform1iv(this.addr,r),Ct(n,r));for(let o=0;o!==i;++o)t.setTexture2DArray(e[o]||$h,r[o])}function rx(s){switch(s){case 5126:return zv;case 35664:return Hv;case 35665:return Vv;case 35666:return Gv;case 35674:return Wv;case 35675:return Xv;case 35676:return qv;case 5124:case 35670:return Kv;case 35667:case 35671:return $v;case 35668:case 35672:return Yv;case 35669:case 35673:return jv;case 5125:return Zv;case 36294:return Jv;case 36295:return Qv;case 36296:return ex;case 35678:case 36198:case 36298:case 36306:case 35682:return tx;case 35679:case 36299:case 36307:return nx;case 35680:case 36300:case 36308:case 36293:return ix;case 36289:case 36303:case 36311:case 36292:return sx}}class ox{constructor(e,t,n){this.id=e,this.addr=n,this.cache=[],this.type=t.type,this.setValue=Bv(t.type)}}class ax{constructor(e,t,n){this.id=e,this.addr=n,this.cache=[],this.type=t.type,this.size=t.size,this.setValue=rx(t.type)}}class lx{constructor(e){this.id=e,this.seq=[],this.map={}}setValue(e,t,n){const i=this.seq;for(let r=0,o=i.length;r!==o;++r){const a=i[r];a.setValue(e,t[a.id],n)}}}const xa=/(\w+)(\])?(\[|\.)?/g;function Au(s,e){s.seq.push(e),s.map[e.id]=e}function cx(s,e,t){const n=s.name,i=n.length;for(xa.lastIndex=0;;){const r=xa.exec(n),o=xa.lastIndex;let a=r[1];const l=r[2]==="]",c=r[3];if(l&&(a=a|0),c===void 0||c==="["&&o+2===i){Au(t,c===void 0?new ox(a,s,e):new ax(a,s,e));break}else{let h=t.map[a];h===void 0&&(h=new lx(a),Au(t,h)),t=h}}}class po{constructor(e,t){this.seq=[],this.map={};const n=e.getProgramParameter(t,e.ACTIVE_UNIFORMS);for(let i=0;i<n;++i){const r=e.getActiveUniform(t,i),o=e.getUniformLocation(t,r.name);cx(r,o,this)}}setValue(e,t,n,i){const r=this.map[t];r!==void 0&&r.setValue(e,n,i)}setOptional(e,t,n){const i=t[n];i!==void 0&&this.setValue(e,n,i)}static upload(e,t,n,i){for(let r=0,o=t.length;r!==o;++r){const a=t[r],l=n[a.id];l.needsUpdate!==!1&&a.setValue(e,l.value,i)}}static seqWithValue(e,t){const n=[];for(let i=0,r=e.length;i!==r;++i){const o=e[i];o.id in t&&n.push(o)}return n}}function Ru(s,e,t){const n=s.createShader(e);return s.shaderSource(n,t),s.compileShader(n),n}const ux=37297;let hx=0;function fx(s,e){const t=s.split(`
`),n=[],i=Math.max(e-6,0),r=Math.min(e+6,t.length);for(let o=i;o<r;o++){const a=o+1;n.push(`${a===e?">":" "} ${a}: ${t[o]}`)}return n.join(`
`)}const Cu=new Ce;function dx(s){et._getMatrix(Cu,et.workingColorSpace,s);const e=`mat3( ${Cu.elements.map(t=>t.toFixed(4))} )`;switch(et.getTransfer(s)){case xo:return[e,"LinearTransferOETF"];case ct:return[e,"sRGBTransferOETF"];default:return console.warn("THREE.WebGLProgram: Unsupported color space: ",s),[e,"LinearTransferOETF"]}}function Pu(s,e,t){const n=s.getShaderParameter(e,s.COMPILE_STATUS),r=(s.getShaderInfoLog(e)||"").trim();if(n&&r==="")return"";const o=/ERROR: 0:(\d+)/.exec(r);if(o){const a=parseInt(o[1]);return t.toUpperCase()+`

`+r+`

`+fx(s.getShaderSource(e),a)}else return r}function px(s,e){const t=dx(e);return[`vec4 ${s}( vec4 value ) {`,`	return ${t[1]}( vec4( value.rgb * ${t[0]}, value.a ) );`,"}"].join(`
`)}function mx(s,e){let t;switch(e){case Xf:t="Linear";break;case qf:t="Reinhard";break;case Kf:t="Cineon";break;case sh:t="ACESFilmic";break;case rh:t="AgX";break;case oh:t="Neutral";break;case $f:t="Custom";break;default:console.warn("THREE.WebGLProgram: Unsupported toneMapping:",e),t="Linear"}return"vec3 "+s+"( vec3 color ) { return "+t+"ToneMapping( color ); }"}const Qr=new w;function gx(){et.getLuminanceCoefficients(Qr);const s=Qr.x.toFixed(4),e=Qr.y.toFixed(4),t=Qr.z.toFixed(4);return["float luminance( const in vec3 rgb ) {",`	const vec3 weights = vec3( ${s}, ${e}, ${t} );`,"	return dot( weights, rgb );","}"].join(`
`)}function vx(s){return[s.extensionClipCullDistance?"#extension GL_ANGLE_clip_cull_distance : require":"",s.extensionMultiDraw?"#extension GL_ANGLE_multi_draw : require":""].filter(Ks).join(`
`)}function xx(s){const e=[];for(const t in s){const n=s[t];n!==!1&&e.push("#define "+t+" "+n)}return e.join(`
`)}function _x(s,e){const t={},n=s.getProgramParameter(e,s.ACTIVE_ATTRIBUTES);for(let i=0;i<n;i++){const r=s.getActiveAttrib(e,i),o=r.name;let a=1;r.type===s.FLOAT_MAT2&&(a=2),r.type===s.FLOAT_MAT3&&(a=3),r.type===s.FLOAT_MAT4&&(a=4),t[o]={type:r.type,location:s.getAttribLocation(e,o),locationSize:a}}return t}function Ks(s){return s!==""}function Lu(s,e){const t=e.numSpotLightShadows+e.numSpotLightMaps-e.numSpotLightShadowsWithMaps;return s.replace(/NUM_DIR_LIGHTS/g,e.numDirLights).replace(/NUM_SPOT_LIGHTS/g,e.numSpotLights).replace(/NUM_SPOT_LIGHT_MAPS/g,e.numSpotLightMaps).replace(/NUM_SPOT_LIGHT_COORDS/g,t).replace(/NUM_RECT_AREA_LIGHTS/g,e.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g,e.numPointLights).replace(/NUM_HEMI_LIGHTS/g,e.numHemiLights).replace(/NUM_DIR_LIGHT_SHADOWS/g,e.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS/g,e.numSpotLightShadowsWithMaps).replace(/NUM_SPOT_LIGHT_SHADOWS/g,e.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g,e.numPointLightShadows)}function Iu(s,e){return s.replace(/NUM_CLIPPING_PLANES/g,e.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g,e.numClippingPlanes-e.numClipIntersection)}const yx=/^[ \t]*#include +<([\w\d./]+)>/gm;function Sl(s){return s.replace(yx,Sx)}const Mx=new Map;function Sx(s,e){let t=Ke[e];if(t===void 0){const n=Mx.get(e);if(n!==void 0)t=Ke[n],console.warn('THREE.WebGLRenderer: Shader chunk "%s" has been deprecated. Use "%s" instead.',e,n);else throw new Error("Can not resolve #include <"+e+">")}return Sl(t)}const bx=/#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;function Du(s){return s.replace(bx,Tx)}function Tx(s,e,t,n){let i="";for(let r=parseInt(e);r<parseInt(t);r++)i+=n.replace(/\[\s*i\s*\]/g,"[ "+r+" ]").replace(/UNROLLED_LOOP_INDEX/g,r);return i}function Nu(s){let e=`precision ${s.precision} float;
	precision ${s.precision} int;
	precision ${s.precision} sampler2D;
	precision ${s.precision} samplerCube;
	precision ${s.precision} sampler3D;
	precision ${s.precision} sampler2DArray;
	precision ${s.precision} sampler2DShadow;
	precision ${s.precision} samplerCubeShadow;
	precision ${s.precision} sampler2DArrayShadow;
	precision ${s.precision} isampler2D;
	precision ${s.precision} isampler3D;
	precision ${s.precision} isamplerCube;
	precision ${s.precision} isampler2DArray;
	precision ${s.precision} usampler2D;
	precision ${s.precision} usampler3D;
	precision ${s.precision} usamplerCube;
	precision ${s.precision} usampler2DArray;
	`;return s.precision==="highp"?e+=`
#define HIGH_PRECISION`:s.precision==="mediump"?e+=`
#define MEDIUM_PRECISION`:s.precision==="lowp"&&(e+=`
#define LOW_PRECISION`),e}function Ex(s){let e="SHADOWMAP_TYPE_BASIC";return s.shadowMapType===eh?e="SHADOWMAP_TYPE_PCF":s.shadowMapType===wf?e="SHADOWMAP_TYPE_PCF_SOFT":s.shadowMapType===Gn&&(e="SHADOWMAP_TYPE_VSM"),e}function wx(s){let e="ENVMAP_TYPE_CUBE";if(s.envMap)switch(s.envMapMode){case hs:case fs:e="ENVMAP_TYPE_CUBE";break;case bo:e="ENVMAP_TYPE_CUBE_UV";break}return e}function Ax(s){let e="ENVMAP_MODE_REFLECTION";if(s.envMap)switch(s.envMapMode){case fs:e="ENVMAP_MODE_REFRACTION";break}return e}function Rx(s){let e="ENVMAP_BLENDING_NONE";if(s.envMap)switch(s.combine){case ih:e="ENVMAP_BLENDING_MULTIPLY";break;case Gf:e="ENVMAP_BLENDING_MIX";break;case Wf:e="ENVMAP_BLENDING_ADD";break}return e}function Cx(s){const e=s.envMapCubeUVHeight;if(e===null)return null;const t=Math.log2(e)-2,n=1/e;return{texelWidth:1/(3*Math.max(Math.pow(2,t),112)),texelHeight:n,maxMip:t}}function Px(s,e,t,n){const i=s.getContext(),r=t.defines;let o=t.vertexShader,a=t.fragmentShader;const l=Ex(t),c=wx(t),u=Ax(t),h=Rx(t),f=Cx(t),d=vx(t),p=xx(r),v=i.createProgram();let g,m,_=t.glslVersion?"#version "+t.glslVersion+`
`:"";t.isRawShaderMaterial?(g=["#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,p].filter(Ks).join(`
`),g.length>0&&(g+=`
`),m=["#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,p].filter(Ks).join(`
`),m.length>0&&(m+=`
`)):(g=[Nu(t),"#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,p,t.extensionClipCullDistance?"#define USE_CLIP_DISTANCE":"",t.batching?"#define USE_BATCHING":"",t.batchingColor?"#define USE_BATCHING_COLOR":"",t.instancing?"#define USE_INSTANCING":"",t.instancingColor?"#define USE_INSTANCING_COLOR":"",t.instancingMorph?"#define USE_INSTANCING_MORPH":"",t.useFog&&t.fog?"#define USE_FOG":"",t.useFog&&t.fogExp2?"#define FOG_EXP2":"",t.map?"#define USE_MAP":"",t.envMap?"#define USE_ENVMAP":"",t.envMap?"#define "+u:"",t.lightMap?"#define USE_LIGHTMAP":"",t.aoMap?"#define USE_AOMAP":"",t.bumpMap?"#define USE_BUMPMAP":"",t.normalMap?"#define USE_NORMALMAP":"",t.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",t.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",t.displacementMap?"#define USE_DISPLACEMENTMAP":"",t.emissiveMap?"#define USE_EMISSIVEMAP":"",t.anisotropy?"#define USE_ANISOTROPY":"",t.anisotropyMap?"#define USE_ANISOTROPYMAP":"",t.clearcoatMap?"#define USE_CLEARCOATMAP":"",t.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",t.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",t.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",t.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",t.specularMap?"#define USE_SPECULARMAP":"",t.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",t.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",t.roughnessMap?"#define USE_ROUGHNESSMAP":"",t.metalnessMap?"#define USE_METALNESSMAP":"",t.alphaMap?"#define USE_ALPHAMAP":"",t.alphaHash?"#define USE_ALPHAHASH":"",t.transmission?"#define USE_TRANSMISSION":"",t.transmissionMap?"#define USE_TRANSMISSIONMAP":"",t.thicknessMap?"#define USE_THICKNESSMAP":"",t.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",t.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",t.mapUv?"#define MAP_UV "+t.mapUv:"",t.alphaMapUv?"#define ALPHAMAP_UV "+t.alphaMapUv:"",t.lightMapUv?"#define LIGHTMAP_UV "+t.lightMapUv:"",t.aoMapUv?"#define AOMAP_UV "+t.aoMapUv:"",t.emissiveMapUv?"#define EMISSIVEMAP_UV "+t.emissiveMapUv:"",t.bumpMapUv?"#define BUMPMAP_UV "+t.bumpMapUv:"",t.normalMapUv?"#define NORMALMAP_UV "+t.normalMapUv:"",t.displacementMapUv?"#define DISPLACEMENTMAP_UV "+t.displacementMapUv:"",t.metalnessMapUv?"#define METALNESSMAP_UV "+t.metalnessMapUv:"",t.roughnessMapUv?"#define ROUGHNESSMAP_UV "+t.roughnessMapUv:"",t.anisotropyMapUv?"#define ANISOTROPYMAP_UV "+t.anisotropyMapUv:"",t.clearcoatMapUv?"#define CLEARCOATMAP_UV "+t.clearcoatMapUv:"",t.clearcoatNormalMapUv?"#define CLEARCOAT_NORMALMAP_UV "+t.clearcoatNormalMapUv:"",t.clearcoatRoughnessMapUv?"#define CLEARCOAT_ROUGHNESSMAP_UV "+t.clearcoatRoughnessMapUv:"",t.iridescenceMapUv?"#define IRIDESCENCEMAP_UV "+t.iridescenceMapUv:"",t.iridescenceThicknessMapUv?"#define IRIDESCENCE_THICKNESSMAP_UV "+t.iridescenceThicknessMapUv:"",t.sheenColorMapUv?"#define SHEEN_COLORMAP_UV "+t.sheenColorMapUv:"",t.sheenRoughnessMapUv?"#define SHEEN_ROUGHNESSMAP_UV "+t.sheenRoughnessMapUv:"",t.specularMapUv?"#define SPECULARMAP_UV "+t.specularMapUv:"",t.specularColorMapUv?"#define SPECULAR_COLORMAP_UV "+t.specularColorMapUv:"",t.specularIntensityMapUv?"#define SPECULAR_INTENSITYMAP_UV "+t.specularIntensityMapUv:"",t.transmissionMapUv?"#define TRANSMISSIONMAP_UV "+t.transmissionMapUv:"",t.thicknessMapUv?"#define THICKNESSMAP_UV "+t.thicknessMapUv:"",t.vertexTangents&&t.flatShading===!1?"#define USE_TANGENT":"",t.vertexColors?"#define USE_COLOR":"",t.vertexAlphas?"#define USE_COLOR_ALPHA":"",t.vertexUv1s?"#define USE_UV1":"",t.vertexUv2s?"#define USE_UV2":"",t.vertexUv3s?"#define USE_UV3":"",t.pointsUvs?"#define USE_POINTS_UV":"",t.flatShading?"#define FLAT_SHADED":"",t.skinning?"#define USE_SKINNING":"",t.morphTargets?"#define USE_MORPHTARGETS":"",t.morphNormals&&t.flatShading===!1?"#define USE_MORPHNORMALS":"",t.morphColors?"#define USE_MORPHCOLORS":"",t.morphTargetsCount>0?"#define MORPHTARGETS_TEXTURE_STRIDE "+t.morphTextureStride:"",t.morphTargetsCount>0?"#define MORPHTARGETS_COUNT "+t.morphTargetsCount:"",t.doubleSided?"#define DOUBLE_SIDED":"",t.flipSided?"#define FLIP_SIDED":"",t.shadowMapEnabled?"#define USE_SHADOWMAP":"",t.shadowMapEnabled?"#define "+l:"",t.sizeAttenuation?"#define USE_SIZEATTENUATION":"",t.numLightProbes>0?"#define USE_LIGHT_PROBES":"",t.logarithmicDepthBuffer?"#define USE_LOGARITHMIC_DEPTH_BUFFER":"",t.reversedDepthBuffer?"#define USE_REVERSED_DEPTH_BUFFER":"","uniform mat4 modelMatrix;","uniform mat4 modelViewMatrix;","uniform mat4 projectionMatrix;","uniform mat4 viewMatrix;","uniform mat3 normalMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;","#ifdef USE_INSTANCING","	attribute mat4 instanceMatrix;","#endif","#ifdef USE_INSTANCING_COLOR","	attribute vec3 instanceColor;","#endif","#ifdef USE_INSTANCING_MORPH","	uniform sampler2D morphTexture;","#endif","attribute vec3 position;","attribute vec3 normal;","attribute vec2 uv;","#ifdef USE_UV1","	attribute vec2 uv1;","#endif","#ifdef USE_UV2","	attribute vec2 uv2;","#endif","#ifdef USE_UV3","	attribute vec2 uv3;","#endif","#ifdef USE_TANGENT","	attribute vec4 tangent;","#endif","#if defined( USE_COLOR_ALPHA )","	attribute vec4 color;","#elif defined( USE_COLOR )","	attribute vec3 color;","#endif","#ifdef USE_SKINNING","	attribute vec4 skinIndex;","	attribute vec4 skinWeight;","#endif",`
`].filter(Ks).join(`
`),m=[Nu(t),"#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,p,t.useFog&&t.fog?"#define USE_FOG":"",t.useFog&&t.fogExp2?"#define FOG_EXP2":"",t.alphaToCoverage?"#define ALPHA_TO_COVERAGE":"",t.map?"#define USE_MAP":"",t.matcap?"#define USE_MATCAP":"",t.envMap?"#define USE_ENVMAP":"",t.envMap?"#define "+c:"",t.envMap?"#define "+u:"",t.envMap?"#define "+h:"",f?"#define CUBEUV_TEXEL_WIDTH "+f.texelWidth:"",f?"#define CUBEUV_TEXEL_HEIGHT "+f.texelHeight:"",f?"#define CUBEUV_MAX_MIP "+f.maxMip+".0":"",t.lightMap?"#define USE_LIGHTMAP":"",t.aoMap?"#define USE_AOMAP":"",t.bumpMap?"#define USE_BUMPMAP":"",t.normalMap?"#define USE_NORMALMAP":"",t.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",t.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",t.emissiveMap?"#define USE_EMISSIVEMAP":"",t.anisotropy?"#define USE_ANISOTROPY":"",t.anisotropyMap?"#define USE_ANISOTROPYMAP":"",t.clearcoat?"#define USE_CLEARCOAT":"",t.clearcoatMap?"#define USE_CLEARCOATMAP":"",t.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",t.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",t.dispersion?"#define USE_DISPERSION":"",t.iridescence?"#define USE_IRIDESCENCE":"",t.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",t.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",t.specularMap?"#define USE_SPECULARMAP":"",t.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",t.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",t.roughnessMap?"#define USE_ROUGHNESSMAP":"",t.metalnessMap?"#define USE_METALNESSMAP":"",t.alphaMap?"#define USE_ALPHAMAP":"",t.alphaTest?"#define USE_ALPHATEST":"",t.alphaHash?"#define USE_ALPHAHASH":"",t.sheen?"#define USE_SHEEN":"",t.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",t.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",t.transmission?"#define USE_TRANSMISSION":"",t.transmissionMap?"#define USE_TRANSMISSIONMAP":"",t.thicknessMap?"#define USE_THICKNESSMAP":"",t.vertexTangents&&t.flatShading===!1?"#define USE_TANGENT":"",t.vertexColors||t.instancingColor||t.batchingColor?"#define USE_COLOR":"",t.vertexAlphas?"#define USE_COLOR_ALPHA":"",t.vertexUv1s?"#define USE_UV1":"",t.vertexUv2s?"#define USE_UV2":"",t.vertexUv3s?"#define USE_UV3":"",t.pointsUvs?"#define USE_POINTS_UV":"",t.gradientMap?"#define USE_GRADIENTMAP":"",t.flatShading?"#define FLAT_SHADED":"",t.doubleSided?"#define DOUBLE_SIDED":"",t.flipSided?"#define FLIP_SIDED":"",t.shadowMapEnabled?"#define USE_SHADOWMAP":"",t.shadowMapEnabled?"#define "+l:"",t.premultipliedAlpha?"#define PREMULTIPLIED_ALPHA":"",t.numLightProbes>0?"#define USE_LIGHT_PROBES":"",t.decodeVideoTexture?"#define DECODE_VIDEO_TEXTURE":"",t.decodeVideoTextureEmissive?"#define DECODE_VIDEO_TEXTURE_EMISSIVE":"",t.logarithmicDepthBuffer?"#define USE_LOGARITHMIC_DEPTH_BUFFER":"",t.reversedDepthBuffer?"#define USE_REVERSED_DEPTH_BUFFER":"","uniform mat4 viewMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;",t.toneMapping!==hi?"#define TONE_MAPPING":"",t.toneMapping!==hi?Ke.tonemapping_pars_fragment:"",t.toneMapping!==hi?mx("toneMapping",t.toneMapping):"",t.dithering?"#define DITHERING":"",t.opaque?"#define OPAQUE":"",Ke.colorspace_pars_fragment,px("linearToOutputTexel",t.outputColorSpace),gx(),t.useDepthPacking?"#define DEPTH_PACKING "+t.depthPacking:"",`
`].filter(Ks).join(`
`)),o=Sl(o),o=Lu(o,t),o=Iu(o,t),a=Sl(a),a=Lu(a,t),a=Iu(a,t),o=Du(o),a=Du(a),t.isRawShaderMaterial!==!0&&(_=`#version 300 es
`,g=[d,"#define attribute in","#define varying out","#define texture2D texture"].join(`
`)+`
`+g,m=["#define varying in",t.glslVersion===ml?"":"layout(location = 0) out highp vec4 pc_fragColor;",t.glslVersion===ml?"":"#define gl_FragColor pc_fragColor","#define gl_FragDepthEXT gl_FragDepth","#define texture2D texture","#define textureCube texture","#define texture2DProj textureProj","#define texture2DLodEXT textureLod","#define texture2DProjLodEXT textureProjLod","#define textureCubeLodEXT textureLod","#define texture2DGradEXT textureGrad","#define texture2DProjGradEXT textureProjGrad","#define textureCubeGradEXT textureGrad"].join(`
`)+`
`+m);const y=_+g+o,x=_+m+a,E=Ru(i,i.VERTEX_SHADER,y),A=Ru(i,i.FRAGMENT_SHADER,x);i.attachShader(v,E),i.attachShader(v,A),t.index0AttributeName!==void 0?i.bindAttribLocation(v,0,t.index0AttributeName):t.morphTargets===!0&&i.bindAttribLocation(v,0,"position"),i.linkProgram(v);function R(P){if(s.debug.checkShaderErrors){const D=i.getProgramInfoLog(v)||"",O=i.getShaderInfoLog(E)||"",V=i.getShaderInfoLog(A)||"",B=D.trim(),W=O.trim(),K=V.trim();let G=!0,le=!0;if(i.getProgramParameter(v,i.LINK_STATUS)===!1)if(G=!1,typeof s.debug.onShaderError=="function")s.debug.onShaderError(i,v,E,A);else{const de=Pu(i,E,"vertex"),pe=Pu(i,A,"fragment");console.error("THREE.WebGLProgram: Shader Error "+i.getError()+" - VALIDATE_STATUS "+i.getProgramParameter(v,i.VALIDATE_STATUS)+`

Material Name: `+P.name+`
Material Type: `+P.type+`

Program Info Log: `+B+`
`+de+`
`+pe)}else B!==""?console.warn("THREE.WebGLProgram: Program Info Log:",B):(W===""||K==="")&&(le=!1);le&&(P.diagnostics={runnable:G,programLog:B,vertexShader:{log:W,prefix:g},fragmentShader:{log:K,prefix:m}})}i.deleteShader(E),i.deleteShader(A),L=new po(i,v),b=_x(i,v)}let L;this.getUniforms=function(){return L===void 0&&R(this),L};let b;this.getAttributes=function(){return b===void 0&&R(this),b};let M=t.rendererExtensionParallelShaderCompile===!1;return this.isReady=function(){return M===!1&&(M=i.getProgramParameter(v,ux)),M},this.destroy=function(){n.releaseStatesOfProgram(this),i.deleteProgram(v),this.program=void 0},this.type=t.shaderType,this.name=t.shaderName,this.id=hx++,this.cacheKey=e,this.usedTimes=1,this.program=v,this.vertexShader=E,this.fragmentShader=A,this}let Lx=0;class Ix{constructor(){this.shaderCache=new Map,this.materialCache=new Map}update(e){const t=e.vertexShader,n=e.fragmentShader,i=this._getShaderStage(t),r=this._getShaderStage(n),o=this._getShaderCacheForMaterial(e);return o.has(i)===!1&&(o.add(i),i.usedTimes++),o.has(r)===!1&&(o.add(r),r.usedTimes++),this}remove(e){const t=this.materialCache.get(e);for(const n of t)n.usedTimes--,n.usedTimes===0&&this.shaderCache.delete(n.code);return this.materialCache.delete(e),this}getVertexShaderID(e){return this._getShaderStage(e.vertexShader).id}getFragmentShaderID(e){return this._getShaderStage(e.fragmentShader).id}dispose(){this.shaderCache.clear(),this.materialCache.clear()}_getShaderCacheForMaterial(e){const t=this.materialCache;let n=t.get(e);return n===void 0&&(n=new Set,t.set(e,n)),n}_getShaderStage(e){const t=this.shaderCache;let n=t.get(e);return n===void 0&&(n=new Dx(e),t.set(e,n)),n}}class Dx{constructor(e){this.id=Lx++,this.code=e,this.usedTimes=0}}function Nx(s,e,t,n,i,r,o){const a=new Bl,l=new Ix,c=new Set,u=[],h=i.logarithmicDepthBuffer,f=i.vertexTextures;let d=i.precision;const p={MeshDepthMaterial:"depth",MeshDistanceMaterial:"distanceRGBA",MeshNormalMaterial:"normal",MeshBasicMaterial:"basic",MeshLambertMaterial:"lambert",MeshPhongMaterial:"phong",MeshToonMaterial:"toon",MeshStandardMaterial:"physical",MeshPhysicalMaterial:"physical",MeshMatcapMaterial:"matcap",LineBasicMaterial:"basic",LineDashedMaterial:"dashed",PointsMaterial:"points",ShadowMaterial:"shadow",SpriteMaterial:"sprite"};function v(b){return c.add(b),b===0?"uv":`uv${b}`}function g(b,M,P,D,O){const V=D.fog,B=O.geometry,W=b.isMeshStandardMaterial?D.environment:null,K=(b.isMeshStandardMaterial?t:e).get(b.envMap||W),G=K&&K.mapping===bo?K.image.height:null,le=p[b.type];b.precision!==null&&(d=i.getMaxPrecision(b.precision),d!==b.precision&&console.warn("THREE.WebGLProgram.getParameters:",b.precision,"not supported, using",d,"instead."));const de=B.morphAttributes.position||B.morphAttributes.normal||B.morphAttributes.color,pe=de!==void 0?de.length:0;let Ne=0;B.morphAttributes.position!==void 0&&(Ne=1),B.morphAttributes.normal!==void 0&&(Ne=2),B.morphAttributes.color!==void 0&&(Ne=3);let Xe,qe,je,$;if(le){const nt=wn[le];Xe=nt.vertexShader,qe=nt.fragmentShader}else Xe=b.vertexShader,qe=b.fragmentShader,l.update(b),je=l.getVertexShaderID(b),$=l.getFragmentShaderID(b);const Q=s.getRenderTarget(),me=s.state.buffers.depth.getReversed(),be=O.isInstancedMesh===!0,ye=O.isBatchedMesh===!0,ze=!!b.map,at=!!b.matcap,I=!!K,te=!!b.aoMap,Z=!!b.lightMap,j=!!b.bumpMap,Y=!!b.normalMap,ue=!!b.displacementMap,ie=!!b.emissiveMap,he=!!b.metalnessMap,Ve=!!b.roughnessMap,Be=b.anisotropy>0,C=b.clearcoat>0,S=b.dispersion>0,k=b.iridescence>0,X=b.sheen>0,ee=b.transmission>0,q=Be&&!!b.anisotropyMap,Re=C&&!!b.clearcoatMap,ce=C&&!!b.clearcoatNormalMap,Ee=C&&!!b.clearcoatRoughnessMap,we=k&&!!b.iridescenceMap,se=k&&!!b.iridescenceThicknessMap,_e=X&&!!b.sheenColorMap,Oe=X&&!!b.sheenRoughnessMap,Pe=!!b.specularMap,ve=!!b.specularColorMap,We=!!b.specularIntensityMap,N=ee&&!!b.transmissionMap,ae=ee&&!!b.thicknessMap,fe=!!b.gradientMap,Se=!!b.alphaMap,re=b.alphaTest>0,J=!!b.alphaHash,Ae=!!b.extensions;let Ge=hi;b.toneMapped&&(Q===null||Q.isXRRenderTarget===!0)&&(Ge=s.toneMapping);const ft={shaderID:le,shaderType:b.type,shaderName:b.name,vertexShader:Xe,fragmentShader:qe,defines:b.defines,customVertexShaderID:je,customFragmentShaderID:$,isRawShaderMaterial:b.isRawShaderMaterial===!0,glslVersion:b.glslVersion,precision:d,batching:ye,batchingColor:ye&&O._colorsTexture!==null,instancing:be,instancingColor:be&&O.instanceColor!==null,instancingMorph:be&&O.morphTexture!==null,supportsVertexTextures:f,outputColorSpace:Q===null?s.outputColorSpace:Q.isXRRenderTarget===!0?Q.texture.colorSpace:Wt,alphaToCoverage:!!b.alphaToCoverage,map:ze,matcap:at,envMap:I,envMapMode:I&&K.mapping,envMapCubeUVHeight:G,aoMap:te,lightMap:Z,bumpMap:j,normalMap:Y,displacementMap:f&&ue,emissiveMap:ie,normalMapObjectSpace:Y&&b.normalMapType===ed,normalMapTangentSpace:Y&&b.normalMapType===vh,metalnessMap:he,roughnessMap:Ve,anisotropy:Be,anisotropyMap:q,clearcoat:C,clearcoatMap:Re,clearcoatNormalMap:ce,clearcoatRoughnessMap:Ee,dispersion:S,iridescence:k,iridescenceMap:we,iridescenceThicknessMap:se,sheen:X,sheenColorMap:_e,sheenRoughnessMap:Oe,specularMap:Pe,specularColorMap:ve,specularIntensityMap:We,transmission:ee,transmissionMap:N,thicknessMap:ae,gradientMap:fe,opaque:b.transparent===!1&&b.blending===Ri&&b.alphaToCoverage===!1,alphaMap:Se,alphaTest:re,alphaHash:J,combine:b.combine,mapUv:ze&&v(b.map.channel),aoMapUv:te&&v(b.aoMap.channel),lightMapUv:Z&&v(b.lightMap.channel),bumpMapUv:j&&v(b.bumpMap.channel),normalMapUv:Y&&v(b.normalMap.channel),displacementMapUv:ue&&v(b.displacementMap.channel),emissiveMapUv:ie&&v(b.emissiveMap.channel),metalnessMapUv:he&&v(b.metalnessMap.channel),roughnessMapUv:Ve&&v(b.roughnessMap.channel),anisotropyMapUv:q&&v(b.anisotropyMap.channel),clearcoatMapUv:Re&&v(b.clearcoatMap.channel),clearcoatNormalMapUv:ce&&v(b.clearcoatNormalMap.channel),clearcoatRoughnessMapUv:Ee&&v(b.clearcoatRoughnessMap.channel),iridescenceMapUv:we&&v(b.iridescenceMap.channel),iridescenceThicknessMapUv:se&&v(b.iridescenceThicknessMap.channel),sheenColorMapUv:_e&&v(b.sheenColorMap.channel),sheenRoughnessMapUv:Oe&&v(b.sheenRoughnessMap.channel),specularMapUv:Pe&&v(b.specularMap.channel),specularColorMapUv:ve&&v(b.specularColorMap.channel),specularIntensityMapUv:We&&v(b.specularIntensityMap.channel),transmissionMapUv:N&&v(b.transmissionMap.channel),thicknessMapUv:ae&&v(b.thicknessMap.channel),alphaMapUv:Se&&v(b.alphaMap.channel),vertexTangents:!!B.attributes.tangent&&(Y||Be),vertexColors:b.vertexColors,vertexAlphas:b.vertexColors===!0&&!!B.attributes.color&&B.attributes.color.itemSize===4,pointsUvs:O.isPoints===!0&&!!B.attributes.uv&&(ze||Se),fog:!!V,useFog:b.fog===!0,fogExp2:!!V&&V.isFogExp2,flatShading:b.flatShading===!0&&b.wireframe===!1,sizeAttenuation:b.sizeAttenuation===!0,logarithmicDepthBuffer:h,reversedDepthBuffer:me,skinning:O.isSkinnedMesh===!0,morphTargets:B.morphAttributes.position!==void 0,morphNormals:B.morphAttributes.normal!==void 0,morphColors:B.morphAttributes.color!==void 0,morphTargetsCount:pe,morphTextureStride:Ne,numDirLights:M.directional.length,numPointLights:M.point.length,numSpotLights:M.spot.length,numSpotLightMaps:M.spotLightMap.length,numRectAreaLights:M.rectArea.length,numHemiLights:M.hemi.length,numDirLightShadows:M.directionalShadowMap.length,numPointLightShadows:M.pointShadowMap.length,numSpotLightShadows:M.spotShadowMap.length,numSpotLightShadowsWithMaps:M.numSpotLightShadowsWithMaps,numLightProbes:M.numLightProbes,numClippingPlanes:o.numPlanes,numClipIntersection:o.numIntersection,dithering:b.dithering,shadowMapEnabled:s.shadowMap.enabled&&P.length>0,shadowMapType:s.shadowMap.type,toneMapping:Ge,decodeVideoTexture:ze&&b.map.isVideoTexture===!0&&et.getTransfer(b.map.colorSpace)===ct,decodeVideoTextureEmissive:ie&&b.emissiveMap.isVideoTexture===!0&&et.getTransfer(b.emissiveMap.colorSpace)===ct,premultipliedAlpha:b.premultipliedAlpha,doubleSided:b.side===cn,flipSided:b.side===Lt,useDepthPacking:b.depthPacking>=0,depthPacking:b.depthPacking||0,index0AttributeName:b.index0AttributeName,extensionClipCullDistance:Ae&&b.extensions.clipCullDistance===!0&&n.has("WEBGL_clip_cull_distance"),extensionMultiDraw:(Ae&&b.extensions.multiDraw===!0||ye)&&n.has("WEBGL_multi_draw"),rendererExtensionParallelShaderCompile:n.has("KHR_parallel_shader_compile"),customProgramCacheKey:b.customProgramCacheKey()};return ft.vertexUv1s=c.has(1),ft.vertexUv2s=c.has(2),ft.vertexUv3s=c.has(3),c.clear(),ft}function m(b){const M=[];if(b.shaderID?M.push(b.shaderID):(M.push(b.customVertexShaderID),M.push(b.customFragmentShaderID)),b.defines!==void 0)for(const P in b.defines)M.push(P),M.push(b.defines[P]);return b.isRawShaderMaterial===!1&&(_(M,b),y(M,b),M.push(s.outputColorSpace)),M.push(b.customProgramCacheKey),M.join()}function _(b,M){b.push(M.precision),b.push(M.outputColorSpace),b.push(M.envMapMode),b.push(M.envMapCubeUVHeight),b.push(M.mapUv),b.push(M.alphaMapUv),b.push(M.lightMapUv),b.push(M.aoMapUv),b.push(M.bumpMapUv),b.push(M.normalMapUv),b.push(M.displacementMapUv),b.push(M.emissiveMapUv),b.push(M.metalnessMapUv),b.push(M.roughnessMapUv),b.push(M.anisotropyMapUv),b.push(M.clearcoatMapUv),b.push(M.clearcoatNormalMapUv),b.push(M.clearcoatRoughnessMapUv),b.push(M.iridescenceMapUv),b.push(M.iridescenceThicknessMapUv),b.push(M.sheenColorMapUv),b.push(M.sheenRoughnessMapUv),b.push(M.specularMapUv),b.push(M.specularColorMapUv),b.push(M.specularIntensityMapUv),b.push(M.transmissionMapUv),b.push(M.thicknessMapUv),b.push(M.combine),b.push(M.fogExp2),b.push(M.sizeAttenuation),b.push(M.morphTargetsCount),b.push(M.morphAttributeCount),b.push(M.numDirLights),b.push(M.numPointLights),b.push(M.numSpotLights),b.push(M.numSpotLightMaps),b.push(M.numHemiLights),b.push(M.numRectAreaLights),b.push(M.numDirLightShadows),b.push(M.numPointLightShadows),b.push(M.numSpotLightShadows),b.push(M.numSpotLightShadowsWithMaps),b.push(M.numLightProbes),b.push(M.shadowMapType),b.push(M.toneMapping),b.push(M.numClippingPlanes),b.push(M.numClipIntersection),b.push(M.depthPacking)}function y(b,M){a.disableAll(),M.supportsVertexTextures&&a.enable(0),M.instancing&&a.enable(1),M.instancingColor&&a.enable(2),M.instancingMorph&&a.enable(3),M.matcap&&a.enable(4),M.envMap&&a.enable(5),M.normalMapObjectSpace&&a.enable(6),M.normalMapTangentSpace&&a.enable(7),M.clearcoat&&a.enable(8),M.iridescence&&a.enable(9),M.alphaTest&&a.enable(10),M.vertexColors&&a.enable(11),M.vertexAlphas&&a.enable(12),M.vertexUv1s&&a.enable(13),M.vertexUv2s&&a.enable(14),M.vertexUv3s&&a.enable(15),M.vertexTangents&&a.enable(16),M.anisotropy&&a.enable(17),M.alphaHash&&a.enable(18),M.batching&&a.enable(19),M.dispersion&&a.enable(20),M.batchingColor&&a.enable(21),M.gradientMap&&a.enable(22),b.push(a.mask),a.disableAll(),M.fog&&a.enable(0),M.useFog&&a.enable(1),M.flatShading&&a.enable(2),M.logarithmicDepthBuffer&&a.enable(3),M.reversedDepthBuffer&&a.enable(4),M.skinning&&a.enable(5),M.morphTargets&&a.enable(6),M.morphNormals&&a.enable(7),M.morphColors&&a.enable(8),M.premultipliedAlpha&&a.enable(9),M.shadowMapEnabled&&a.enable(10),M.doubleSided&&a.enable(11),M.flipSided&&a.enable(12),M.useDepthPacking&&a.enable(13),M.dithering&&a.enable(14),M.transmission&&a.enable(15),M.sheen&&a.enable(16),M.opaque&&a.enable(17),M.pointsUvs&&a.enable(18),M.decodeVideoTexture&&a.enable(19),M.decodeVideoTextureEmissive&&a.enable(20),M.alphaToCoverage&&a.enable(21),b.push(a.mask)}function x(b){const M=p[b.type];let P;if(M){const D=wn[M];P=Kd.clone(D.uniforms)}else P=b.uniforms;return P}function E(b,M){let P;for(let D=0,O=u.length;D<O;D++){const V=u[D];if(V.cacheKey===M){P=V,++P.usedTimes;break}}return P===void 0&&(P=new Px(s,M,b,r),u.push(P)),P}function A(b){if(--b.usedTimes===0){const M=u.indexOf(b);u[M]=u[u.length-1],u.pop(),b.destroy()}}function R(b){l.remove(b)}function L(){l.dispose()}return{getParameters:g,getProgramCacheKey:m,getUniforms:x,acquireProgram:E,releaseProgram:A,releaseShaderCache:R,programs:u,dispose:L}}function Ux(){let s=new WeakMap;function e(o){return s.has(o)}function t(o){let a=s.get(o);return a===void 0&&(a={},s.set(o,a)),a}function n(o){s.delete(o)}function i(o,a,l){s.get(o)[a]=l}function r(){s=new WeakMap}return{has:e,get:t,remove:n,update:i,dispose:r}}function Fx(s,e){return s.groupOrder!==e.groupOrder?s.groupOrder-e.groupOrder:s.renderOrder!==e.renderOrder?s.renderOrder-e.renderOrder:s.material.id!==e.material.id?s.material.id-e.material.id:s.z!==e.z?s.z-e.z:s.id-e.id}function Uu(s,e){return s.groupOrder!==e.groupOrder?s.groupOrder-e.groupOrder:s.renderOrder!==e.renderOrder?s.renderOrder-e.renderOrder:s.z!==e.z?e.z-s.z:s.id-e.id}function Fu(){const s=[];let e=0;const t=[],n=[],i=[];function r(){e=0,t.length=0,n.length=0,i.length=0}function o(h,f,d,p,v,g){let m=s[e];return m===void 0?(m={id:h.id,object:h,geometry:f,material:d,groupOrder:p,renderOrder:h.renderOrder,z:v,group:g},s[e]=m):(m.id=h.id,m.object=h,m.geometry=f,m.material=d,m.groupOrder=p,m.renderOrder=h.renderOrder,m.z=v,m.group=g),e++,m}function a(h,f,d,p,v,g){const m=o(h,f,d,p,v,g);d.transmission>0?n.push(m):d.transparent===!0?i.push(m):t.push(m)}function l(h,f,d,p,v,g){const m=o(h,f,d,p,v,g);d.transmission>0?n.unshift(m):d.transparent===!0?i.unshift(m):t.unshift(m)}function c(h,f){t.length>1&&t.sort(h||Fx),n.length>1&&n.sort(f||Uu),i.length>1&&i.sort(f||Uu)}function u(){for(let h=e,f=s.length;h<f;h++){const d=s[h];if(d.id===null)break;d.id=null,d.object=null,d.geometry=null,d.material=null,d.group=null}}return{opaque:t,transmissive:n,transparent:i,init:r,push:a,unshift:l,finish:u,sort:c}}function Ox(){let s=new WeakMap;function e(n,i){const r=s.get(n);let o;return r===void 0?(o=new Fu,s.set(n,[o])):i>=r.length?(o=new Fu,r.push(o)):o=r[i],o}function t(){s=new WeakMap}return{get:e,dispose:t}}function kx(){const s={};return{get:function(e){if(s[e.id]!==void 0)return s[e.id];let t;switch(e.type){case"DirectionalLight":t={direction:new w,color:new Ue};break;case"SpotLight":t={position:new w,direction:new w,color:new Ue,distance:0,coneCos:0,penumbraCos:0,decay:0};break;case"PointLight":t={position:new w,color:new Ue,distance:0,decay:0};break;case"HemisphereLight":t={direction:new w,skyColor:new Ue,groundColor:new Ue};break;case"RectAreaLight":t={color:new Ue,position:new w,halfWidth:new w,halfHeight:new w};break}return s[e.id]=t,t}}}function Bx(){const s={};return{get:function(e){if(s[e.id]!==void 0)return s[e.id];let t;switch(e.type){case"DirectionalLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new ne};break;case"SpotLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new ne};break;case"PointLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new ne,shadowCameraNear:1,shadowCameraFar:1e3};break}return s[e.id]=t,t}}}let zx=0;function Hx(s,e){return(e.castShadow?2:0)-(s.castShadow?2:0)+(e.map?1:0)-(s.map?1:0)}function Vx(s){const e=new kx,t=Bx(),n={version:0,hash:{directionalLength:-1,pointLength:-1,spotLength:-1,rectAreaLength:-1,hemiLength:-1,numDirectionalShadows:-1,numPointShadows:-1,numSpotShadows:-1,numSpotMaps:-1,numLightProbes:-1},ambient:[0,0,0],probe:[],directional:[],directionalShadow:[],directionalShadowMap:[],directionalShadowMatrix:[],spot:[],spotLightMap:[],spotShadow:[],spotShadowMap:[],spotLightMatrix:[],rectArea:[],rectAreaLTC1:null,rectAreaLTC2:null,point:[],pointShadow:[],pointShadowMap:[],pointShadowMatrix:[],hemi:[],numSpotLightShadowsWithMaps:0,numLightProbes:0};for(let c=0;c<9;c++)n.probe.push(new w);const i=new w,r=new Le,o=new Le;function a(c){let u=0,h=0,f=0;for(let b=0;b<9;b++)n.probe[b].set(0,0,0);let d=0,p=0,v=0,g=0,m=0,_=0,y=0,x=0,E=0,A=0,R=0;c.sort(Hx);for(let b=0,M=c.length;b<M;b++){const P=c[b],D=P.color,O=P.intensity,V=P.distance,B=P.shadow&&P.shadow.map?P.shadow.map.texture:null;if(P.isAmbientLight)u+=D.r*O,h+=D.g*O,f+=D.b*O;else if(P.isLightProbe){for(let W=0;W<9;W++)n.probe[W].addScaledVector(P.sh.coefficients[W],O);R++}else if(P.isDirectionalLight){const W=e.get(P);if(W.color.copy(P.color).multiplyScalar(P.intensity),P.castShadow){const K=P.shadow,G=t.get(P);G.shadowIntensity=K.intensity,G.shadowBias=K.bias,G.shadowNormalBias=K.normalBias,G.shadowRadius=K.radius,G.shadowMapSize=K.mapSize,n.directionalShadow[d]=G,n.directionalShadowMap[d]=B,n.directionalShadowMatrix[d]=P.shadow.matrix,_++}n.directional[d]=W,d++}else if(P.isSpotLight){const W=e.get(P);W.position.setFromMatrixPosition(P.matrixWorld),W.color.copy(D).multiplyScalar(O),W.distance=V,W.coneCos=Math.cos(P.angle),W.penumbraCos=Math.cos(P.angle*(1-P.penumbra)),W.decay=P.decay,n.spot[v]=W;const K=P.shadow;if(P.map&&(n.spotLightMap[E]=P.map,E++,K.updateMatrices(P),P.castShadow&&A++),n.spotLightMatrix[v]=K.matrix,P.castShadow){const G=t.get(P);G.shadowIntensity=K.intensity,G.shadowBias=K.bias,G.shadowNormalBias=K.normalBias,G.shadowRadius=K.radius,G.shadowMapSize=K.mapSize,n.spotShadow[v]=G,n.spotShadowMap[v]=B,x++}v++}else if(P.isRectAreaLight){const W=e.get(P);W.color.copy(D).multiplyScalar(O),W.halfWidth.set(P.width*.5,0,0),W.halfHeight.set(0,P.height*.5,0),n.rectArea[g]=W,g++}else if(P.isPointLight){const W=e.get(P);if(W.color.copy(P.color).multiplyScalar(P.intensity),W.distance=P.distance,W.decay=P.decay,P.castShadow){const K=P.shadow,G=t.get(P);G.shadowIntensity=K.intensity,G.shadowBias=K.bias,G.shadowNormalBias=K.normalBias,G.shadowRadius=K.radius,G.shadowMapSize=K.mapSize,G.shadowCameraNear=K.camera.near,G.shadowCameraFar=K.camera.far,n.pointShadow[p]=G,n.pointShadowMap[p]=B,n.pointShadowMatrix[p]=P.shadow.matrix,y++}n.point[p]=W,p++}else if(P.isHemisphereLight){const W=e.get(P);W.skyColor.copy(P.color).multiplyScalar(O),W.groundColor.copy(P.groundColor).multiplyScalar(O),n.hemi[m]=W,m++}}g>0&&(s.has("OES_texture_float_linear")===!0?(n.rectAreaLTC1=ge.LTC_FLOAT_1,n.rectAreaLTC2=ge.LTC_FLOAT_2):(n.rectAreaLTC1=ge.LTC_HALF_1,n.rectAreaLTC2=ge.LTC_HALF_2)),n.ambient[0]=u,n.ambient[1]=h,n.ambient[2]=f;const L=n.hash;(L.directionalLength!==d||L.pointLength!==p||L.spotLength!==v||L.rectAreaLength!==g||L.hemiLength!==m||L.numDirectionalShadows!==_||L.numPointShadows!==y||L.numSpotShadows!==x||L.numSpotMaps!==E||L.numLightProbes!==R)&&(n.directional.length=d,n.spot.length=v,n.rectArea.length=g,n.point.length=p,n.hemi.length=m,n.directionalShadow.length=_,n.directionalShadowMap.length=_,n.pointShadow.length=y,n.pointShadowMap.length=y,n.spotShadow.length=x,n.spotShadowMap.length=x,n.directionalShadowMatrix.length=_,n.pointShadowMatrix.length=y,n.spotLightMatrix.length=x+E-A,n.spotLightMap.length=E,n.numSpotLightShadowsWithMaps=A,n.numLightProbes=R,L.directionalLength=d,L.pointLength=p,L.spotLength=v,L.rectAreaLength=g,L.hemiLength=m,L.numDirectionalShadows=_,L.numPointShadows=y,L.numSpotShadows=x,L.numSpotMaps=E,L.numLightProbes=R,n.version=zx++)}function l(c,u){let h=0,f=0,d=0,p=0,v=0;const g=u.matrixWorldInverse;for(let m=0,_=c.length;m<_;m++){const y=c[m];if(y.isDirectionalLight){const x=n.directional[h];x.direction.setFromMatrixPosition(y.matrixWorld),i.setFromMatrixPosition(y.target.matrixWorld),x.direction.sub(i),x.direction.transformDirection(g),h++}else if(y.isSpotLight){const x=n.spot[d];x.position.setFromMatrixPosition(y.matrixWorld),x.position.applyMatrix4(g),x.direction.setFromMatrixPosition(y.matrixWorld),i.setFromMatrixPosition(y.target.matrixWorld),x.direction.sub(i),x.direction.transformDirection(g),d++}else if(y.isRectAreaLight){const x=n.rectArea[p];x.position.setFromMatrixPosition(y.matrixWorld),x.position.applyMatrix4(g),o.identity(),r.copy(y.matrixWorld),r.premultiply(g),o.extractRotation(r),x.halfWidth.set(y.width*.5,0,0),x.halfHeight.set(0,y.height*.5,0),x.halfWidth.applyMatrix4(o),x.halfHeight.applyMatrix4(o),p++}else if(y.isPointLight){const x=n.point[f];x.position.setFromMatrixPosition(y.matrixWorld),x.position.applyMatrix4(g),f++}else if(y.isHemisphereLight){const x=n.hemi[v];x.direction.setFromMatrixPosition(y.matrixWorld),x.direction.transformDirection(g),v++}}}return{setup:a,setupView:l,state:n}}function Ou(s){const e=new Vx(s),t=[],n=[];function i(u){c.camera=u,t.length=0,n.length=0}function r(u){t.push(u)}function o(u){n.push(u)}function a(){e.setup(t)}function l(u){e.setupView(t,u)}const c={lightsArray:t,shadowsArray:n,camera:null,lights:e,transmissionRenderTarget:{}};return{init:i,state:c,setupLights:a,setupLightsView:l,pushLight:r,pushShadow:o}}function Gx(s){let e=new WeakMap;function t(i,r=0){const o=e.get(i);let a;return o===void 0?(a=new Ou(s),e.set(i,[a])):r>=o.length?(a=new Ou(s),o.push(a)):a=o[r],a}function n(){e=new WeakMap}return{get:t,dispose:n}}const Wx=`void main() {
	gl_Position = vec4( position, 1.0 );
}`,Xx=`uniform sampler2D shadow_pass;
uniform vec2 resolution;
uniform float radius;
#include <packing>
void main() {
	const float samples = float( VSM_SAMPLES );
	float mean = 0.0;
	float squared_mean = 0.0;
	float uvStride = samples <= 1.0 ? 0.0 : 2.0 / ( samples - 1.0 );
	float uvStart = samples <= 1.0 ? 0.0 : - 1.0;
	for ( float i = 0.0; i < samples; i ++ ) {
		float uvOffset = uvStart + i * uvStride;
		#ifdef HORIZONTAL_PASS
			vec2 distribution = unpackRGBATo2Half( texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( uvOffset, 0.0 ) * radius ) / resolution ) );
			mean += distribution.x;
			squared_mean += distribution.y * distribution.y + distribution.x * distribution.x;
		#else
			float depth = unpackRGBAToDepth( texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( 0.0, uvOffset ) * radius ) / resolution ) );
			mean += depth;
			squared_mean += depth * depth;
		#endif
	}
	mean = mean / samples;
	squared_mean = squared_mean / samples;
	float std_dev = sqrt( squared_mean - mean * mean );
	gl_FragColor = pack2HalfToRGBA( vec2( mean, std_dev ) );
}`;function qx(s,e,t){let n=new Hl;const i=new ne,r=new ne,o=new He,a=new Vp({depthPacking:Qf}),l=new Gp,c={},u=t.maxTextureSize,h={[Yn]:Lt,[Lt]:Yn,[cn]:cn},f=new Tt({defines:{VSM_SAMPLES:8},uniforms:{shadow_pass:{value:null},resolution:{value:new ne},radius:{value:4}},vertexShader:Wx,fragmentShader:Xx}),d=f.clone();d.defines.HORIZONTAL_PASS=1;const p=new Et;p.setAttribute("position",new Gt(new Float32Array([-1,-1,.5,3,-1,.5,-1,3,.5]),3));const v=new Ye(p,f),g=this;this.enabled=!1,this.autoUpdate=!0,this.needsUpdate=!1,this.type=eh;let m=this.type;this.render=function(A,R,L){if(g.enabled===!1||g.autoUpdate===!1&&g.needsUpdate===!1||A.length===0)return;const b=s.getRenderTarget(),M=s.getActiveCubeFace(),P=s.getActiveMipmapLevel(),D=s.state;D.setBlending(ui),D.buffers.depth.getReversed()===!0?D.buffers.color.setClear(0,0,0,0):D.buffers.color.setClear(1,1,1,1),D.buffers.depth.setTest(!0),D.setScissorTest(!1);const O=m!==Gn&&this.type===Gn,V=m===Gn&&this.type!==Gn;for(let B=0,W=A.length;B<W;B++){const K=A[B],G=K.shadow;if(G===void 0){console.warn("THREE.WebGLShadowMap:",K,"has no shadow.");continue}if(G.autoUpdate===!1&&G.needsUpdate===!1)continue;i.copy(G.mapSize);const le=G.getFrameExtents();if(i.multiply(le),r.copy(G.mapSize),(i.x>u||i.y>u)&&(i.x>u&&(r.x=Math.floor(u/le.x),i.x=r.x*le.x,G.mapSize.x=r.x),i.y>u&&(r.y=Math.floor(u/le.y),i.y=r.y*le.y,G.mapSize.y=r.y)),G.map===null||O===!0||V===!0){const pe=this.type!==Gn?{minFilter:Vt,magFilter:Vt}:{};G.map!==null&&G.map.dispose(),G.map=new Ln(i.x,i.y,pe),G.map.texture.name=K.name+".shadowMap",G.camera.updateProjectionMatrix()}s.setRenderTarget(G.map),s.clear();const de=G.getViewportCount();for(let pe=0;pe<de;pe++){const Ne=G.getViewport(pe);o.set(r.x*Ne.x,r.y*Ne.y,r.x*Ne.z,r.y*Ne.w),D.viewport(o),G.updateMatrices(K,pe),n=G.getFrustum(),x(R,L,G.camera,K,this.type)}G.isPointLightShadow!==!0&&this.type===Gn&&_(G,L),G.needsUpdate=!1}m=this.type,g.needsUpdate=!1,s.setRenderTarget(b,M,P)};function _(A,R){const L=e.update(v);f.defines.VSM_SAMPLES!==A.blurSamples&&(f.defines.VSM_SAMPLES=A.blurSamples,d.defines.VSM_SAMPLES=A.blurSamples,f.needsUpdate=!0,d.needsUpdate=!0),A.mapPass===null&&(A.mapPass=new Ln(i.x,i.y)),f.uniforms.shadow_pass.value=A.map.texture,f.uniforms.resolution.value=A.mapSize,f.uniforms.radius.value=A.radius,s.setRenderTarget(A.mapPass),s.clear(),s.renderBufferDirect(R,null,L,f,v,null),d.uniforms.shadow_pass.value=A.mapPass.texture,d.uniforms.resolution.value=A.mapSize,d.uniforms.radius.value=A.radius,s.setRenderTarget(A.map),s.clear(),s.renderBufferDirect(R,null,L,d,v,null)}function y(A,R,L,b){let M=null;const P=L.isPointLight===!0?A.customDistanceMaterial:A.customDepthMaterial;if(P!==void 0)M=P;else if(M=L.isPointLight===!0?l:a,s.localClippingEnabled&&R.clipShadows===!0&&Array.isArray(R.clippingPlanes)&&R.clippingPlanes.length!==0||R.displacementMap&&R.displacementScale!==0||R.alphaMap&&R.alphaTest>0||R.map&&R.alphaTest>0||R.alphaToCoverage===!0){const D=M.uuid,O=R.uuid;let V=c[D];V===void 0&&(V={},c[D]=V);let B=V[O];B===void 0&&(B=M.clone(),V[O]=B,R.addEventListener("dispose",E)),M=B}if(M.visible=R.visible,M.wireframe=R.wireframe,b===Gn?M.side=R.shadowSide!==null?R.shadowSide:R.side:M.side=R.shadowSide!==null?R.shadowSide:h[R.side],M.alphaMap=R.alphaMap,M.alphaTest=R.alphaToCoverage===!0?.5:R.alphaTest,M.map=R.map,M.clipShadows=R.clipShadows,M.clippingPlanes=R.clippingPlanes,M.clipIntersection=R.clipIntersection,M.displacementMap=R.displacementMap,M.displacementScale=R.displacementScale,M.displacementBias=R.displacementBias,M.wireframeLinewidth=R.wireframeLinewidth,M.linewidth=R.linewidth,L.isPointLight===!0&&M.isMeshDistanceMaterial===!0){const D=s.properties.get(M);D.light=L}return M}function x(A,R,L,b,M){if(A.visible===!1)return;if(A.layers.test(R.layers)&&(A.isMesh||A.isLine||A.isPoints)&&(A.castShadow||A.receiveShadow&&M===Gn)&&(!A.frustumCulled||n.intersectsObject(A))){A.modelViewMatrix.multiplyMatrices(L.matrixWorldInverse,A.matrixWorld);const O=e.update(A),V=A.material;if(Array.isArray(V)){const B=O.groups;for(let W=0,K=B.length;W<K;W++){const G=B[W],le=V[G.materialIndex];if(le&&le.visible){const de=y(A,le,b,M);A.onBeforeShadow(s,A,R,L,O,de,G),s.renderBufferDirect(L,null,O,de,A,G),A.onAfterShadow(s,A,R,L,O,de,G)}}}else if(V.visible){const B=y(A,V,b,M);A.onBeforeShadow(s,A,R,L,O,B,null),s.renderBufferDirect(L,null,O,B,A,null),A.onAfterShadow(s,A,R,L,O,B,null)}}const D=A.children;for(let O=0,V=D.length;O<V;O++)x(D[O],R,L,b,M)}function E(A){A.target.removeEventListener("dispose",E);for(const L in c){const b=c[L],M=A.target.uuid;M in b&&(b[M].dispose(),delete b[M])}}}const Kx={[Pa]:La,[Ia]:Ua,[Da]:Fa,[us]:Na,[La]:Pa,[Ua]:Ia,[Fa]:Da,[Na]:us};function $x(s,e){function t(){let N=!1;const ae=new He;let fe=null;const Se=new He(0,0,0,0);return{setMask:function(re){fe!==re&&!N&&(s.colorMask(re,re,re,re),fe=re)},setLocked:function(re){N=re},setClear:function(re,J,Ae,Ge,ft){ft===!0&&(re*=Ge,J*=Ge,Ae*=Ge),ae.set(re,J,Ae,Ge),Se.equals(ae)===!1&&(s.clearColor(re,J,Ae,Ge),Se.copy(ae))},reset:function(){N=!1,fe=null,Se.set(-1,0,0,0)}}}function n(){let N=!1,ae=!1,fe=null,Se=null,re=null;return{setReversed:function(J){if(ae!==J){const Ae=e.get("EXT_clip_control");J?Ae.clipControlEXT(Ae.LOWER_LEFT_EXT,Ae.ZERO_TO_ONE_EXT):Ae.clipControlEXT(Ae.LOWER_LEFT_EXT,Ae.NEGATIVE_ONE_TO_ONE_EXT),ae=J;const Ge=re;re=null,this.setClear(Ge)}},getReversed:function(){return ae},setTest:function(J){J?Q(s.DEPTH_TEST):me(s.DEPTH_TEST)},setMask:function(J){fe!==J&&!N&&(s.depthMask(J),fe=J)},setFunc:function(J){if(ae&&(J=Kx[J]),Se!==J){switch(J){case Pa:s.depthFunc(s.NEVER);break;case La:s.depthFunc(s.ALWAYS);break;case Ia:s.depthFunc(s.LESS);break;case us:s.depthFunc(s.LEQUAL);break;case Da:s.depthFunc(s.EQUAL);break;case Na:s.depthFunc(s.GEQUAL);break;case Ua:s.depthFunc(s.GREATER);break;case Fa:s.depthFunc(s.NOTEQUAL);break;default:s.depthFunc(s.LEQUAL)}Se=J}},setLocked:function(J){N=J},setClear:function(J){re!==J&&(ae&&(J=1-J),s.clearDepth(J),re=J)},reset:function(){N=!1,fe=null,Se=null,re=null,ae=!1}}}function i(){let N=!1,ae=null,fe=null,Se=null,re=null,J=null,Ae=null,Ge=null,ft=null;return{setTest:function(nt){N||(nt?Q(s.STENCIL_TEST):me(s.STENCIL_TEST))},setMask:function(nt){ae!==nt&&!N&&(s.stencilMask(nt),ae=nt)},setFunc:function(nt,Un,Sn){(fe!==nt||Se!==Un||re!==Sn)&&(s.stencilFunc(nt,Un,Sn),fe=nt,Se=Un,re=Sn)},setOp:function(nt,Un,Sn){(J!==nt||Ae!==Un||Ge!==Sn)&&(s.stencilOp(nt,Un,Sn),J=nt,Ae=Un,Ge=Sn)},setLocked:function(nt){N=nt},setClear:function(nt){ft!==nt&&(s.clearStencil(nt),ft=nt)},reset:function(){N=!1,ae=null,fe=null,Se=null,re=null,J=null,Ae=null,Ge=null,ft=null}}}const r=new t,o=new n,a=new i,l=new WeakMap,c=new WeakMap;let u={},h={},f=new WeakMap,d=[],p=null,v=!1,g=null,m=null,_=null,y=null,x=null,E=null,A=null,R=new Ue(0,0,0),L=0,b=!1,M=null,P=null,D=null,O=null,V=null;const B=s.getParameter(s.MAX_COMBINED_TEXTURE_IMAGE_UNITS);let W=!1,K=0;const G=s.getParameter(s.VERSION);G.indexOf("WebGL")!==-1?(K=parseFloat(/^WebGL (\d)/.exec(G)[1]),W=K>=1):G.indexOf("OpenGL ES")!==-1&&(K=parseFloat(/^OpenGL ES (\d)/.exec(G)[1]),W=K>=2);let le=null,de={};const pe=s.getParameter(s.SCISSOR_BOX),Ne=s.getParameter(s.VIEWPORT),Xe=new He().fromArray(pe),qe=new He().fromArray(Ne);function je(N,ae,fe,Se){const re=new Uint8Array(4),J=s.createTexture();s.bindTexture(N,J),s.texParameteri(N,s.TEXTURE_MIN_FILTER,s.NEAREST),s.texParameteri(N,s.TEXTURE_MAG_FILTER,s.NEAREST);for(let Ae=0;Ae<fe;Ae++)N===s.TEXTURE_3D||N===s.TEXTURE_2D_ARRAY?s.texImage3D(ae,0,s.RGBA,1,1,Se,0,s.RGBA,s.UNSIGNED_BYTE,re):s.texImage2D(ae+Ae,0,s.RGBA,1,1,0,s.RGBA,s.UNSIGNED_BYTE,re);return J}const $={};$[s.TEXTURE_2D]=je(s.TEXTURE_2D,s.TEXTURE_2D,1),$[s.TEXTURE_CUBE_MAP]=je(s.TEXTURE_CUBE_MAP,s.TEXTURE_CUBE_MAP_POSITIVE_X,6),$[s.TEXTURE_2D_ARRAY]=je(s.TEXTURE_2D_ARRAY,s.TEXTURE_2D_ARRAY,1,1),$[s.TEXTURE_3D]=je(s.TEXTURE_3D,s.TEXTURE_3D,1,1),r.setClear(0,0,0,1),o.setClear(1),a.setClear(0),Q(s.DEPTH_TEST),o.setFunc(us),j(!1),Y(pc),Q(s.CULL_FACE),te(ui);function Q(N){u[N]!==!0&&(s.enable(N),u[N]=!0)}function me(N){u[N]!==!1&&(s.disable(N),u[N]=!1)}function be(N,ae){return h[N]!==ae?(s.bindFramebuffer(N,ae),h[N]=ae,N===s.DRAW_FRAMEBUFFER&&(h[s.FRAMEBUFFER]=ae),N===s.FRAMEBUFFER&&(h[s.DRAW_FRAMEBUFFER]=ae),!0):!1}function ye(N,ae){let fe=d,Se=!1;if(N){fe=f.get(ae),fe===void 0&&(fe=[],f.set(ae,fe));const re=N.textures;if(fe.length!==re.length||fe[0]!==s.COLOR_ATTACHMENT0){for(let J=0,Ae=re.length;J<Ae;J++)fe[J]=s.COLOR_ATTACHMENT0+J;fe.length=re.length,Se=!0}}else fe[0]!==s.BACK&&(fe[0]=s.BACK,Se=!0);Se&&s.drawBuffers(fe)}function ze(N){return p!==N?(s.useProgram(N),p=N,!0):!1}const at={[li]:s.FUNC_ADD,[Af]:s.FUNC_SUBTRACT,[Rf]:s.FUNC_REVERSE_SUBTRACT};at[Cf]=s.MIN,at[Pf]=s.MAX;const I={[Lf]:s.ZERO,[nh]:s.ONE,[If]:s.SRC_COLOR,[Ca]:s.SRC_ALPHA,[kf]:s.SRC_ALPHA_SATURATE,[Ff]:s.DST_COLOR,[Nf]:s.DST_ALPHA,[Df]:s.ONE_MINUS_SRC_COLOR,[go]:s.ONE_MINUS_SRC_ALPHA,[Of]:s.ONE_MINUS_DST_COLOR,[Uf]:s.ONE_MINUS_DST_ALPHA,[Bf]:s.CONSTANT_COLOR,[zf]:s.ONE_MINUS_CONSTANT_COLOR,[Hf]:s.CONSTANT_ALPHA,[Vf]:s.ONE_MINUS_CONSTANT_ALPHA};function te(N,ae,fe,Se,re,J,Ae,Ge,ft,nt){if(N===ui){v===!0&&(me(s.BLEND),v=!1);return}if(v===!1&&(Q(s.BLEND),v=!0),N!==th){if(N!==g||nt!==b){if((m!==li||x!==li)&&(s.blendEquation(s.FUNC_ADD),m=li,x=li),nt)switch(N){case Ri:s.blendFuncSeparate(s.ONE,s.ONE_MINUS_SRC_ALPHA,s.ONE,s.ONE_MINUS_SRC_ALPHA);break;case nr:s.blendFunc(s.ONE,s.ONE);break;case mc:s.blendFuncSeparate(s.ZERO,s.ONE_MINUS_SRC_COLOR,s.ZERO,s.ONE);break;case gc:s.blendFuncSeparate(s.DST_COLOR,s.ONE_MINUS_SRC_ALPHA,s.ZERO,s.ONE);break;default:console.error("THREE.WebGLState: Invalid blending: ",N);break}else switch(N){case Ri:s.blendFuncSeparate(s.SRC_ALPHA,s.ONE_MINUS_SRC_ALPHA,s.ONE,s.ONE_MINUS_SRC_ALPHA);break;case nr:s.blendFuncSeparate(s.SRC_ALPHA,s.ONE,s.ONE,s.ONE);break;case mc:console.error("THREE.WebGLState: SubtractiveBlending requires material.premultipliedAlpha = true");break;case gc:console.error("THREE.WebGLState: MultiplyBlending requires material.premultipliedAlpha = true");break;default:console.error("THREE.WebGLState: Invalid blending: ",N);break}_=null,y=null,E=null,A=null,R.set(0,0,0),L=0,g=N,b=nt}return}re=re||ae,J=J||fe,Ae=Ae||Se,(ae!==m||re!==x)&&(s.blendEquationSeparate(at[ae],at[re]),m=ae,x=re),(fe!==_||Se!==y||J!==E||Ae!==A)&&(s.blendFuncSeparate(I[fe],I[Se],I[J],I[Ae]),_=fe,y=Se,E=J,A=Ae),(Ge.equals(R)===!1||ft!==L)&&(s.blendColor(Ge.r,Ge.g,Ge.b,ft),R.copy(Ge),L=ft),g=N,b=!1}function Z(N,ae){N.side===cn?me(s.CULL_FACE):Q(s.CULL_FACE);let fe=N.side===Lt;ae&&(fe=!fe),j(fe),N.blending===Ri&&N.transparent===!1?te(ui):te(N.blending,N.blendEquation,N.blendSrc,N.blendDst,N.blendEquationAlpha,N.blendSrcAlpha,N.blendDstAlpha,N.blendColor,N.blendAlpha,N.premultipliedAlpha),o.setFunc(N.depthFunc),o.setTest(N.depthTest),o.setMask(N.depthWrite),r.setMask(N.colorWrite);const Se=N.stencilWrite;a.setTest(Se),Se&&(a.setMask(N.stencilWriteMask),a.setFunc(N.stencilFunc,N.stencilRef,N.stencilFuncMask),a.setOp(N.stencilFail,N.stencilZFail,N.stencilZPass)),ie(N.polygonOffset,N.polygonOffsetFactor,N.polygonOffsetUnits),N.alphaToCoverage===!0?Q(s.SAMPLE_ALPHA_TO_COVERAGE):me(s.SAMPLE_ALPHA_TO_COVERAGE)}function j(N){M!==N&&(N?s.frontFace(s.CW):s.frontFace(s.CCW),M=N)}function Y(N){N!==Tf?(Q(s.CULL_FACE),N!==P&&(N===pc?s.cullFace(s.BACK):N===Ef?s.cullFace(s.FRONT):s.cullFace(s.FRONT_AND_BACK))):me(s.CULL_FACE),P=N}function ue(N){N!==D&&(W&&s.lineWidth(N),D=N)}function ie(N,ae,fe){N?(Q(s.POLYGON_OFFSET_FILL),(O!==ae||V!==fe)&&(s.polygonOffset(ae,fe),O=ae,V=fe)):me(s.POLYGON_OFFSET_FILL)}function he(N){N?Q(s.SCISSOR_TEST):me(s.SCISSOR_TEST)}function Ve(N){N===void 0&&(N=s.TEXTURE0+B-1),le!==N&&(s.activeTexture(N),le=N)}function Be(N,ae,fe){fe===void 0&&(le===null?fe=s.TEXTURE0+B-1:fe=le);let Se=de[fe];Se===void 0&&(Se={type:void 0,texture:void 0},de[fe]=Se),(Se.type!==N||Se.texture!==ae)&&(le!==fe&&(s.activeTexture(fe),le=fe),s.bindTexture(N,ae||$[N]),Se.type=N,Se.texture=ae)}function C(){const N=de[le];N!==void 0&&N.type!==void 0&&(s.bindTexture(N.type,null),N.type=void 0,N.texture=void 0)}function S(){try{s.compressedTexImage2D(...arguments)}catch(N){console.error("THREE.WebGLState:",N)}}function k(){try{s.compressedTexImage3D(...arguments)}catch(N){console.error("THREE.WebGLState:",N)}}function X(){try{s.texSubImage2D(...arguments)}catch(N){console.error("THREE.WebGLState:",N)}}function ee(){try{s.texSubImage3D(...arguments)}catch(N){console.error("THREE.WebGLState:",N)}}function q(){try{s.compressedTexSubImage2D(...arguments)}catch(N){console.error("THREE.WebGLState:",N)}}function Re(){try{s.compressedTexSubImage3D(...arguments)}catch(N){console.error("THREE.WebGLState:",N)}}function ce(){try{s.texStorage2D(...arguments)}catch(N){console.error("THREE.WebGLState:",N)}}function Ee(){try{s.texStorage3D(...arguments)}catch(N){console.error("THREE.WebGLState:",N)}}function we(){try{s.texImage2D(...arguments)}catch(N){console.error("THREE.WebGLState:",N)}}function se(){try{s.texImage3D(...arguments)}catch(N){console.error("THREE.WebGLState:",N)}}function _e(N){Xe.equals(N)===!1&&(s.scissor(N.x,N.y,N.z,N.w),Xe.copy(N))}function Oe(N){qe.equals(N)===!1&&(s.viewport(N.x,N.y,N.z,N.w),qe.copy(N))}function Pe(N,ae){let fe=c.get(ae);fe===void 0&&(fe=new WeakMap,c.set(ae,fe));let Se=fe.get(N);Se===void 0&&(Se=s.getUniformBlockIndex(ae,N.name),fe.set(N,Se))}function ve(N,ae){const Se=c.get(ae).get(N);l.get(ae)!==Se&&(s.uniformBlockBinding(ae,Se,N.__bindingPointIndex),l.set(ae,Se))}function We(){s.disable(s.BLEND),s.disable(s.CULL_FACE),s.disable(s.DEPTH_TEST),s.disable(s.POLYGON_OFFSET_FILL),s.disable(s.SCISSOR_TEST),s.disable(s.STENCIL_TEST),s.disable(s.SAMPLE_ALPHA_TO_COVERAGE),s.blendEquation(s.FUNC_ADD),s.blendFunc(s.ONE,s.ZERO),s.blendFuncSeparate(s.ONE,s.ZERO,s.ONE,s.ZERO),s.blendColor(0,0,0,0),s.colorMask(!0,!0,!0,!0),s.clearColor(0,0,0,0),s.depthMask(!0),s.depthFunc(s.LESS),o.setReversed(!1),s.clearDepth(1),s.stencilMask(4294967295),s.stencilFunc(s.ALWAYS,0,4294967295),s.stencilOp(s.KEEP,s.KEEP,s.KEEP),s.clearStencil(0),s.cullFace(s.BACK),s.frontFace(s.CCW),s.polygonOffset(0,0),s.activeTexture(s.TEXTURE0),s.bindFramebuffer(s.FRAMEBUFFER,null),s.bindFramebuffer(s.DRAW_FRAMEBUFFER,null),s.bindFramebuffer(s.READ_FRAMEBUFFER,null),s.useProgram(null),s.lineWidth(1),s.scissor(0,0,s.canvas.width,s.canvas.height),s.viewport(0,0,s.canvas.width,s.canvas.height),u={},le=null,de={},h={},f=new WeakMap,d=[],p=null,v=!1,g=null,m=null,_=null,y=null,x=null,E=null,A=null,R=new Ue(0,0,0),L=0,b=!1,M=null,P=null,D=null,O=null,V=null,Xe.set(0,0,s.canvas.width,s.canvas.height),qe.set(0,0,s.canvas.width,s.canvas.height),r.reset(),o.reset(),a.reset()}return{buffers:{color:r,depth:o,stencil:a},enable:Q,disable:me,bindFramebuffer:be,drawBuffers:ye,useProgram:ze,setBlending:te,setMaterial:Z,setFlipSided:j,setCullFace:Y,setLineWidth:ue,setPolygonOffset:ie,setScissorTest:he,activeTexture:Ve,bindTexture:Be,unbindTexture:C,compressedTexImage2D:S,compressedTexImage3D:k,texImage2D:we,texImage3D:se,updateUBOMapping:Pe,uniformBlockBinding:ve,texStorage2D:ce,texStorage3D:Ee,texSubImage2D:X,texSubImage3D:ee,compressedTexSubImage2D:q,compressedTexSubImage3D:Re,scissor:_e,viewport:Oe,reset:We}}function Yx(s,e,t,n,i,r,o){const a=e.has("WEBGL_multisampled_render_to_texture")?e.get("WEBGL_multisampled_render_to_texture"):null,l=typeof navigator>"u"?!1:/OculusBrowser/g.test(navigator.userAgent),c=new ne,u=new WeakMap;let h;const f=new WeakMap;let d=!1;try{d=typeof OffscreenCanvas<"u"&&new OffscreenCanvas(1,1).getContext("2d")!==null}catch{}function p(C,S){return d?new OffscreenCanvas(C,S):cr("canvas")}function v(C,S,k){let X=1;const ee=Be(C);if((ee.width>k||ee.height>k)&&(X=k/Math.max(ee.width,ee.height)),X<1)if(typeof HTMLImageElement<"u"&&C instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&C instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&C instanceof ImageBitmap||typeof VideoFrame<"u"&&C instanceof VideoFrame){const q=Math.floor(X*ee.width),Re=Math.floor(X*ee.height);h===void 0&&(h=p(q,Re));const ce=S?p(q,Re):h;return ce.width=q,ce.height=Re,ce.getContext("2d").drawImage(C,0,0,q,Re),console.warn("THREE.WebGLRenderer: Texture has been resized from ("+ee.width+"x"+ee.height+") to ("+q+"x"+Re+")."),ce}else return"data"in C&&console.warn("THREE.WebGLRenderer: Image in DataTexture is too big ("+ee.width+"x"+ee.height+")."),C;return C}function g(C){return C.generateMipmaps}function m(C){s.generateMipmap(C)}function _(C){return C.isWebGLCubeRenderTarget?s.TEXTURE_CUBE_MAP:C.isWebGL3DRenderTarget?s.TEXTURE_3D:C.isWebGLArrayRenderTarget||C.isCompressedArrayTexture?s.TEXTURE_2D_ARRAY:s.TEXTURE_2D}function y(C,S,k,X,ee=!1){if(C!==null){if(s[C]!==void 0)return s[C];console.warn("THREE.WebGLRenderer: Attempt to use non-existing WebGL internal format '"+C+"'")}let q=S;if(S===s.RED&&(k===s.FLOAT&&(q=s.R32F),k===s.HALF_FLOAT&&(q=s.R16F),k===s.UNSIGNED_BYTE&&(q=s.R8)),S===s.RED_INTEGER&&(k===s.UNSIGNED_BYTE&&(q=s.R8UI),k===s.UNSIGNED_SHORT&&(q=s.R16UI),k===s.UNSIGNED_INT&&(q=s.R32UI),k===s.BYTE&&(q=s.R8I),k===s.SHORT&&(q=s.R16I),k===s.INT&&(q=s.R32I)),S===s.RG&&(k===s.FLOAT&&(q=s.RG32F),k===s.HALF_FLOAT&&(q=s.RG16F),k===s.UNSIGNED_BYTE&&(q=s.RG8)),S===s.RG_INTEGER&&(k===s.UNSIGNED_BYTE&&(q=s.RG8UI),k===s.UNSIGNED_SHORT&&(q=s.RG16UI),k===s.UNSIGNED_INT&&(q=s.RG32UI),k===s.BYTE&&(q=s.RG8I),k===s.SHORT&&(q=s.RG16I),k===s.INT&&(q=s.RG32I)),S===s.RGB_INTEGER&&(k===s.UNSIGNED_BYTE&&(q=s.RGB8UI),k===s.UNSIGNED_SHORT&&(q=s.RGB16UI),k===s.UNSIGNED_INT&&(q=s.RGB32UI),k===s.BYTE&&(q=s.RGB8I),k===s.SHORT&&(q=s.RGB16I),k===s.INT&&(q=s.RGB32I)),S===s.RGBA_INTEGER&&(k===s.UNSIGNED_BYTE&&(q=s.RGBA8UI),k===s.UNSIGNED_SHORT&&(q=s.RGBA16UI),k===s.UNSIGNED_INT&&(q=s.RGBA32UI),k===s.BYTE&&(q=s.RGBA8I),k===s.SHORT&&(q=s.RGBA16I),k===s.INT&&(q=s.RGBA32I)),S===s.RGB&&(k===s.UNSIGNED_INT_5_9_9_9_REV&&(q=s.RGB9_E5),k===s.UNSIGNED_INT_10F_11F_11F_REV&&(q=s.R11F_G11F_B10F)),S===s.RGBA){const Re=ee?xo:et.getTransfer(X);k===s.FLOAT&&(q=s.RGBA32F),k===s.HALF_FLOAT&&(q=s.RGBA16F),k===s.UNSIGNED_BYTE&&(q=Re===ct?s.SRGB8_ALPHA8:s.RGBA8),k===s.UNSIGNED_SHORT_4_4_4_4&&(q=s.RGBA4),k===s.UNSIGNED_SHORT_5_5_5_1&&(q=s.RGB5_A1)}return(q===s.R16F||q===s.R32F||q===s.RG16F||q===s.RG32F||q===s.RGBA16F||q===s.RGBA32F)&&e.get("EXT_color_buffer_float"),q}function x(C,S){let k;return C?S===null||S===Li||S===sr?k=s.DEPTH24_STENCIL8:S===gn?k=s.DEPTH32F_STENCIL8:S===ir&&(k=s.DEPTH24_STENCIL8,console.warn("DepthTexture: 16 bit depth attachment is not supported with stencil. Using 24-bit attachment.")):S===null||S===Li||S===sr?k=s.DEPTH_COMPONENT24:S===gn?k=s.DEPTH_COMPONENT32F:S===ir&&(k=s.DEPTH_COMPONENT16),k}function E(C,S){return g(C)===!0||C.isFramebufferTexture&&C.minFilter!==Vt&&C.minFilter!==_t?Math.log2(Math.max(S.width,S.height))+1:C.mipmaps!==void 0&&C.mipmaps.length>0?C.mipmaps.length:C.isCompressedTexture&&Array.isArray(C.image)?S.mipmaps.length:1}function A(C){const S=C.target;S.removeEventListener("dispose",A),L(S),S.isVideoTexture&&u.delete(S)}function R(C){const S=C.target;S.removeEventListener("dispose",R),M(S)}function L(C){const S=n.get(C);if(S.__webglInit===void 0)return;const k=C.source,X=f.get(k);if(X){const ee=X[S.__cacheKey];ee.usedTimes--,ee.usedTimes===0&&b(C),Object.keys(X).length===0&&f.delete(k)}n.remove(C)}function b(C){const S=n.get(C);s.deleteTexture(S.__webglTexture);const k=C.source,X=f.get(k);delete X[S.__cacheKey],o.memory.textures--}function M(C){const S=n.get(C);if(C.depthTexture&&(C.depthTexture.dispose(),n.remove(C.depthTexture)),C.isWebGLCubeRenderTarget)for(let X=0;X<6;X++){if(Array.isArray(S.__webglFramebuffer[X]))for(let ee=0;ee<S.__webglFramebuffer[X].length;ee++)s.deleteFramebuffer(S.__webglFramebuffer[X][ee]);else s.deleteFramebuffer(S.__webglFramebuffer[X]);S.__webglDepthbuffer&&s.deleteRenderbuffer(S.__webglDepthbuffer[X])}else{if(Array.isArray(S.__webglFramebuffer))for(let X=0;X<S.__webglFramebuffer.length;X++)s.deleteFramebuffer(S.__webglFramebuffer[X]);else s.deleteFramebuffer(S.__webglFramebuffer);if(S.__webglDepthbuffer&&s.deleteRenderbuffer(S.__webglDepthbuffer),S.__webglMultisampledFramebuffer&&s.deleteFramebuffer(S.__webglMultisampledFramebuffer),S.__webglColorRenderbuffer)for(let X=0;X<S.__webglColorRenderbuffer.length;X++)S.__webglColorRenderbuffer[X]&&s.deleteRenderbuffer(S.__webglColorRenderbuffer[X]);S.__webglDepthRenderbuffer&&s.deleteRenderbuffer(S.__webglDepthRenderbuffer)}const k=C.textures;for(let X=0,ee=k.length;X<ee;X++){const q=n.get(k[X]);q.__webglTexture&&(s.deleteTexture(q.__webglTexture),o.memory.textures--),n.remove(k[X])}n.remove(C)}let P=0;function D(){P=0}function O(){const C=P;return C>=i.maxTextures&&console.warn("THREE.WebGLTextures: Trying to use "+C+" texture units while this GPU supports only "+i.maxTextures),P+=1,C}function V(C){const S=[];return S.push(C.wrapS),S.push(C.wrapT),S.push(C.wrapR||0),S.push(C.magFilter),S.push(C.minFilter),S.push(C.anisotropy),S.push(C.internalFormat),S.push(C.format),S.push(C.type),S.push(C.generateMipmaps),S.push(C.premultiplyAlpha),S.push(C.flipY),S.push(C.unpackAlignment),S.push(C.colorSpace),S.join()}function B(C,S){const k=n.get(C);if(C.isVideoTexture&&he(C),C.isRenderTargetTexture===!1&&C.isExternalTexture!==!0&&C.version>0&&k.__version!==C.version){const X=C.image;if(X===null)console.warn("THREE.WebGLRenderer: Texture marked for update but no image data found.");else if(X.complete===!1)console.warn("THREE.WebGLRenderer: Texture marked for update but image is incomplete");else{$(k,C,S);return}}else C.isExternalTexture&&(k.__webglTexture=C.sourceTexture?C.sourceTexture:null);t.bindTexture(s.TEXTURE_2D,k.__webglTexture,s.TEXTURE0+S)}function W(C,S){const k=n.get(C);if(C.isRenderTargetTexture===!1&&C.version>0&&k.__version!==C.version){$(k,C,S);return}t.bindTexture(s.TEXTURE_2D_ARRAY,k.__webglTexture,s.TEXTURE0+S)}function K(C,S){const k=n.get(C);if(C.isRenderTargetTexture===!1&&C.version>0&&k.__version!==C.version){$(k,C,S);return}t.bindTexture(s.TEXTURE_3D,k.__webglTexture,s.TEXTURE0+S)}function G(C,S){const k=n.get(C);if(C.version>0&&k.__version!==C.version){Q(k,C,S);return}t.bindTexture(s.TEXTURE_CUBE_MAP,k.__webglTexture,s.TEXTURE0+S)}const le={[Pi]:s.REPEAT,[qn]:s.CLAMP_TO_EDGE,[vo]:s.MIRRORED_REPEAT},de={[Vt]:s.NEAREST,[lh]:s.NEAREST_MIPMAP_NEAREST,[Xs]:s.NEAREST_MIPMAP_LINEAR,[_t]:s.LINEAR,[oo]:s.LINEAR_MIPMAP_NEAREST,[tn]:s.LINEAR_MIPMAP_LINEAR},pe={[td]:s.NEVER,[ad]:s.ALWAYS,[nd]:s.LESS,[xh]:s.LEQUAL,[id]:s.EQUAL,[od]:s.GEQUAL,[sd]:s.GREATER,[rd]:s.NOTEQUAL};function Ne(C,S){if(S.type===gn&&e.has("OES_texture_float_linear")===!1&&(S.magFilter===_t||S.magFilter===oo||S.magFilter===Xs||S.magFilter===tn||S.minFilter===_t||S.minFilter===oo||S.minFilter===Xs||S.minFilter===tn)&&console.warn("THREE.WebGLRenderer: Unable to use linear filtering with floating point textures. OES_texture_float_linear not supported on this device."),s.texParameteri(C,s.TEXTURE_WRAP_S,le[S.wrapS]),s.texParameteri(C,s.TEXTURE_WRAP_T,le[S.wrapT]),(C===s.TEXTURE_3D||C===s.TEXTURE_2D_ARRAY)&&s.texParameteri(C,s.TEXTURE_WRAP_R,le[S.wrapR]),s.texParameteri(C,s.TEXTURE_MAG_FILTER,de[S.magFilter]),s.texParameteri(C,s.TEXTURE_MIN_FILTER,de[S.minFilter]),S.compareFunction&&(s.texParameteri(C,s.TEXTURE_COMPARE_MODE,s.COMPARE_REF_TO_TEXTURE),s.texParameteri(C,s.TEXTURE_COMPARE_FUNC,pe[S.compareFunction])),e.has("EXT_texture_filter_anisotropic")===!0){if(S.magFilter===Vt||S.minFilter!==Xs&&S.minFilter!==tn||S.type===gn&&e.has("OES_texture_float_linear")===!1)return;if(S.anisotropy>1||n.get(S).__currentAnisotropy){const k=e.get("EXT_texture_filter_anisotropic");s.texParameterf(C,k.TEXTURE_MAX_ANISOTROPY_EXT,Math.min(S.anisotropy,i.getMaxAnisotropy())),n.get(S).__currentAnisotropy=S.anisotropy}}}function Xe(C,S){let k=!1;C.__webglInit===void 0&&(C.__webglInit=!0,S.addEventListener("dispose",A));const X=S.source;let ee=f.get(X);ee===void 0&&(ee={},f.set(X,ee));const q=V(S);if(q!==C.__cacheKey){ee[q]===void 0&&(ee[q]={texture:s.createTexture(),usedTimes:0},o.memory.textures++,k=!0),ee[q].usedTimes++;const Re=ee[C.__cacheKey];Re!==void 0&&(ee[C.__cacheKey].usedTimes--,Re.usedTimes===0&&b(S)),C.__cacheKey=q,C.__webglTexture=ee[q].texture}return k}function qe(C,S,k){return Math.floor(Math.floor(C/k)/S)}function je(C,S,k,X){const q=C.updateRanges;if(q.length===0)t.texSubImage2D(s.TEXTURE_2D,0,0,0,S.width,S.height,k,X,S.data);else{q.sort((se,_e)=>se.start-_e.start);let Re=0;for(let se=1;se<q.length;se++){const _e=q[Re],Oe=q[se],Pe=_e.start+_e.count,ve=qe(Oe.start,S.width,4),We=qe(_e.start,S.width,4);Oe.start<=Pe+1&&ve===We&&qe(Oe.start+Oe.count-1,S.width,4)===ve?_e.count=Math.max(_e.count,Oe.start+Oe.count-_e.start):(++Re,q[Re]=Oe)}q.length=Re+1;const ce=s.getParameter(s.UNPACK_ROW_LENGTH),Ee=s.getParameter(s.UNPACK_SKIP_PIXELS),we=s.getParameter(s.UNPACK_SKIP_ROWS);s.pixelStorei(s.UNPACK_ROW_LENGTH,S.width);for(let se=0,_e=q.length;se<_e;se++){const Oe=q[se],Pe=Math.floor(Oe.start/4),ve=Math.ceil(Oe.count/4),We=Pe%S.width,N=Math.floor(Pe/S.width),ae=ve,fe=1;s.pixelStorei(s.UNPACK_SKIP_PIXELS,We),s.pixelStorei(s.UNPACK_SKIP_ROWS,N),t.texSubImage2D(s.TEXTURE_2D,0,We,N,ae,fe,k,X,S.data)}C.clearUpdateRanges(),s.pixelStorei(s.UNPACK_ROW_LENGTH,ce),s.pixelStorei(s.UNPACK_SKIP_PIXELS,Ee),s.pixelStorei(s.UNPACK_SKIP_ROWS,we)}}function $(C,S,k){let X=s.TEXTURE_2D;(S.isDataArrayTexture||S.isCompressedArrayTexture)&&(X=s.TEXTURE_2D_ARRAY),S.isData3DTexture&&(X=s.TEXTURE_3D);const ee=Xe(C,S),q=S.source;t.bindTexture(X,C.__webglTexture,s.TEXTURE0+k);const Re=n.get(q);if(q.version!==Re.__version||ee===!0){t.activeTexture(s.TEXTURE0+k);const ce=et.getPrimaries(et.workingColorSpace),Ee=S.colorSpace===ci?null:et.getPrimaries(S.colorSpace),we=S.colorSpace===ci||ce===Ee?s.NONE:s.BROWSER_DEFAULT_WEBGL;s.pixelStorei(s.UNPACK_FLIP_Y_WEBGL,S.flipY),s.pixelStorei(s.UNPACK_PREMULTIPLY_ALPHA_WEBGL,S.premultiplyAlpha),s.pixelStorei(s.UNPACK_ALIGNMENT,S.unpackAlignment),s.pixelStorei(s.UNPACK_COLORSPACE_CONVERSION_WEBGL,we);let se=v(S.image,!1,i.maxTextureSize);se=Ve(S,se);const _e=r.convert(S.format,S.colorSpace),Oe=r.convert(S.type);let Pe=y(S.internalFormat,_e,Oe,S.colorSpace,S.isVideoTexture);Ne(X,S);let ve;const We=S.mipmaps,N=S.isVideoTexture!==!0,ae=Re.__version===void 0||ee===!0,fe=q.dataReady,Se=E(S,se);if(S.isDepthTexture)Pe=x(S.format===or,S.type),ae&&(N?t.texStorage2D(s.TEXTURE_2D,1,Pe,se.width,se.height):t.texImage2D(s.TEXTURE_2D,0,Pe,se.width,se.height,0,_e,Oe,null));else if(S.isDataTexture)if(We.length>0){N&&ae&&t.texStorage2D(s.TEXTURE_2D,Se,Pe,We[0].width,We[0].height);for(let re=0,J=We.length;re<J;re++)ve=We[re],N?fe&&t.texSubImage2D(s.TEXTURE_2D,re,0,0,ve.width,ve.height,_e,Oe,ve.data):t.texImage2D(s.TEXTURE_2D,re,Pe,ve.width,ve.height,0,_e,Oe,ve.data);S.generateMipmaps=!1}else N?(ae&&t.texStorage2D(s.TEXTURE_2D,Se,Pe,se.width,se.height),fe&&je(S,se,_e,Oe)):t.texImage2D(s.TEXTURE_2D,0,Pe,se.width,se.height,0,_e,Oe,se.data);else if(S.isCompressedTexture)if(S.isCompressedArrayTexture){N&&ae&&t.texStorage3D(s.TEXTURE_2D_ARRAY,Se,Pe,We[0].width,We[0].height,se.depth);for(let re=0,J=We.length;re<J;re++)if(ve=We[re],S.format!==Nt)if(_e!==null)if(N){if(fe)if(S.layerUpdates.size>0){const Ae=du(ve.width,ve.height,S.format,S.type);for(const Ge of S.layerUpdates){const ft=ve.data.subarray(Ge*Ae/ve.data.BYTES_PER_ELEMENT,(Ge+1)*Ae/ve.data.BYTES_PER_ELEMENT);t.compressedTexSubImage3D(s.TEXTURE_2D_ARRAY,re,0,0,Ge,ve.width,ve.height,1,_e,ft)}S.clearLayerUpdates()}else t.compressedTexSubImage3D(s.TEXTURE_2D_ARRAY,re,0,0,0,ve.width,ve.height,se.depth,_e,ve.data)}else t.compressedTexImage3D(s.TEXTURE_2D_ARRAY,re,Pe,ve.width,ve.height,se.depth,0,ve.data,0,0);else console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()");else N?fe&&t.texSubImage3D(s.TEXTURE_2D_ARRAY,re,0,0,0,ve.width,ve.height,se.depth,_e,Oe,ve.data):t.texImage3D(s.TEXTURE_2D_ARRAY,re,Pe,ve.width,ve.height,se.depth,0,_e,Oe,ve.data)}else{N&&ae&&t.texStorage2D(s.TEXTURE_2D,Se,Pe,We[0].width,We[0].height);for(let re=0,J=We.length;re<J;re++)ve=We[re],S.format!==Nt?_e!==null?N?fe&&t.compressedTexSubImage2D(s.TEXTURE_2D,re,0,0,ve.width,ve.height,_e,ve.data):t.compressedTexImage2D(s.TEXTURE_2D,re,Pe,ve.width,ve.height,0,ve.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):N?fe&&t.texSubImage2D(s.TEXTURE_2D,re,0,0,ve.width,ve.height,_e,Oe,ve.data):t.texImage2D(s.TEXTURE_2D,re,Pe,ve.width,ve.height,0,_e,Oe,ve.data)}else if(S.isDataArrayTexture)if(N){if(ae&&t.texStorage3D(s.TEXTURE_2D_ARRAY,Se,Pe,se.width,se.height,se.depth),fe)if(S.layerUpdates.size>0){const re=du(se.width,se.height,S.format,S.type);for(const J of S.layerUpdates){const Ae=se.data.subarray(J*re/se.data.BYTES_PER_ELEMENT,(J+1)*re/se.data.BYTES_PER_ELEMENT);t.texSubImage3D(s.TEXTURE_2D_ARRAY,0,0,0,J,se.width,se.height,1,_e,Oe,Ae)}S.clearLayerUpdates()}else t.texSubImage3D(s.TEXTURE_2D_ARRAY,0,0,0,0,se.width,se.height,se.depth,_e,Oe,se.data)}else t.texImage3D(s.TEXTURE_2D_ARRAY,0,Pe,se.width,se.height,se.depth,0,_e,Oe,se.data);else if(S.isData3DTexture)N?(ae&&t.texStorage3D(s.TEXTURE_3D,Se,Pe,se.width,se.height,se.depth),fe&&t.texSubImage3D(s.TEXTURE_3D,0,0,0,0,se.width,se.height,se.depth,_e,Oe,se.data)):t.texImage3D(s.TEXTURE_3D,0,Pe,se.width,se.height,se.depth,0,_e,Oe,se.data);else if(S.isFramebufferTexture){if(ae)if(N)t.texStorage2D(s.TEXTURE_2D,Se,Pe,se.width,se.height);else{let re=se.width,J=se.height;for(let Ae=0;Ae<Se;Ae++)t.texImage2D(s.TEXTURE_2D,Ae,Pe,re,J,0,_e,Oe,null),re>>=1,J>>=1}}else if(We.length>0){if(N&&ae){const re=Be(We[0]);t.texStorage2D(s.TEXTURE_2D,Se,Pe,re.width,re.height)}for(let re=0,J=We.length;re<J;re++)ve=We[re],N?fe&&t.texSubImage2D(s.TEXTURE_2D,re,0,0,_e,Oe,ve):t.texImage2D(s.TEXTURE_2D,re,Pe,_e,Oe,ve);S.generateMipmaps=!1}else if(N){if(ae){const re=Be(se);t.texStorage2D(s.TEXTURE_2D,Se,Pe,re.width,re.height)}fe&&t.texSubImage2D(s.TEXTURE_2D,0,0,0,_e,Oe,se)}else t.texImage2D(s.TEXTURE_2D,0,Pe,_e,Oe,se);g(S)&&m(X),Re.__version=q.version,S.onUpdate&&S.onUpdate(S)}C.__version=S.version}function Q(C,S,k){if(S.image.length!==6)return;const X=Xe(C,S),ee=S.source;t.bindTexture(s.TEXTURE_CUBE_MAP,C.__webglTexture,s.TEXTURE0+k);const q=n.get(ee);if(ee.version!==q.__version||X===!0){t.activeTexture(s.TEXTURE0+k);const Re=et.getPrimaries(et.workingColorSpace),ce=S.colorSpace===ci?null:et.getPrimaries(S.colorSpace),Ee=S.colorSpace===ci||Re===ce?s.NONE:s.BROWSER_DEFAULT_WEBGL;s.pixelStorei(s.UNPACK_FLIP_Y_WEBGL,S.flipY),s.pixelStorei(s.UNPACK_PREMULTIPLY_ALPHA_WEBGL,S.premultiplyAlpha),s.pixelStorei(s.UNPACK_ALIGNMENT,S.unpackAlignment),s.pixelStorei(s.UNPACK_COLORSPACE_CONVERSION_WEBGL,Ee);const we=S.isCompressedTexture||S.image[0].isCompressedTexture,se=S.image[0]&&S.image[0].isDataTexture,_e=[];for(let J=0;J<6;J++)!we&&!se?_e[J]=v(S.image[J],!0,i.maxCubemapSize):_e[J]=se?S.image[J].image:S.image[J],_e[J]=Ve(S,_e[J]);const Oe=_e[0],Pe=r.convert(S.format,S.colorSpace),ve=r.convert(S.type),We=y(S.internalFormat,Pe,ve,S.colorSpace),N=S.isVideoTexture!==!0,ae=q.__version===void 0||X===!0,fe=ee.dataReady;let Se=E(S,Oe);Ne(s.TEXTURE_CUBE_MAP,S);let re;if(we){N&&ae&&t.texStorage2D(s.TEXTURE_CUBE_MAP,Se,We,Oe.width,Oe.height);for(let J=0;J<6;J++){re=_e[J].mipmaps;for(let Ae=0;Ae<re.length;Ae++){const Ge=re[Ae];S.format!==Nt?Pe!==null?N?fe&&t.compressedTexSubImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+J,Ae,0,0,Ge.width,Ge.height,Pe,Ge.data):t.compressedTexImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+J,Ae,We,Ge.width,Ge.height,0,Ge.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()"):N?fe&&t.texSubImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+J,Ae,0,0,Ge.width,Ge.height,Pe,ve,Ge.data):t.texImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+J,Ae,We,Ge.width,Ge.height,0,Pe,ve,Ge.data)}}}else{if(re=S.mipmaps,N&&ae){re.length>0&&Se++;const J=Be(_e[0]);t.texStorage2D(s.TEXTURE_CUBE_MAP,Se,We,J.width,J.height)}for(let J=0;J<6;J++)if(se){N?fe&&t.texSubImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+J,0,0,0,_e[J].width,_e[J].height,Pe,ve,_e[J].data):t.texImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+J,0,We,_e[J].width,_e[J].height,0,Pe,ve,_e[J].data);for(let Ae=0;Ae<re.length;Ae++){const ft=re[Ae].image[J].image;N?fe&&t.texSubImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+J,Ae+1,0,0,ft.width,ft.height,Pe,ve,ft.data):t.texImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+J,Ae+1,We,ft.width,ft.height,0,Pe,ve,ft.data)}}else{N?fe&&t.texSubImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+J,0,0,0,Pe,ve,_e[J]):t.texImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+J,0,We,Pe,ve,_e[J]);for(let Ae=0;Ae<re.length;Ae++){const Ge=re[Ae];N?fe&&t.texSubImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+J,Ae+1,0,0,Pe,ve,Ge.image[J]):t.texImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+J,Ae+1,We,Pe,ve,Ge.image[J])}}}g(S)&&m(s.TEXTURE_CUBE_MAP),q.__version=ee.version,S.onUpdate&&S.onUpdate(S)}C.__version=S.version}function me(C,S,k,X,ee,q){const Re=r.convert(k.format,k.colorSpace),ce=r.convert(k.type),Ee=y(k.internalFormat,Re,ce,k.colorSpace),we=n.get(S),se=n.get(k);if(se.__renderTarget=S,!we.__hasExternalTextures){const _e=Math.max(1,S.width>>q),Oe=Math.max(1,S.height>>q);ee===s.TEXTURE_3D||ee===s.TEXTURE_2D_ARRAY?t.texImage3D(ee,q,Ee,_e,Oe,S.depth,0,Re,ce,null):t.texImage2D(ee,q,Ee,_e,Oe,0,Re,ce,null)}t.bindFramebuffer(s.FRAMEBUFFER,C),ie(S)?a.framebufferTexture2DMultisampleEXT(s.FRAMEBUFFER,X,ee,se.__webglTexture,0,ue(S)):(ee===s.TEXTURE_2D||ee>=s.TEXTURE_CUBE_MAP_POSITIVE_X&&ee<=s.TEXTURE_CUBE_MAP_NEGATIVE_Z)&&s.framebufferTexture2D(s.FRAMEBUFFER,X,ee,se.__webglTexture,q),t.bindFramebuffer(s.FRAMEBUFFER,null)}function be(C,S,k){if(s.bindRenderbuffer(s.RENDERBUFFER,C),S.depthBuffer){const X=S.depthTexture,ee=X&&X.isDepthTexture?X.type:null,q=x(S.stencilBuffer,ee),Re=S.stencilBuffer?s.DEPTH_STENCIL_ATTACHMENT:s.DEPTH_ATTACHMENT,ce=ue(S);ie(S)?a.renderbufferStorageMultisampleEXT(s.RENDERBUFFER,ce,q,S.width,S.height):k?s.renderbufferStorageMultisample(s.RENDERBUFFER,ce,q,S.width,S.height):s.renderbufferStorage(s.RENDERBUFFER,q,S.width,S.height),s.framebufferRenderbuffer(s.FRAMEBUFFER,Re,s.RENDERBUFFER,C)}else{const X=S.textures;for(let ee=0;ee<X.length;ee++){const q=X[ee],Re=r.convert(q.format,q.colorSpace),ce=r.convert(q.type),Ee=y(q.internalFormat,Re,ce,q.colorSpace),we=ue(S);k&&ie(S)===!1?s.renderbufferStorageMultisample(s.RENDERBUFFER,we,Ee,S.width,S.height):ie(S)?a.renderbufferStorageMultisampleEXT(s.RENDERBUFFER,we,Ee,S.width,S.height):s.renderbufferStorage(s.RENDERBUFFER,Ee,S.width,S.height)}}s.bindRenderbuffer(s.RENDERBUFFER,null)}function ye(C,S){if(S&&S.isWebGLCubeRenderTarget)throw new Error("Depth Texture with cube render targets is not supported");if(t.bindFramebuffer(s.FRAMEBUFFER,C),!(S.depthTexture&&S.depthTexture.isDepthTexture))throw new Error("renderTarget.depthTexture must be an instance of THREE.DepthTexture");const X=n.get(S.depthTexture);X.__renderTarget=S,(!X.__webglTexture||S.depthTexture.image.width!==S.width||S.depthTexture.image.height!==S.height)&&(S.depthTexture.image.width=S.width,S.depthTexture.image.height=S.height,S.depthTexture.needsUpdate=!0),B(S.depthTexture,0);const ee=X.__webglTexture,q=ue(S);if(S.depthTexture.format===rr)ie(S)?a.framebufferTexture2DMultisampleEXT(s.FRAMEBUFFER,s.DEPTH_ATTACHMENT,s.TEXTURE_2D,ee,0,q):s.framebufferTexture2D(s.FRAMEBUFFER,s.DEPTH_ATTACHMENT,s.TEXTURE_2D,ee,0);else if(S.depthTexture.format===or)ie(S)?a.framebufferTexture2DMultisampleEXT(s.FRAMEBUFFER,s.DEPTH_STENCIL_ATTACHMENT,s.TEXTURE_2D,ee,0,q):s.framebufferTexture2D(s.FRAMEBUFFER,s.DEPTH_STENCIL_ATTACHMENT,s.TEXTURE_2D,ee,0);else throw new Error("Unknown depthTexture format")}function ze(C){const S=n.get(C),k=C.isWebGLCubeRenderTarget===!0;if(S.__boundDepthTexture!==C.depthTexture){const X=C.depthTexture;if(S.__depthDisposeCallback&&S.__depthDisposeCallback(),X){const ee=()=>{delete S.__boundDepthTexture,delete S.__depthDisposeCallback,X.removeEventListener("dispose",ee)};X.addEventListener("dispose",ee),S.__depthDisposeCallback=ee}S.__boundDepthTexture=X}if(C.depthTexture&&!S.__autoAllocateDepthBuffer){if(k)throw new Error("target.depthTexture not supported in Cube render targets");const X=C.texture.mipmaps;X&&X.length>0?ye(S.__webglFramebuffer[0],C):ye(S.__webglFramebuffer,C)}else if(k){S.__webglDepthbuffer=[];for(let X=0;X<6;X++)if(t.bindFramebuffer(s.FRAMEBUFFER,S.__webglFramebuffer[X]),S.__webglDepthbuffer[X]===void 0)S.__webglDepthbuffer[X]=s.createRenderbuffer(),be(S.__webglDepthbuffer[X],C,!1);else{const ee=C.stencilBuffer?s.DEPTH_STENCIL_ATTACHMENT:s.DEPTH_ATTACHMENT,q=S.__webglDepthbuffer[X];s.bindRenderbuffer(s.RENDERBUFFER,q),s.framebufferRenderbuffer(s.FRAMEBUFFER,ee,s.RENDERBUFFER,q)}}else{const X=C.texture.mipmaps;if(X&&X.length>0?t.bindFramebuffer(s.FRAMEBUFFER,S.__webglFramebuffer[0]):t.bindFramebuffer(s.FRAMEBUFFER,S.__webglFramebuffer),S.__webglDepthbuffer===void 0)S.__webglDepthbuffer=s.createRenderbuffer(),be(S.__webglDepthbuffer,C,!1);else{const ee=C.stencilBuffer?s.DEPTH_STENCIL_ATTACHMENT:s.DEPTH_ATTACHMENT,q=S.__webglDepthbuffer;s.bindRenderbuffer(s.RENDERBUFFER,q),s.framebufferRenderbuffer(s.FRAMEBUFFER,ee,s.RENDERBUFFER,q)}}t.bindFramebuffer(s.FRAMEBUFFER,null)}function at(C,S,k){const X=n.get(C);S!==void 0&&me(X.__webglFramebuffer,C,C.texture,s.COLOR_ATTACHMENT0,s.TEXTURE_2D,0),k!==void 0&&ze(C)}function I(C){const S=C.texture,k=n.get(C),X=n.get(S);C.addEventListener("dispose",R);const ee=C.textures,q=C.isWebGLCubeRenderTarget===!0,Re=ee.length>1;if(Re||(X.__webglTexture===void 0&&(X.__webglTexture=s.createTexture()),X.__version=S.version,o.memory.textures++),q){k.__webglFramebuffer=[];for(let ce=0;ce<6;ce++)if(S.mipmaps&&S.mipmaps.length>0){k.__webglFramebuffer[ce]=[];for(let Ee=0;Ee<S.mipmaps.length;Ee++)k.__webglFramebuffer[ce][Ee]=s.createFramebuffer()}else k.__webglFramebuffer[ce]=s.createFramebuffer()}else{if(S.mipmaps&&S.mipmaps.length>0){k.__webglFramebuffer=[];for(let ce=0;ce<S.mipmaps.length;ce++)k.__webglFramebuffer[ce]=s.createFramebuffer()}else k.__webglFramebuffer=s.createFramebuffer();if(Re)for(let ce=0,Ee=ee.length;ce<Ee;ce++){const we=n.get(ee[ce]);we.__webglTexture===void 0&&(we.__webglTexture=s.createTexture(),o.memory.textures++)}if(C.samples>0&&ie(C)===!1){k.__webglMultisampledFramebuffer=s.createFramebuffer(),k.__webglColorRenderbuffer=[],t.bindFramebuffer(s.FRAMEBUFFER,k.__webglMultisampledFramebuffer);for(let ce=0;ce<ee.length;ce++){const Ee=ee[ce];k.__webglColorRenderbuffer[ce]=s.createRenderbuffer(),s.bindRenderbuffer(s.RENDERBUFFER,k.__webglColorRenderbuffer[ce]);const we=r.convert(Ee.format,Ee.colorSpace),se=r.convert(Ee.type),_e=y(Ee.internalFormat,we,se,Ee.colorSpace,C.isXRRenderTarget===!0),Oe=ue(C);s.renderbufferStorageMultisample(s.RENDERBUFFER,Oe,_e,C.width,C.height),s.framebufferRenderbuffer(s.FRAMEBUFFER,s.COLOR_ATTACHMENT0+ce,s.RENDERBUFFER,k.__webglColorRenderbuffer[ce])}s.bindRenderbuffer(s.RENDERBUFFER,null),C.depthBuffer&&(k.__webglDepthRenderbuffer=s.createRenderbuffer(),be(k.__webglDepthRenderbuffer,C,!0)),t.bindFramebuffer(s.FRAMEBUFFER,null)}}if(q){t.bindTexture(s.TEXTURE_CUBE_MAP,X.__webglTexture),Ne(s.TEXTURE_CUBE_MAP,S);for(let ce=0;ce<6;ce++)if(S.mipmaps&&S.mipmaps.length>0)for(let Ee=0;Ee<S.mipmaps.length;Ee++)me(k.__webglFramebuffer[ce][Ee],C,S,s.COLOR_ATTACHMENT0,s.TEXTURE_CUBE_MAP_POSITIVE_X+ce,Ee);else me(k.__webglFramebuffer[ce],C,S,s.COLOR_ATTACHMENT0,s.TEXTURE_CUBE_MAP_POSITIVE_X+ce,0);g(S)&&m(s.TEXTURE_CUBE_MAP),t.unbindTexture()}else if(Re){for(let ce=0,Ee=ee.length;ce<Ee;ce++){const we=ee[ce],se=n.get(we);let _e=s.TEXTURE_2D;(C.isWebGL3DRenderTarget||C.isWebGLArrayRenderTarget)&&(_e=C.isWebGL3DRenderTarget?s.TEXTURE_3D:s.TEXTURE_2D_ARRAY),t.bindTexture(_e,se.__webglTexture),Ne(_e,we),me(k.__webglFramebuffer,C,we,s.COLOR_ATTACHMENT0+ce,_e,0),g(we)&&m(_e)}t.unbindTexture()}else{let ce=s.TEXTURE_2D;if((C.isWebGL3DRenderTarget||C.isWebGLArrayRenderTarget)&&(ce=C.isWebGL3DRenderTarget?s.TEXTURE_3D:s.TEXTURE_2D_ARRAY),t.bindTexture(ce,X.__webglTexture),Ne(ce,S),S.mipmaps&&S.mipmaps.length>0)for(let Ee=0;Ee<S.mipmaps.length;Ee++)me(k.__webglFramebuffer[Ee],C,S,s.COLOR_ATTACHMENT0,ce,Ee);else me(k.__webglFramebuffer,C,S,s.COLOR_ATTACHMENT0,ce,0);g(S)&&m(ce),t.unbindTexture()}C.depthBuffer&&ze(C)}function te(C){const S=C.textures;for(let k=0,X=S.length;k<X;k++){const ee=S[k];if(g(ee)){const q=_(C),Re=n.get(ee).__webglTexture;t.bindTexture(q,Re),m(q),t.unbindTexture()}}}const Z=[],j=[];function Y(C){if(C.samples>0){if(ie(C)===!1){const S=C.textures,k=C.width,X=C.height;let ee=s.COLOR_BUFFER_BIT;const q=C.stencilBuffer?s.DEPTH_STENCIL_ATTACHMENT:s.DEPTH_ATTACHMENT,Re=n.get(C),ce=S.length>1;if(ce)for(let we=0;we<S.length;we++)t.bindFramebuffer(s.FRAMEBUFFER,Re.__webglMultisampledFramebuffer),s.framebufferRenderbuffer(s.FRAMEBUFFER,s.COLOR_ATTACHMENT0+we,s.RENDERBUFFER,null),t.bindFramebuffer(s.FRAMEBUFFER,Re.__webglFramebuffer),s.framebufferTexture2D(s.DRAW_FRAMEBUFFER,s.COLOR_ATTACHMENT0+we,s.TEXTURE_2D,null,0);t.bindFramebuffer(s.READ_FRAMEBUFFER,Re.__webglMultisampledFramebuffer);const Ee=C.texture.mipmaps;Ee&&Ee.length>0?t.bindFramebuffer(s.DRAW_FRAMEBUFFER,Re.__webglFramebuffer[0]):t.bindFramebuffer(s.DRAW_FRAMEBUFFER,Re.__webglFramebuffer);for(let we=0;we<S.length;we++){if(C.resolveDepthBuffer&&(C.depthBuffer&&(ee|=s.DEPTH_BUFFER_BIT),C.stencilBuffer&&C.resolveStencilBuffer&&(ee|=s.STENCIL_BUFFER_BIT)),ce){s.framebufferRenderbuffer(s.READ_FRAMEBUFFER,s.COLOR_ATTACHMENT0,s.RENDERBUFFER,Re.__webglColorRenderbuffer[we]);const se=n.get(S[we]).__webglTexture;s.framebufferTexture2D(s.DRAW_FRAMEBUFFER,s.COLOR_ATTACHMENT0,s.TEXTURE_2D,se,0)}s.blitFramebuffer(0,0,k,X,0,0,k,X,ee,s.NEAREST),l===!0&&(Z.length=0,j.length=0,Z.push(s.COLOR_ATTACHMENT0+we),C.depthBuffer&&C.resolveDepthBuffer===!1&&(Z.push(q),j.push(q),s.invalidateFramebuffer(s.DRAW_FRAMEBUFFER,j)),s.invalidateFramebuffer(s.READ_FRAMEBUFFER,Z))}if(t.bindFramebuffer(s.READ_FRAMEBUFFER,null),t.bindFramebuffer(s.DRAW_FRAMEBUFFER,null),ce)for(let we=0;we<S.length;we++){t.bindFramebuffer(s.FRAMEBUFFER,Re.__webglMultisampledFramebuffer),s.framebufferRenderbuffer(s.FRAMEBUFFER,s.COLOR_ATTACHMENT0+we,s.RENDERBUFFER,Re.__webglColorRenderbuffer[we]);const se=n.get(S[we]).__webglTexture;t.bindFramebuffer(s.FRAMEBUFFER,Re.__webglFramebuffer),s.framebufferTexture2D(s.DRAW_FRAMEBUFFER,s.COLOR_ATTACHMENT0+we,s.TEXTURE_2D,se,0)}t.bindFramebuffer(s.DRAW_FRAMEBUFFER,Re.__webglMultisampledFramebuffer)}else if(C.depthBuffer&&C.resolveDepthBuffer===!1&&l){const S=C.stencilBuffer?s.DEPTH_STENCIL_ATTACHMENT:s.DEPTH_ATTACHMENT;s.invalidateFramebuffer(s.DRAW_FRAMEBUFFER,[S])}}}function ue(C){return Math.min(i.maxSamples,C.samples)}function ie(C){const S=n.get(C);return C.samples>0&&e.has("WEBGL_multisampled_render_to_texture")===!0&&S.__useRenderToTexture!==!1}function he(C){const S=o.render.frame;u.get(C)!==S&&(u.set(C,S),C.update())}function Ve(C,S){const k=C.colorSpace,X=C.format,ee=C.type;return C.isCompressedTexture===!0||C.isVideoTexture===!0||k!==Wt&&k!==ci&&(et.getTransfer(k)===ct?(X!==Nt||ee!==yn)&&console.warn("THREE.WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType."):console.error("THREE.WebGLTextures: Unsupported texture color space:",k)),S}function Be(C){return typeof HTMLImageElement<"u"&&C instanceof HTMLImageElement?(c.width=C.naturalWidth||C.width,c.height=C.naturalHeight||C.height):typeof VideoFrame<"u"&&C instanceof VideoFrame?(c.width=C.displayWidth,c.height=C.displayHeight):(c.width=C.width,c.height=C.height),c}this.allocateTextureUnit=O,this.resetTextureUnits=D,this.setTexture2D=B,this.setTexture2DArray=W,this.setTexture3D=K,this.setTextureCube=G,this.rebindTextures=at,this.setupRenderTarget=I,this.updateRenderTargetMipmap=te,this.updateMultisampleRenderTarget=Y,this.setupDepthRenderbuffer=ze,this.setupFrameBufferTexture=me,this.useMultisampledRTT=ie}function jx(s,e){function t(n,i=ci){let r;const o=et.getTransfer(i);if(n===yn)return s.UNSIGNED_BYTE;if(n===Il)return s.UNSIGNED_SHORT_4_4_4_4;if(n===Dl)return s.UNSIGNED_SHORT_5_5_5_1;if(n===hh)return s.UNSIGNED_INT_5_9_9_9_REV;if(n===fh)return s.UNSIGNED_INT_10F_11F_11F_REV;if(n===ch)return s.BYTE;if(n===uh)return s.SHORT;if(n===ir)return s.UNSIGNED_SHORT;if(n===Ll)return s.INT;if(n===Li)return s.UNSIGNED_INT;if(n===gn)return s.FLOAT;if(n===nn)return s.HALF_FLOAT;if(n===dh)return s.ALPHA;if(n===ph)return s.RGB;if(n===Nt)return s.RGBA;if(n===rr)return s.DEPTH_COMPONENT;if(n===or)return s.DEPTH_STENCIL;if(n===To)return s.RED;if(n===Nl)return s.RED_INTEGER;if(n===mh)return s.RG;if(n===Ul)return s.RG_INTEGER;if(n===Fl)return s.RGBA_INTEGER;if(n===ao||n===lo||n===co||n===uo)if(o===ct)if(r=e.get("WEBGL_compressed_texture_s3tc_srgb"),r!==null){if(n===ao)return r.COMPRESSED_SRGB_S3TC_DXT1_EXT;if(n===lo)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;if(n===co)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;if(n===uo)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT}else return null;else if(r=e.get("WEBGL_compressed_texture_s3tc"),r!==null){if(n===ao)return r.COMPRESSED_RGB_S3TC_DXT1_EXT;if(n===lo)return r.COMPRESSED_RGBA_S3TC_DXT1_EXT;if(n===co)return r.COMPRESSED_RGBA_S3TC_DXT3_EXT;if(n===uo)return r.COMPRESSED_RGBA_S3TC_DXT5_EXT}else return null;if(n===Ba||n===za||n===Ha||n===Va)if(r=e.get("WEBGL_compressed_texture_pvrtc"),r!==null){if(n===Ba)return r.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;if(n===za)return r.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;if(n===Ha)return r.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;if(n===Va)return r.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG}else return null;if(n===Ga||n===Wa||n===Xa)if(r=e.get("WEBGL_compressed_texture_etc"),r!==null){if(n===Ga||n===Wa)return o===ct?r.COMPRESSED_SRGB8_ETC2:r.COMPRESSED_RGB8_ETC2;if(n===Xa)return o===ct?r.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC:r.COMPRESSED_RGBA8_ETC2_EAC}else return null;if(n===qa||n===Ka||n===$a||n===Ya||n===ja||n===Za||n===Ja||n===Qa||n===el||n===tl||n===nl||n===il||n===sl||n===rl)if(r=e.get("WEBGL_compressed_texture_astc"),r!==null){if(n===qa)return o===ct?r.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR:r.COMPRESSED_RGBA_ASTC_4x4_KHR;if(n===Ka)return o===ct?r.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR:r.COMPRESSED_RGBA_ASTC_5x4_KHR;if(n===$a)return o===ct?r.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR:r.COMPRESSED_RGBA_ASTC_5x5_KHR;if(n===Ya)return o===ct?r.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR:r.COMPRESSED_RGBA_ASTC_6x5_KHR;if(n===ja)return o===ct?r.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR:r.COMPRESSED_RGBA_ASTC_6x6_KHR;if(n===Za)return o===ct?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR:r.COMPRESSED_RGBA_ASTC_8x5_KHR;if(n===Ja)return o===ct?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR:r.COMPRESSED_RGBA_ASTC_8x6_KHR;if(n===Qa)return o===ct?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR:r.COMPRESSED_RGBA_ASTC_8x8_KHR;if(n===el)return o===ct?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR:r.COMPRESSED_RGBA_ASTC_10x5_KHR;if(n===tl)return o===ct?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR:r.COMPRESSED_RGBA_ASTC_10x6_KHR;if(n===nl)return o===ct?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR:r.COMPRESSED_RGBA_ASTC_10x8_KHR;if(n===il)return o===ct?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR:r.COMPRESSED_RGBA_ASTC_10x10_KHR;if(n===sl)return o===ct?r.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR:r.COMPRESSED_RGBA_ASTC_12x10_KHR;if(n===rl)return o===ct?r.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR:r.COMPRESSED_RGBA_ASTC_12x12_KHR}else return null;if(n===ol||n===al||n===ll)if(r=e.get("EXT_texture_compression_bptc"),r!==null){if(n===ol)return o===ct?r.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT:r.COMPRESSED_RGBA_BPTC_UNORM_EXT;if(n===al)return r.COMPRESSED_RGB_BPTC_SIGNED_FLOAT_EXT;if(n===ll)return r.COMPRESSED_RGB_BPTC_UNSIGNED_FLOAT_EXT}else return null;if(n===cl||n===ul||n===hl||n===fl)if(r=e.get("EXT_texture_compression_rgtc"),r!==null){if(n===cl)return r.COMPRESSED_RED_RGTC1_EXT;if(n===ul)return r.COMPRESSED_SIGNED_RED_RGTC1_EXT;if(n===hl)return r.COMPRESSED_RED_GREEN_RGTC2_EXT;if(n===fl)return r.COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT}else return null;return n===sr?s.UNSIGNED_INT_24_8:s[n]!==void 0?s[n]:null}return{convert:t}}const Zx=`
void main() {

	gl_Position = vec4( position, 1.0 );

}`,Jx=`
uniform sampler2DArray depthColor;
uniform float depthWidth;
uniform float depthHeight;

void main() {

	vec2 coord = vec2( gl_FragCoord.x / depthWidth, gl_FragCoord.y / depthHeight );

	if ( coord.x >= 1.0 ) {

		gl_FragDepth = texture( depthColor, vec3( coord.x - 1.0, coord.y, 1 ) ).r;

	} else {

		gl_FragDepth = texture( depthColor, vec3( coord.x, coord.y, 0 ) ).r;

	}

}`;class Qx{constructor(){this.texture=null,this.mesh=null,this.depthNear=0,this.depthFar=0}init(e,t){if(this.texture===null){const n=new Dh(e.texture);(e.depthNear!==t.depthNear||e.depthFar!==t.depthFar)&&(this.depthNear=e.depthNear,this.depthFar=e.depthFar),this.texture=n}}getMesh(e){if(this.texture!==null&&this.mesh===null){const t=e.cameras[0].viewport,n=new Tt({vertexShader:Zx,fragmentShader:Jx,uniforms:{depthColor:{value:this.texture},depthWidth:{value:t.z},depthHeight:{value:t.w}}});this.mesh=new Ye(new Zn(20,20),n)}return this.mesh}reset(){this.texture=null,this.mesh=null}getDepthTexture(){return this.texture}}class e_ extends Ms{constructor(e,t){super();const n=this;let i=null,r=1,o=null,a="local-floor",l=1,c=null,u=null,h=null,f=null,d=null,p=null;const v=typeof XRWebGLBinding<"u",g=new Qx,m={},_=t.getContextAttributes();let y=null,x=null;const E=[],A=[],R=new ne;let L=null;const b=new Dt;b.viewport=new He;const M=new Dt;M.viewport=new He;const P=[b,M],D=new hm;let O=null,V=null;this.cameraAutoUpdate=!0,this.enabled=!1,this.isPresenting=!1,this.getController=function($){let Q=E[$];return Q===void 0&&(Q=new ta,E[$]=Q),Q.getTargetRaySpace()},this.getControllerGrip=function($){let Q=E[$];return Q===void 0&&(Q=new ta,E[$]=Q),Q.getGripSpace()},this.getHand=function($){let Q=E[$];return Q===void 0&&(Q=new ta,E[$]=Q),Q.getHandSpace()};function B($){const Q=A.indexOf($.inputSource);if(Q===-1)return;const me=E[Q];me!==void 0&&(me.update($.inputSource,$.frame,c||o),me.dispatchEvent({type:$.type,data:$.inputSource}))}function W(){i.removeEventListener("select",B),i.removeEventListener("selectstart",B),i.removeEventListener("selectend",B),i.removeEventListener("squeeze",B),i.removeEventListener("squeezestart",B),i.removeEventListener("squeezeend",B),i.removeEventListener("end",W),i.removeEventListener("inputsourceschange",K);for(let $=0;$<E.length;$++){const Q=A[$];Q!==null&&(A[$]=null,E[$].disconnect(Q))}O=null,V=null,g.reset();for(const $ in m)delete m[$];e.setRenderTarget(y),d=null,f=null,h=null,i=null,x=null,je.stop(),n.isPresenting=!1,e.setPixelRatio(L),e.setSize(R.width,R.height,!1),n.dispatchEvent({type:"sessionend"})}this.setFramebufferScaleFactor=function($){r=$,n.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change framebuffer scale while presenting.")},this.setReferenceSpaceType=function($){a=$,n.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change reference space type while presenting.")},this.getReferenceSpace=function(){return c||o},this.setReferenceSpace=function($){c=$},this.getBaseLayer=function(){return f!==null?f:d},this.getBinding=function(){return h===null&&v&&(h=new XRWebGLBinding(i,t)),h},this.getFrame=function(){return p},this.getSession=function(){return i},this.setSession=async function($){if(i=$,i!==null){if(y=e.getRenderTarget(),i.addEventListener("select",B),i.addEventListener("selectstart",B),i.addEventListener("selectend",B),i.addEventListener("squeeze",B),i.addEventListener("squeezestart",B),i.addEventListener("squeezeend",B),i.addEventListener("end",W),i.addEventListener("inputsourceschange",K),_.xrCompatible!==!0&&await t.makeXRCompatible(),L=e.getPixelRatio(),e.getSize(R),v&&"createProjectionLayer"in XRWebGLBinding.prototype){let me=null,be=null,ye=null;_.depth&&(ye=_.stencil?t.DEPTH24_STENCIL8:t.DEPTH_COMPONENT24,me=_.stencil?or:rr,be=_.stencil?sr:Li);const ze={colorFormat:t.RGBA8,depthFormat:ye,scaleFactor:r};h=this.getBinding(),f=h.createProjectionLayer(ze),i.updateRenderState({layers:[f]}),e.setPixelRatio(1),e.setSize(f.textureWidth,f.textureHeight,!1),x=new Ln(f.textureWidth,f.textureHeight,{format:Nt,type:yn,depthTexture:new Ih(f.textureWidth,f.textureHeight,be,void 0,void 0,void 0,void 0,void 0,void 0,me),stencilBuffer:_.stencil,colorSpace:e.outputColorSpace,samples:_.antialias?4:0,resolveDepthBuffer:f.ignoreDepthValues===!1,resolveStencilBuffer:f.ignoreDepthValues===!1})}else{const me={antialias:_.antialias,alpha:!0,depth:_.depth,stencil:_.stencil,framebufferScaleFactor:r};d=new XRWebGLLayer(i,t,me),i.updateRenderState({baseLayer:d}),e.setPixelRatio(1),e.setSize(d.framebufferWidth,d.framebufferHeight,!1),x=new Ln(d.framebufferWidth,d.framebufferHeight,{format:Nt,type:yn,colorSpace:e.outputColorSpace,stencilBuffer:_.stencil,resolveDepthBuffer:d.ignoreDepthValues===!1,resolveStencilBuffer:d.ignoreDepthValues===!1})}x.isXRRenderTarget=!0,this.setFoveation(l),c=null,o=await i.requestReferenceSpace(a),je.setContext(i),je.start(),n.isPresenting=!0,n.dispatchEvent({type:"sessionstart"})}},this.getEnvironmentBlendMode=function(){if(i!==null)return i.environmentBlendMode},this.getDepthTexture=function(){return g.getDepthTexture()};function K($){for(let Q=0;Q<$.removed.length;Q++){const me=$.removed[Q],be=A.indexOf(me);be>=0&&(A[be]=null,E[be].disconnect(me))}for(let Q=0;Q<$.added.length;Q++){const me=$.added[Q];let be=A.indexOf(me);if(be===-1){for(let ze=0;ze<E.length;ze++)if(ze>=A.length){A.push(me),be=ze;break}else if(A[ze]===null){A[ze]=me,be=ze;break}if(be===-1)break}const ye=E[be];ye&&ye.connect(me)}}const G=new w,le=new w;function de($,Q,me){G.setFromMatrixPosition(Q.matrixWorld),le.setFromMatrixPosition(me.matrixWorld);const be=G.distanceTo(le),ye=Q.projectionMatrix.elements,ze=me.projectionMatrix.elements,at=ye[14]/(ye[10]-1),I=ye[14]/(ye[10]+1),te=(ye[9]+1)/ye[5],Z=(ye[9]-1)/ye[5],j=(ye[8]-1)/ye[0],Y=(ze[8]+1)/ze[0],ue=at*j,ie=at*Y,he=be/(-j+Y),Ve=he*-j;if(Q.matrixWorld.decompose($.position,$.quaternion,$.scale),$.translateX(Ve),$.translateZ(he),$.matrixWorld.compose($.position,$.quaternion,$.scale),$.matrixWorldInverse.copy($.matrixWorld).invert(),ye[10]===-1)$.projectionMatrix.copy(Q.projectionMatrix),$.projectionMatrixInverse.copy(Q.projectionMatrixInverse);else{const Be=at+he,C=I+he,S=ue-Ve,k=ie+(be-Ve),X=te*I/C*Be,ee=Z*I/C*Be;$.projectionMatrix.makePerspective(S,k,X,ee,Be,C),$.projectionMatrixInverse.copy($.projectionMatrix).invert()}}function pe($,Q){Q===null?$.matrixWorld.copy($.matrix):$.matrixWorld.multiplyMatrices(Q.matrixWorld,$.matrix),$.matrixWorldInverse.copy($.matrixWorld).invert()}this.updateCamera=function($){if(i===null)return;let Q=$.near,me=$.far;g.texture!==null&&(g.depthNear>0&&(Q=g.depthNear),g.depthFar>0&&(me=g.depthFar)),D.near=M.near=b.near=Q,D.far=M.far=b.far=me,(O!==D.near||V!==D.far)&&(i.updateRenderState({depthNear:D.near,depthFar:D.far}),O=D.near,V=D.far),D.layers.mask=$.layers.mask|6,b.layers.mask=D.layers.mask&3,M.layers.mask=D.layers.mask&5;const be=$.parent,ye=D.cameras;pe(D,be);for(let ze=0;ze<ye.length;ze++)pe(ye[ze],be);ye.length===2?de(D,b,M):D.projectionMatrix.copy(b.projectionMatrix),Ne($,D,be)};function Ne($,Q,me){me===null?$.matrix.copy(Q.matrixWorld):($.matrix.copy(me.matrixWorld),$.matrix.invert(),$.matrix.multiply(Q.matrixWorld)),$.matrix.decompose($.position,$.quaternion,$.scale),$.updateMatrixWorld(!0),$.projectionMatrix.copy(Q.projectionMatrix),$.projectionMatrixInverse.copy(Q.projectionMatrixInverse),$.isPerspectiveCamera&&($.fov=ds*2*Math.atan(1/$.projectionMatrix.elements[5]),$.zoom=1)}this.getCamera=function(){return D},this.getFoveation=function(){if(!(f===null&&d===null))return l},this.setFoveation=function($){l=$,f!==null&&(f.fixedFoveation=$),d!==null&&d.fixedFoveation!==void 0&&(d.fixedFoveation=$)},this.hasDepthSensing=function(){return g.texture!==null},this.getDepthSensingMesh=function(){return g.getMesh(D)},this.getCameraTexture=function($){return m[$]};let Xe=null;function qe($,Q){if(u=Q.getViewerPose(c||o),p=Q,u!==null){const me=u.views;d!==null&&(e.setRenderTargetFramebuffer(x,d.framebuffer),e.setRenderTarget(x));let be=!1;me.length!==D.cameras.length&&(D.cameras.length=0,be=!0);for(let I=0;I<me.length;I++){const te=me[I];let Z=null;if(d!==null)Z=d.getViewport(te);else{const Y=h.getViewSubImage(f,te);Z=Y.viewport,I===0&&(e.setRenderTargetTextures(x,Y.colorTexture,Y.depthStencilTexture),e.setRenderTarget(x))}let j=P[I];j===void 0&&(j=new Dt,j.layers.enable(I),j.viewport=new He,P[I]=j),j.matrix.fromArray(te.transform.matrix),j.matrix.decompose(j.position,j.quaternion,j.scale),j.projectionMatrix.fromArray(te.projectionMatrix),j.projectionMatrixInverse.copy(j.projectionMatrix).invert(),j.viewport.set(Z.x,Z.y,Z.width,Z.height),I===0&&(D.matrix.copy(j.matrix),D.matrix.decompose(D.position,D.quaternion,D.scale)),be===!0&&D.cameras.push(j)}const ye=i.enabledFeatures;if(ye&&ye.includes("depth-sensing")&&i.depthUsage=="gpu-optimized"&&v){h=n.getBinding();const I=h.getDepthInformation(me[0]);I&&I.isValid&&I.texture&&g.init(I,i.renderState)}if(ye&&ye.includes("camera-access")&&v){e.state.unbindTexture(),h=n.getBinding();for(let I=0;I<me.length;I++){const te=me[I].camera;if(te){let Z=m[te];Z||(Z=new Dh,m[te]=Z);const j=h.getCameraImage(te);Z.sourceTexture=j}}}}for(let me=0;me<E.length;me++){const be=A[me],ye=E[me];be!==null&&ye!==void 0&&ye.update(be,Q,c||o)}Xe&&Xe($,Q),Q.detectedPlanes&&n.dispatchEvent({type:"planesdetected",data:Q}),p=null}const je=new qh;je.setAnimationLoop(qe),this.setAnimationLoop=function($){Xe=$},this.dispose=function(){}}}const Mi=new Xt,t_=new Le;function n_(s,e){function t(g,m){g.matrixAutoUpdate===!0&&g.updateMatrix(),m.value.copy(g.matrix)}function n(g,m){m.color.getRGB(g.fogColor.value,Th(s)),m.isFog?(g.fogNear.value=m.near,g.fogFar.value=m.far):m.isFogExp2&&(g.fogDensity.value=m.density)}function i(g,m,_,y,x){m.isMeshBasicMaterial||m.isMeshLambertMaterial?r(g,m):m.isMeshToonMaterial?(r(g,m),h(g,m)):m.isMeshPhongMaterial?(r(g,m),u(g,m)):m.isMeshStandardMaterial?(r(g,m),f(g,m),m.isMeshPhysicalMaterial&&d(g,m,x)):m.isMeshMatcapMaterial?(r(g,m),p(g,m)):m.isMeshDepthMaterial?r(g,m):m.isMeshDistanceMaterial?(r(g,m),v(g,m)):m.isMeshNormalMaterial?r(g,m):m.isLineBasicMaterial?(o(g,m),m.isLineDashedMaterial&&a(g,m)):m.isPointsMaterial?l(g,m,_,y):m.isSpriteMaterial?c(g,m):m.isShadowMaterial?(g.color.value.copy(m.color),g.opacity.value=m.opacity):m.isShaderMaterial&&(m.uniformsNeedUpdate=!1)}function r(g,m){g.opacity.value=m.opacity,m.color&&g.diffuse.value.copy(m.color),m.emissive&&g.emissive.value.copy(m.emissive).multiplyScalar(m.emissiveIntensity),m.map&&(g.map.value=m.map,t(m.map,g.mapTransform)),m.alphaMap&&(g.alphaMap.value=m.alphaMap,t(m.alphaMap,g.alphaMapTransform)),m.bumpMap&&(g.bumpMap.value=m.bumpMap,t(m.bumpMap,g.bumpMapTransform),g.bumpScale.value=m.bumpScale,m.side===Lt&&(g.bumpScale.value*=-1)),m.normalMap&&(g.normalMap.value=m.normalMap,t(m.normalMap,g.normalMapTransform),g.normalScale.value.copy(m.normalScale),m.side===Lt&&g.normalScale.value.negate()),m.displacementMap&&(g.displacementMap.value=m.displacementMap,t(m.displacementMap,g.displacementMapTransform),g.displacementScale.value=m.displacementScale,g.displacementBias.value=m.displacementBias),m.emissiveMap&&(g.emissiveMap.value=m.emissiveMap,t(m.emissiveMap,g.emissiveMapTransform)),m.specularMap&&(g.specularMap.value=m.specularMap,t(m.specularMap,g.specularMapTransform)),m.alphaTest>0&&(g.alphaTest.value=m.alphaTest);const _=e.get(m),y=_.envMap,x=_.envMapRotation;y&&(g.envMap.value=y,Mi.copy(x),Mi.x*=-1,Mi.y*=-1,Mi.z*=-1,y.isCubeTexture&&y.isRenderTargetTexture===!1&&(Mi.y*=-1,Mi.z*=-1),g.envMapRotation.value.setFromMatrix4(t_.makeRotationFromEuler(Mi)),g.flipEnvMap.value=y.isCubeTexture&&y.isRenderTargetTexture===!1?-1:1,g.reflectivity.value=m.reflectivity,g.ior.value=m.ior,g.refractionRatio.value=m.refractionRatio),m.lightMap&&(g.lightMap.value=m.lightMap,g.lightMapIntensity.value=m.lightMapIntensity,t(m.lightMap,g.lightMapTransform)),m.aoMap&&(g.aoMap.value=m.aoMap,g.aoMapIntensity.value=m.aoMapIntensity,t(m.aoMap,g.aoMapTransform))}function o(g,m){g.diffuse.value.copy(m.color),g.opacity.value=m.opacity,m.map&&(g.map.value=m.map,t(m.map,g.mapTransform))}function a(g,m){g.dashSize.value=m.dashSize,g.totalSize.value=m.dashSize+m.gapSize,g.scale.value=m.scale}function l(g,m,_,y){g.diffuse.value.copy(m.color),g.opacity.value=m.opacity,g.size.value=m.size*_,g.scale.value=y*.5,m.map&&(g.map.value=m.map,t(m.map,g.uvTransform)),m.alphaMap&&(g.alphaMap.value=m.alphaMap,t(m.alphaMap,g.alphaMapTransform)),m.alphaTest>0&&(g.alphaTest.value=m.alphaTest)}function c(g,m){g.diffuse.value.copy(m.color),g.opacity.value=m.opacity,g.rotation.value=m.rotation,m.map&&(g.map.value=m.map,t(m.map,g.mapTransform)),m.alphaMap&&(g.alphaMap.value=m.alphaMap,t(m.alphaMap,g.alphaMapTransform)),m.alphaTest>0&&(g.alphaTest.value=m.alphaTest)}function u(g,m){g.specular.value.copy(m.specular),g.shininess.value=Math.max(m.shininess,1e-4)}function h(g,m){m.gradientMap&&(g.gradientMap.value=m.gradientMap)}function f(g,m){g.metalness.value=m.metalness,m.metalnessMap&&(g.metalnessMap.value=m.metalnessMap,t(m.metalnessMap,g.metalnessMapTransform)),g.roughness.value=m.roughness,m.roughnessMap&&(g.roughnessMap.value=m.roughnessMap,t(m.roughnessMap,g.roughnessMapTransform)),m.envMap&&(g.envMapIntensity.value=m.envMapIntensity)}function d(g,m,_){g.ior.value=m.ior,m.sheen>0&&(g.sheenColor.value.copy(m.sheenColor).multiplyScalar(m.sheen),g.sheenRoughness.value=m.sheenRoughness,m.sheenColorMap&&(g.sheenColorMap.value=m.sheenColorMap,t(m.sheenColorMap,g.sheenColorMapTransform)),m.sheenRoughnessMap&&(g.sheenRoughnessMap.value=m.sheenRoughnessMap,t(m.sheenRoughnessMap,g.sheenRoughnessMapTransform))),m.clearcoat>0&&(g.clearcoat.value=m.clearcoat,g.clearcoatRoughness.value=m.clearcoatRoughness,m.clearcoatMap&&(g.clearcoatMap.value=m.clearcoatMap,t(m.clearcoatMap,g.clearcoatMapTransform)),m.clearcoatRoughnessMap&&(g.clearcoatRoughnessMap.value=m.clearcoatRoughnessMap,t(m.clearcoatRoughnessMap,g.clearcoatRoughnessMapTransform)),m.clearcoatNormalMap&&(g.clearcoatNormalMap.value=m.clearcoatNormalMap,t(m.clearcoatNormalMap,g.clearcoatNormalMapTransform),g.clearcoatNormalScale.value.copy(m.clearcoatNormalScale),m.side===Lt&&g.clearcoatNormalScale.value.negate())),m.dispersion>0&&(g.dispersion.value=m.dispersion),m.iridescence>0&&(g.iridescence.value=m.iridescence,g.iridescenceIOR.value=m.iridescenceIOR,g.iridescenceThicknessMinimum.value=m.iridescenceThicknessRange[0],g.iridescenceThicknessMaximum.value=m.iridescenceThicknessRange[1],m.iridescenceMap&&(g.iridescenceMap.value=m.iridescenceMap,t(m.iridescenceMap,g.iridescenceMapTransform)),m.iridescenceThicknessMap&&(g.iridescenceThicknessMap.value=m.iridescenceThicknessMap,t(m.iridescenceThicknessMap,g.iridescenceThicknessMapTransform))),m.transmission>0&&(g.transmission.value=m.transmission,g.transmissionSamplerMap.value=_.texture,g.transmissionSamplerSize.value.set(_.width,_.height),m.transmissionMap&&(g.transmissionMap.value=m.transmissionMap,t(m.transmissionMap,g.transmissionMapTransform)),g.thickness.value=m.thickness,m.thicknessMap&&(g.thicknessMap.value=m.thicknessMap,t(m.thicknessMap,g.thicknessMapTransform)),g.attenuationDistance.value=m.attenuationDistance,g.attenuationColor.value.copy(m.attenuationColor)),m.anisotropy>0&&(g.anisotropyVector.value.set(m.anisotropy*Math.cos(m.anisotropyRotation),m.anisotropy*Math.sin(m.anisotropyRotation)),m.anisotropyMap&&(g.anisotropyMap.value=m.anisotropyMap,t(m.anisotropyMap,g.anisotropyMapTransform))),g.specularIntensity.value=m.specularIntensity,g.specularColor.value.copy(m.specularColor),m.specularColorMap&&(g.specularColorMap.value=m.specularColorMap,t(m.specularColorMap,g.specularColorMapTransform)),m.specularIntensityMap&&(g.specularIntensityMap.value=m.specularIntensityMap,t(m.specularIntensityMap,g.specularIntensityMapTransform))}function p(g,m){m.matcap&&(g.matcap.value=m.matcap)}function v(g,m){const _=e.get(m).light;g.referencePosition.value.setFromMatrixPosition(_.matrixWorld),g.nearDistance.value=_.shadow.camera.near,g.farDistance.value=_.shadow.camera.far}return{refreshFogUniforms:n,refreshMaterialUniforms:i}}function i_(s,e,t,n){let i={},r={},o=[];const a=s.getParameter(s.MAX_UNIFORM_BUFFER_BINDINGS);function l(_,y){const x=y.program;n.uniformBlockBinding(_,x)}function c(_,y){let x=i[_.id];x===void 0&&(p(_),x=u(_),i[_.id]=x,_.addEventListener("dispose",g));const E=y.program;n.updateUBOMapping(_,E);const A=e.render.frame;r[_.id]!==A&&(f(_),r[_.id]=A)}function u(_){const y=h();_.__bindingPointIndex=y;const x=s.createBuffer(),E=_.__size,A=_.usage;return s.bindBuffer(s.UNIFORM_BUFFER,x),s.bufferData(s.UNIFORM_BUFFER,E,A),s.bindBuffer(s.UNIFORM_BUFFER,null),s.bindBufferBase(s.UNIFORM_BUFFER,y,x),x}function h(){for(let _=0;_<a;_++)if(o.indexOf(_)===-1)return o.push(_),_;return console.error("THREE.WebGLRenderer: Maximum number of simultaneously usable uniforms groups reached."),0}function f(_){const y=i[_.id],x=_.uniforms,E=_.__cache;s.bindBuffer(s.UNIFORM_BUFFER,y);for(let A=0,R=x.length;A<R;A++){const L=Array.isArray(x[A])?x[A]:[x[A]];for(let b=0,M=L.length;b<M;b++){const P=L[b];if(d(P,A,b,E)===!0){const D=P.__offset,O=Array.isArray(P.value)?P.value:[P.value];let V=0;for(let B=0;B<O.length;B++){const W=O[B],K=v(W);typeof W=="number"||typeof W=="boolean"?(P.__data[0]=W,s.bufferSubData(s.UNIFORM_BUFFER,D+V,P.__data)):W.isMatrix3?(P.__data[0]=W.elements[0],P.__data[1]=W.elements[1],P.__data[2]=W.elements[2],P.__data[3]=0,P.__data[4]=W.elements[3],P.__data[5]=W.elements[4],P.__data[6]=W.elements[5],P.__data[7]=0,P.__data[8]=W.elements[6],P.__data[9]=W.elements[7],P.__data[10]=W.elements[8],P.__data[11]=0):(W.toArray(P.__data,V),V+=K.storage/Float32Array.BYTES_PER_ELEMENT)}s.bufferSubData(s.UNIFORM_BUFFER,D,P.__data)}}}s.bindBuffer(s.UNIFORM_BUFFER,null)}function d(_,y,x,E){const A=_.value,R=y+"_"+x;if(E[R]===void 0)return typeof A=="number"||typeof A=="boolean"?E[R]=A:E[R]=A.clone(),!0;{const L=E[R];if(typeof A=="number"||typeof A=="boolean"){if(L!==A)return E[R]=A,!0}else if(L.equals(A)===!1)return L.copy(A),!0}return!1}function p(_){const y=_.uniforms;let x=0;const E=16;for(let R=0,L=y.length;R<L;R++){const b=Array.isArray(y[R])?y[R]:[y[R]];for(let M=0,P=b.length;M<P;M++){const D=b[M],O=Array.isArray(D.value)?D.value:[D.value];for(let V=0,B=O.length;V<B;V++){const W=O[V],K=v(W),G=x%E,le=G%K.boundary,de=G+le;x+=le,de!==0&&E-de<K.storage&&(x+=E-de),D.__data=new Float32Array(K.storage/Float32Array.BYTES_PER_ELEMENT),D.__offset=x,x+=K.storage}}}const A=x%E;return A>0&&(x+=E-A),_.__size=x,_.__cache={},this}function v(_){const y={boundary:0,storage:0};return typeof _=="number"||typeof _=="boolean"?(y.boundary=4,y.storage=4):_.isVector2?(y.boundary=8,y.storage=8):_.isVector3||_.isColor?(y.boundary=16,y.storage=12):_.isVector4?(y.boundary=16,y.storage=16):_.isMatrix3?(y.boundary=48,y.storage=48):_.isMatrix4?(y.boundary=64,y.storage=64):_.isTexture?console.warn("THREE.WebGLRenderer: Texture samplers can not be part of an uniforms group."):console.warn("THREE.WebGLRenderer: Unsupported uniform value type.",_),y}function g(_){const y=_.target;y.removeEventListener("dispose",g);const x=o.indexOf(y.__bindingPointIndex);o.splice(x,1),s.deleteBuffer(i[y.id]),delete i[y.id],delete r[y.id]}function m(){for(const _ in i)s.deleteBuffer(i[_]);o=[],i={},r={}}return{bind:l,update:c,dispose:m}}class s_{constructor(e={}){const{canvas:t=Td(),context:n=null,depth:i=!0,stencil:r=!1,alpha:o=!1,antialias:a=!1,premultipliedAlpha:l=!0,preserveDrawingBuffer:c=!1,powerPreference:u="default",failIfMajorPerformanceCaveat:h=!1,reversedDepthBuffer:f=!1}=e;this.isWebGLRenderer=!0;let d;if(n!==null){if(typeof WebGLRenderingContext<"u"&&n instanceof WebGLRenderingContext)throw new Error("THREE.WebGLRenderer: WebGL 1 is not supported since r163.");d=n.getContextAttributes().alpha}else d=o;const p=new Uint32Array(4),v=new Int32Array(4);let g=null,m=null;const _=[],y=[];this.domElement=t,this.debug={checkShaderErrors:!0,onShaderError:null},this.autoClear=!0,this.autoClearColor=!0,this.autoClearDepth=!0,this.autoClearStencil=!0,this.sortObjects=!0,this.clippingPlanes=[],this.localClippingEnabled=!1,this.toneMapping=hi,this.toneMappingExposure=1,this.transmissionResolutionScale=1;const x=this;let E=!1;this._outputColorSpace=St;let A=0,R=0,L=null,b=-1,M=null;const P=new He,D=new He;let O=null;const V=new Ue(0);let B=0,W=t.width,K=t.height,G=1,le=null,de=null;const pe=new He(0,0,W,K),Ne=new He(0,0,W,K);let Xe=!1;const qe=new Hl;let je=!1,$=!1;const Q=new Le,me=new w,be=new He,ye={background:null,fog:null,environment:null,overrideMaterial:null,isScene:!0};let ze=!1;function at(){return L===null?G:1}let I=n;function te(T,U){return t.getContext(T,U)}try{const T={alpha:!0,depth:i,stencil:r,antialias:a,premultipliedAlpha:l,preserveDrawingBuffer:c,powerPreference:u,failIfMajorPerformanceCaveat:h};if("setAttribute"in t&&t.setAttribute("data-engine",`three.js r${Pl}`),t.addEventListener("webglcontextlost",fe,!1),t.addEventListener("webglcontextrestored",Se,!1),t.addEventListener("webglcontextcreationerror",re,!1),I===null){const U="webgl2";if(I=te(U,T),I===null)throw te(U)?new Error("Error creating WebGL context with your selected attributes."):new Error("Error creating WebGL context.")}}catch(T){throw console.error("THREE.WebGLRenderer: "+T.message),T}let Z,j,Y,ue,ie,he,Ve,Be,C,S,k,X,ee,q,Re,ce,Ee,we,se,_e,Oe,Pe,ve,We;function N(){Z=new pv(I),Z.init(),Pe=new jx(I,Z),j=new av(I,Z,e,Pe),Y=new $x(I,Z),j.reversedDepthBuffer&&f&&Y.buffers.depth.setReversed(!0),ue=new vv(I),ie=new Ux,he=new Yx(I,Z,Y,ie,j,Pe,ue),Ve=new cv(x),Be=new dv(x),C=new bm(I),ve=new rv(I,C),S=new mv(I,C,ue,ve),k=new _v(I,S,C,ue),se=new xv(I,j,he),ce=new lv(ie),X=new Nx(x,Ve,Be,Z,j,ve,ce),ee=new n_(x,ie),q=new Ox,Re=new Gx(Z),we=new sv(x,Ve,Be,Y,k,d,l),Ee=new qx(x,k,j),We=new i_(I,ue,j,Y),_e=new ov(I,Z,ue),Oe=new gv(I,Z,ue),ue.programs=X.programs,x.capabilities=j,x.extensions=Z,x.properties=ie,x.renderLists=q,x.shadowMap=Ee,x.state=Y,x.info=ue}N();const ae=new e_(x,I);this.xr=ae,this.getContext=function(){return I},this.getContextAttributes=function(){return I.getContextAttributes()},this.forceContextLoss=function(){const T=Z.get("WEBGL_lose_context");T&&T.loseContext()},this.forceContextRestore=function(){const T=Z.get("WEBGL_lose_context");T&&T.restoreContext()},this.getPixelRatio=function(){return G},this.setPixelRatio=function(T){T!==void 0&&(G=T,this.setSize(W,K,!1))},this.getSize=function(T){return T.set(W,K)},this.setSize=function(T,U,z=!0){if(ae.isPresenting){console.warn("THREE.WebGLRenderer: Can't change size while VR device is presenting.");return}W=T,K=U,t.width=Math.floor(T*G),t.height=Math.floor(U*G),z===!0&&(t.style.width=T+"px",t.style.height=U+"px"),this.setViewport(0,0,T,U)},this.getDrawingBufferSize=function(T){return T.set(W*G,K*G).floor()},this.setDrawingBufferSize=function(T,U,z){W=T,K=U,G=z,t.width=Math.floor(T*z),t.height=Math.floor(U*z),this.setViewport(0,0,T,U)},this.getCurrentViewport=function(T){return T.copy(P)},this.getViewport=function(T){return T.copy(pe)},this.setViewport=function(T,U,z,H){T.isVector4?pe.set(T.x,T.y,T.z,T.w):pe.set(T,U,z,H),Y.viewport(P.copy(pe).multiplyScalar(G).round())},this.getScissor=function(T){return T.copy(Ne)},this.setScissor=function(T,U,z,H){T.isVector4?Ne.set(T.x,T.y,T.z,T.w):Ne.set(T,U,z,H),Y.scissor(D.copy(Ne).multiplyScalar(G).round())},this.getScissorTest=function(){return Xe},this.setScissorTest=function(T){Y.setScissorTest(Xe=T)},this.setOpaqueSort=function(T){le=T},this.setTransparentSort=function(T){de=T},this.getClearColor=function(T){return T.copy(we.getClearColor())},this.setClearColor=function(){we.setClearColor(...arguments)},this.getClearAlpha=function(){return we.getClearAlpha()},this.setClearAlpha=function(){we.setClearAlpha(...arguments)},this.clear=function(T=!0,U=!0,z=!0){let H=0;if(T){let F=!1;if(L!==null){const oe=L.texture.format;F=oe===Fl||oe===Ul||oe===Nl}if(F){const oe=L.texture.type,xe=oe===yn||oe===Li||oe===ir||oe===sr||oe===Il||oe===Dl,Te=we.getClearColor(),Me=we.getClearAlpha(),Fe=Te.r,ke=Te.g,Ie=Te.b;xe?(p[0]=Fe,p[1]=ke,p[2]=Ie,p[3]=Me,I.clearBufferuiv(I.COLOR,0,p)):(v[0]=Fe,v[1]=ke,v[2]=Ie,v[3]=Me,I.clearBufferiv(I.COLOR,0,v))}else H|=I.COLOR_BUFFER_BIT}U&&(H|=I.DEPTH_BUFFER_BIT),z&&(H|=I.STENCIL_BUFFER_BIT,this.state.buffers.stencil.setMask(4294967295)),I.clear(H)},this.clearColor=function(){this.clear(!0,!1,!1)},this.clearDepth=function(){this.clear(!1,!0,!1)},this.clearStencil=function(){this.clear(!1,!1,!0)},this.dispose=function(){t.removeEventListener("webglcontextlost",fe,!1),t.removeEventListener("webglcontextrestored",Se,!1),t.removeEventListener("webglcontextcreationerror",re,!1),we.dispose(),q.dispose(),Re.dispose(),ie.dispose(),Ve.dispose(),Be.dispose(),k.dispose(),ve.dispose(),We.dispose(),X.dispose(),ae.dispose(),ae.removeEventListener("sessionstart",Sn),ae.removeEventListener("sessionend",lc),pi.stop()};function fe(T){T.preventDefault(),console.log("THREE.WebGLRenderer: Context Lost."),E=!0}function Se(){console.log("THREE.WebGLRenderer: Context Restored."),E=!1;const T=ue.autoReset,U=Ee.enabled,z=Ee.autoUpdate,H=Ee.needsUpdate,F=Ee.type;N(),ue.autoReset=T,Ee.enabled=U,Ee.autoUpdate=z,Ee.needsUpdate=H,Ee.type=F}function re(T){console.error("THREE.WebGLRenderer: A WebGL context could not be created. Reason: ",T.statusMessage)}function J(T){const U=T.target;U.removeEventListener("dispose",J),Ae(U)}function Ae(T){Ge(T),ie.remove(T)}function Ge(T){const U=ie.get(T).programs;U!==void 0&&(U.forEach(function(z){X.releaseProgram(z)}),T.isShaderMaterial&&X.releaseShaderCache(T))}this.renderBufferDirect=function(T,U,z,H,F,oe){U===null&&(U=ye);const xe=F.isMesh&&F.matrixWorld.determinant()<0,Te=xf(T,U,z,H,F);Y.setMaterial(H,xe);let Me=z.index,Fe=1;if(H.wireframe===!0){if(Me=S.getWireframeAttribute(z),Me===void 0)return;Fe=2}const ke=z.drawRange,Ie=z.attributes.position;let Je=ke.start*Fe,lt=(ke.start+ke.count)*Fe;oe!==null&&(Je=Math.max(Je,oe.start*Fe),lt=Math.min(lt,(oe.start+oe.count)*Fe)),Me!==null?(Je=Math.max(Je,0),lt=Math.min(lt,Me.count)):Ie!=null&&(Je=Math.max(Je,0),lt=Math.min(lt,Ie.count));const yt=lt-Je;if(yt<0||yt===1/0)return;ve.setup(F,H,Te,z,Me);let pt,ut=_e;if(Me!==null&&(pt=C.get(Me),ut=Oe,ut.setIndex(pt)),F.isMesh)H.wireframe===!0?(Y.setLineWidth(H.wireframeLinewidth*at()),ut.setMode(I.LINES)):ut.setMode(I.TRIANGLES);else if(F.isLine){let De=H.linewidth;De===void 0&&(De=1),Y.setLineWidth(De*at()),F.isLineSegments?ut.setMode(I.LINES):F.isLineLoop?ut.setMode(I.LINE_LOOP):ut.setMode(I.LINE_STRIP)}else F.isPoints?ut.setMode(I.POINTS):F.isSprite&&ut.setMode(I.TRIANGLES);if(F.isBatchedMesh)if(F._multiDrawInstances!==null)ur("THREE.WebGLRenderer: renderMultiDrawInstances has been deprecated and will be removed in r184. Append to renderMultiDraw arguments and use indirection."),ut.renderMultiDrawInstances(F._multiDrawStarts,F._multiDrawCounts,F._multiDrawCount,F._multiDrawInstances);else if(Z.get("WEBGL_multi_draw"))ut.renderMultiDraw(F._multiDrawStarts,F._multiDrawCounts,F._multiDrawCount);else{const De=F._multiDrawStarts,gt=F._multiDrawCounts,tt=F._multiDrawCount,Zt=Me?C.get(Me).bytesPerElement:1,Ui=ie.get(H).currentProgram.getUniforms();for(let Jt=0;Jt<tt;Jt++)Ui.setValue(I,"_gl_DrawID",Jt),ut.render(De[Jt]/Zt,gt[Jt])}else if(F.isInstancedMesh)ut.renderInstances(Je,yt,F.count);else if(z.isInstancedBufferGeometry){const De=z._maxInstanceCount!==void 0?z._maxInstanceCount:1/0,gt=Math.min(z.instanceCount,De);ut.renderInstances(Je,yt,gt)}else ut.render(Je,yt)};function ft(T,U,z){T.transparent===!0&&T.side===cn&&T.forceSinglePass===!1?(T.side=Lt,T.needsUpdate=!0,yr(T,U,z),T.side=Yn,T.needsUpdate=!0,yr(T,U,z),T.side=cn):yr(T,U,z)}this.compile=function(T,U,z=null){z===null&&(z=T),m=Re.get(z),m.init(U),y.push(m),z.traverseVisible(function(F){F.isLight&&F.layers.test(U.layers)&&(m.pushLight(F),F.castShadow&&m.pushShadow(F))}),T!==z&&T.traverseVisible(function(F){F.isLight&&F.layers.test(U.layers)&&(m.pushLight(F),F.castShadow&&m.pushShadow(F))}),m.setupLights();const H=new Set;return T.traverse(function(F){if(!(F.isMesh||F.isPoints||F.isLine||F.isSprite))return;const oe=F.material;if(oe)if(Array.isArray(oe))for(let xe=0;xe<oe.length;xe++){const Te=oe[xe];ft(Te,z,F),H.add(Te)}else ft(oe,z,F),H.add(oe)}),m=y.pop(),H},this.compileAsync=function(T,U,z=null){const H=this.compile(T,U,z);return new Promise(F=>{function oe(){if(H.forEach(function(xe){ie.get(xe).currentProgram.isReady()&&H.delete(xe)}),H.size===0){F(T);return}setTimeout(oe,10)}Z.get("KHR_parallel_shader_compile")!==null?oe():setTimeout(oe,10)})};let nt=null;function Un(T){nt&&nt(T)}function Sn(){pi.stop()}function lc(){pi.start()}const pi=new qh;pi.setAnimationLoop(Un),typeof self<"u"&&pi.setContext(self),this.setAnimationLoop=function(T){nt=T,ae.setAnimationLoop(T),T===null?pi.stop():pi.start()},ae.addEventListener("sessionstart",Sn),ae.addEventListener("sessionend",lc),this.render=function(T,U){if(U!==void 0&&U.isCamera!==!0){console.error("THREE.WebGLRenderer.render: camera is not an instance of THREE.Camera.");return}if(E===!0)return;if(T.matrixWorldAutoUpdate===!0&&T.updateMatrixWorld(),U.parent===null&&U.matrixWorldAutoUpdate===!0&&U.updateMatrixWorld(),ae.enabled===!0&&ae.isPresenting===!0&&(ae.cameraAutoUpdate===!0&&ae.updateCamera(U),U=ae.getCamera()),T.isScene===!0&&T.onBeforeRender(x,T,U,L),m=Re.get(T,y.length),m.init(U),y.push(m),Q.multiplyMatrices(U.projectionMatrix,U.matrixWorldInverse),qe.setFromProjectionMatrix(Q,Cn,U.reversedDepth),$=this.localClippingEnabled,je=ce.init(this.clippingPlanes,$),g=q.get(T,_.length),g.init(),_.push(g),ae.enabled===!0&&ae.isPresenting===!0){const oe=x.xr.getDepthSensingMesh();oe!==null&&Io(oe,U,-1/0,x.sortObjects)}Io(T,U,0,x.sortObjects),g.finish(),x.sortObjects===!0&&g.sort(le,de),ze=ae.enabled===!1||ae.isPresenting===!1||ae.hasDepthSensing()===!1,ze&&we.addToRenderList(g,T),this.info.render.frame++,je===!0&&ce.beginShadows();const z=m.state.shadowsArray;Ee.render(z,T,U),je===!0&&ce.endShadows(),this.info.autoReset===!0&&this.info.reset();const H=g.opaque,F=g.transmissive;if(m.setupLights(),U.isArrayCamera){const oe=U.cameras;if(F.length>0)for(let xe=0,Te=oe.length;xe<Te;xe++){const Me=oe[xe];uc(H,F,T,Me)}ze&&we.render(T);for(let xe=0,Te=oe.length;xe<Te;xe++){const Me=oe[xe];cc(g,T,Me,Me.viewport)}}else F.length>0&&uc(H,F,T,U),ze&&we.render(T),cc(g,T,U);L!==null&&R===0&&(he.updateMultisampleRenderTarget(L),he.updateRenderTargetMipmap(L)),T.isScene===!0&&T.onAfterRender(x,T,U),ve.resetDefaultState(),b=-1,M=null,y.pop(),y.length>0?(m=y[y.length-1],je===!0&&ce.setGlobalState(x.clippingPlanes,m.state.camera)):m=null,_.pop(),_.length>0?g=_[_.length-1]:g=null};function Io(T,U,z,H){if(T.visible===!1)return;if(T.layers.test(U.layers)){if(T.isGroup)z=T.renderOrder;else if(T.isLOD)T.autoUpdate===!0&&T.update(U);else if(T.isLight)m.pushLight(T),T.castShadow&&m.pushShadow(T);else if(T.isSprite){if(!T.frustumCulled||qe.intersectsSprite(T)){H&&be.setFromMatrixPosition(T.matrixWorld).applyMatrix4(Q);const xe=k.update(T),Te=T.material;Te.visible&&g.push(T,xe,Te,z,be.z,null)}}else if((T.isMesh||T.isLine||T.isPoints)&&(!T.frustumCulled||qe.intersectsObject(T))){const xe=k.update(T),Te=T.material;if(H&&(T.boundingSphere!==void 0?(T.boundingSphere===null&&T.computeBoundingSphere(),be.copy(T.boundingSphere.center)):(xe.boundingSphere===null&&xe.computeBoundingSphere(),be.copy(xe.boundingSphere.center)),be.applyMatrix4(T.matrixWorld).applyMatrix4(Q)),Array.isArray(Te)){const Me=xe.groups;for(let Fe=0,ke=Me.length;Fe<ke;Fe++){const Ie=Me[Fe],Je=Te[Ie.materialIndex];Je&&Je.visible&&g.push(T,xe,Je,z,be.z,Ie)}}else Te.visible&&g.push(T,xe,Te,z,be.z,null)}}const oe=T.children;for(let xe=0,Te=oe.length;xe<Te;xe++)Io(oe[xe],U,z,H)}function cc(T,U,z,H){const F=T.opaque,oe=T.transmissive,xe=T.transparent;m.setupLightsView(z),je===!0&&ce.setGlobalState(x.clippingPlanes,z),H&&Y.viewport(P.copy(H)),F.length>0&&_r(F,U,z),oe.length>0&&_r(oe,U,z),xe.length>0&&_r(xe,U,z),Y.buffers.depth.setTest(!0),Y.buffers.depth.setMask(!0),Y.buffers.color.setMask(!0),Y.setPolygonOffset(!1)}function uc(T,U,z,H){if((z.isScene===!0?z.overrideMaterial:null)!==null)return;m.state.transmissionRenderTarget[H.id]===void 0&&(m.state.transmissionRenderTarget[H.id]=new Ln(1,1,{generateMipmaps:!0,type:Z.has("EXT_color_buffer_half_float")||Z.has("EXT_color_buffer_float")?nn:yn,minFilter:tn,samples:4,stencilBuffer:r,resolveDepthBuffer:!1,resolveStencilBuffer:!1,colorSpace:et.workingColorSpace}));const oe=m.state.transmissionRenderTarget[H.id],xe=H.viewport||P;oe.setSize(xe.z*x.transmissionResolutionScale,xe.w*x.transmissionResolutionScale);const Te=x.getRenderTarget(),Me=x.getActiveCubeFace(),Fe=x.getActiveMipmapLevel();x.setRenderTarget(oe),x.getClearColor(V),B=x.getClearAlpha(),B<1&&x.setClearColor(16777215,.5),x.clear(),ze&&we.render(z);const ke=x.toneMapping;x.toneMapping=hi;const Ie=H.viewport;if(H.viewport!==void 0&&(H.viewport=void 0),m.setupLightsView(H),je===!0&&ce.setGlobalState(x.clippingPlanes,H),_r(T,z,H),he.updateMultisampleRenderTarget(oe),he.updateRenderTargetMipmap(oe),Z.has("WEBGL_multisampled_render_to_texture")===!1){let Je=!1;for(let lt=0,yt=U.length;lt<yt;lt++){const pt=U[lt],ut=pt.object,De=pt.geometry,gt=pt.material,tt=pt.group;if(gt.side===cn&&ut.layers.test(H.layers)){const Zt=gt.side;gt.side=Lt,gt.needsUpdate=!0,hc(ut,z,H,De,gt,tt),gt.side=Zt,gt.needsUpdate=!0,Je=!0}}Je===!0&&(he.updateMultisampleRenderTarget(oe),he.updateRenderTargetMipmap(oe))}x.setRenderTarget(Te,Me,Fe),x.setClearColor(V,B),Ie!==void 0&&(H.viewport=Ie),x.toneMapping=ke}function _r(T,U,z){const H=U.isScene===!0?U.overrideMaterial:null;for(let F=0,oe=T.length;F<oe;F++){const xe=T[F],Te=xe.object,Me=xe.geometry,Fe=xe.group;let ke=xe.material;ke.allowOverride===!0&&H!==null&&(ke=H),Te.layers.test(z.layers)&&hc(Te,U,z,Me,ke,Fe)}}function hc(T,U,z,H,F,oe){T.onBeforeRender(x,U,z,H,F,oe),T.modelViewMatrix.multiplyMatrices(z.matrixWorldInverse,T.matrixWorld),T.normalMatrix.getNormalMatrix(T.modelViewMatrix),F.onBeforeRender(x,U,z,H,T,oe),F.transparent===!0&&F.side===cn&&F.forceSinglePass===!1?(F.side=Lt,F.needsUpdate=!0,x.renderBufferDirect(z,U,H,F,T,oe),F.side=Yn,F.needsUpdate=!0,x.renderBufferDirect(z,U,H,F,T,oe),F.side=cn):x.renderBufferDirect(z,U,H,F,T,oe),T.onAfterRender(x,U,z,H,F,oe)}function yr(T,U,z){U.isScene!==!0&&(U=ye);const H=ie.get(T),F=m.state.lights,oe=m.state.shadowsArray,xe=F.state.version,Te=X.getParameters(T,F.state,oe,U,z),Me=X.getProgramCacheKey(Te);let Fe=H.programs;H.environment=T.isMeshStandardMaterial?U.environment:null,H.fog=U.fog,H.envMap=(T.isMeshStandardMaterial?Be:Ve).get(T.envMap||H.environment),H.envMapRotation=H.environment!==null&&T.envMap===null?U.environmentRotation:T.envMapRotation,Fe===void 0&&(T.addEventListener("dispose",J),Fe=new Map,H.programs=Fe);let ke=Fe.get(Me);if(ke!==void 0){if(H.currentProgram===ke&&H.lightsStateVersion===xe)return dc(T,Te),ke}else Te.uniforms=X.getUniforms(T),T.onBeforeCompile(Te,x),ke=X.acquireProgram(Te,Me),Fe.set(Me,ke),H.uniforms=Te.uniforms;const Ie=H.uniforms;return(!T.isShaderMaterial&&!T.isRawShaderMaterial||T.clipping===!0)&&(Ie.clippingPlanes=ce.uniform),dc(T,Te),H.needsLights=yf(T),H.lightsStateVersion=xe,H.needsLights&&(Ie.ambientLightColor.value=F.state.ambient,Ie.lightProbe.value=F.state.probe,Ie.directionalLights.value=F.state.directional,Ie.directionalLightShadows.value=F.state.directionalShadow,Ie.spotLights.value=F.state.spot,Ie.spotLightShadows.value=F.state.spotShadow,Ie.rectAreaLights.value=F.state.rectArea,Ie.ltc_1.value=F.state.rectAreaLTC1,Ie.ltc_2.value=F.state.rectAreaLTC2,Ie.pointLights.value=F.state.point,Ie.pointLightShadows.value=F.state.pointShadow,Ie.hemisphereLights.value=F.state.hemi,Ie.directionalShadowMap.value=F.state.directionalShadowMap,Ie.directionalShadowMatrix.value=F.state.directionalShadowMatrix,Ie.spotShadowMap.value=F.state.spotShadowMap,Ie.spotLightMatrix.value=F.state.spotLightMatrix,Ie.spotLightMap.value=F.state.spotLightMap,Ie.pointShadowMap.value=F.state.pointShadowMap,Ie.pointShadowMatrix.value=F.state.pointShadowMatrix),H.currentProgram=ke,H.uniformsList=null,ke}function fc(T){if(T.uniformsList===null){const U=T.currentProgram.getUniforms();T.uniformsList=po.seqWithValue(U.seq,T.uniforms)}return T.uniformsList}function dc(T,U){const z=ie.get(T);z.outputColorSpace=U.outputColorSpace,z.batching=U.batching,z.batchingColor=U.batchingColor,z.instancing=U.instancing,z.instancingColor=U.instancingColor,z.instancingMorph=U.instancingMorph,z.skinning=U.skinning,z.morphTargets=U.morphTargets,z.morphNormals=U.morphNormals,z.morphColors=U.morphColors,z.morphTargetsCount=U.morphTargetsCount,z.numClippingPlanes=U.numClippingPlanes,z.numIntersection=U.numClipIntersection,z.vertexAlphas=U.vertexAlphas,z.vertexTangents=U.vertexTangents,z.toneMapping=U.toneMapping}function xf(T,U,z,H,F){U.isScene!==!0&&(U=ye),he.resetTextureUnits();const oe=U.fog,xe=H.isMeshStandardMaterial?U.environment:null,Te=L===null?x.outputColorSpace:L.isXRRenderTarget===!0?L.texture.colorSpace:Wt,Me=(H.isMeshStandardMaterial?Be:Ve).get(H.envMap||xe),Fe=H.vertexColors===!0&&!!z.attributes.color&&z.attributes.color.itemSize===4,ke=!!z.attributes.tangent&&(!!H.normalMap||H.anisotropy>0),Ie=!!z.morphAttributes.position,Je=!!z.morphAttributes.normal,lt=!!z.morphAttributes.color;let yt=hi;H.toneMapped&&(L===null||L.isXRRenderTarget===!0)&&(yt=x.toneMapping);const pt=z.morphAttributes.position||z.morphAttributes.normal||z.morphAttributes.color,ut=pt!==void 0?pt.length:0,De=ie.get(H),gt=m.state.lights;if(je===!0&&($===!0||T!==M)){const kt=T===M&&H.id===b;ce.setState(H,T,kt)}let tt=!1;H.version===De.__version?(De.needsLights&&De.lightsStateVersion!==gt.state.version||De.outputColorSpace!==Te||F.isBatchedMesh&&De.batching===!1||!F.isBatchedMesh&&De.batching===!0||F.isBatchedMesh&&De.batchingColor===!0&&F.colorTexture===null||F.isBatchedMesh&&De.batchingColor===!1&&F.colorTexture!==null||F.isInstancedMesh&&De.instancing===!1||!F.isInstancedMesh&&De.instancing===!0||F.isSkinnedMesh&&De.skinning===!1||!F.isSkinnedMesh&&De.skinning===!0||F.isInstancedMesh&&De.instancingColor===!0&&F.instanceColor===null||F.isInstancedMesh&&De.instancingColor===!1&&F.instanceColor!==null||F.isInstancedMesh&&De.instancingMorph===!0&&F.morphTexture===null||F.isInstancedMesh&&De.instancingMorph===!1&&F.morphTexture!==null||De.envMap!==Me||H.fog===!0&&De.fog!==oe||De.numClippingPlanes!==void 0&&(De.numClippingPlanes!==ce.numPlanes||De.numIntersection!==ce.numIntersection)||De.vertexAlphas!==Fe||De.vertexTangents!==ke||De.morphTargets!==Ie||De.morphNormals!==Je||De.morphColors!==lt||De.toneMapping!==yt||De.morphTargetsCount!==ut)&&(tt=!0):(tt=!0,De.__version=H.version);let Zt=De.currentProgram;tt===!0&&(Zt=yr(H,U,F));let Ui=!1,Jt=!1,As=!1;const vt=Zt.getUniforms(),sn=De.uniforms;if(Y.useProgram(Zt.program)&&(Ui=!0,Jt=!0,As=!0),H.id!==b&&(b=H.id,Jt=!0),Ui||M!==T){Y.buffers.depth.getReversed()&&T.reversedDepth!==!0&&(T._reversedDepth=!0,T.updateProjectionMatrix()),vt.setValue(I,"projectionMatrix",T.projectionMatrix),vt.setValue(I,"viewMatrix",T.matrixWorldInverse);const qt=vt.map.cameraPosition;qt!==void 0&&qt.setValue(I,me.setFromMatrixPosition(T.matrixWorld)),j.logarithmicDepthBuffer&&vt.setValue(I,"logDepthBufFC",2/(Math.log(T.far+1)/Math.LN2)),(H.isMeshPhongMaterial||H.isMeshToonMaterial||H.isMeshLambertMaterial||H.isMeshBasicMaterial||H.isMeshStandardMaterial||H.isShaderMaterial)&&vt.setValue(I,"isOrthographic",T.isOrthographicCamera===!0),M!==T&&(M=T,Jt=!0,As=!0)}if(F.isSkinnedMesh){vt.setOptional(I,F,"bindMatrix"),vt.setOptional(I,F,"bindMatrixInverse");const kt=F.skeleton;kt&&(kt.boneTexture===null&&kt.computeBoneTexture(),vt.setValue(I,"boneTexture",kt.boneTexture,he))}F.isBatchedMesh&&(vt.setOptional(I,F,"batchingTexture"),vt.setValue(I,"batchingTexture",F._matricesTexture,he),vt.setOptional(I,F,"batchingIdTexture"),vt.setValue(I,"batchingIdTexture",F._indirectTexture,he),vt.setOptional(I,F,"batchingColorTexture"),F._colorsTexture!==null&&vt.setValue(I,"batchingColorTexture",F._colorsTexture,he));const rn=z.morphAttributes;if((rn.position!==void 0||rn.normal!==void 0||rn.color!==void 0)&&se.update(F,z,Zt),(Jt||De.receiveShadow!==F.receiveShadow)&&(De.receiveShadow=F.receiveShadow,vt.setValue(I,"receiveShadow",F.receiveShadow)),H.isMeshGouraudMaterial&&H.envMap!==null&&(sn.envMap.value=Me,sn.flipEnvMap.value=Me.isCubeTexture&&Me.isRenderTargetTexture===!1?-1:1),H.isMeshStandardMaterial&&H.envMap===null&&U.environment!==null&&(sn.envMapIntensity.value=U.environmentIntensity),Jt&&(vt.setValue(I,"toneMappingExposure",x.toneMappingExposure),De.needsLights&&_f(sn,As),oe&&H.fog===!0&&ee.refreshFogUniforms(sn,oe),ee.refreshMaterialUniforms(sn,H,G,K,m.state.transmissionRenderTarget[T.id]),po.upload(I,fc(De),sn,he)),H.isShaderMaterial&&H.uniformsNeedUpdate===!0&&(po.upload(I,fc(De),sn,he),H.uniformsNeedUpdate=!1),H.isSpriteMaterial&&vt.setValue(I,"center",F.center),vt.setValue(I,"modelViewMatrix",F.modelViewMatrix),vt.setValue(I,"normalMatrix",F.normalMatrix),vt.setValue(I,"modelMatrix",F.matrixWorld),H.isShaderMaterial||H.isRawShaderMaterial){const kt=H.uniformsGroups;for(let qt=0,Do=kt.length;qt<Do;qt++){const mi=kt[qt];We.update(mi,Zt),We.bind(mi,Zt)}}return Zt}function _f(T,U){T.ambientLightColor.needsUpdate=U,T.lightProbe.needsUpdate=U,T.directionalLights.needsUpdate=U,T.directionalLightShadows.needsUpdate=U,T.pointLights.needsUpdate=U,T.pointLightShadows.needsUpdate=U,T.spotLights.needsUpdate=U,T.spotLightShadows.needsUpdate=U,T.rectAreaLights.needsUpdate=U,T.hemisphereLights.needsUpdate=U}function yf(T){return T.isMeshLambertMaterial||T.isMeshToonMaterial||T.isMeshPhongMaterial||T.isMeshStandardMaterial||T.isShadowMaterial||T.isShaderMaterial&&T.lights===!0}this.getActiveCubeFace=function(){return A},this.getActiveMipmapLevel=function(){return R},this.getRenderTarget=function(){return L},this.setRenderTargetTextures=function(T,U,z){const H=ie.get(T);H.__autoAllocateDepthBuffer=T.resolveDepthBuffer===!1,H.__autoAllocateDepthBuffer===!1&&(H.__useRenderToTexture=!1),ie.get(T.texture).__webglTexture=U,ie.get(T.depthTexture).__webglTexture=H.__autoAllocateDepthBuffer?void 0:z,H.__hasExternalTextures=!0},this.setRenderTargetFramebuffer=function(T,U){const z=ie.get(T);z.__webglFramebuffer=U,z.__useDefaultFramebuffer=U===void 0};const Mf=I.createFramebuffer();this.setRenderTarget=function(T,U=0,z=0){L=T,A=U,R=z;let H=!0,F=null,oe=!1,xe=!1;if(T){const Me=ie.get(T);if(Me.__useDefaultFramebuffer!==void 0)Y.bindFramebuffer(I.FRAMEBUFFER,null),H=!1;else if(Me.__webglFramebuffer===void 0)he.setupRenderTarget(T);else if(Me.__hasExternalTextures)he.rebindTextures(T,ie.get(T.texture).__webglTexture,ie.get(T.depthTexture).__webglTexture);else if(T.depthBuffer){const Ie=T.depthTexture;if(Me.__boundDepthTexture!==Ie){if(Ie!==null&&ie.has(Ie)&&(T.width!==Ie.image.width||T.height!==Ie.image.height))throw new Error("WebGLRenderTarget: Attached DepthTexture is initialized to the incorrect size.");he.setupDepthRenderbuffer(T)}}const Fe=T.texture;(Fe.isData3DTexture||Fe.isDataArrayTexture||Fe.isCompressedArrayTexture)&&(xe=!0);const ke=ie.get(T).__webglFramebuffer;T.isWebGLCubeRenderTarget?(Array.isArray(ke[U])?F=ke[U][z]:F=ke[U],oe=!0):T.samples>0&&he.useMultisampledRTT(T)===!1?F=ie.get(T).__webglMultisampledFramebuffer:Array.isArray(ke)?F=ke[z]:F=ke,P.copy(T.viewport),D.copy(T.scissor),O=T.scissorTest}else P.copy(pe).multiplyScalar(G).floor(),D.copy(Ne).multiplyScalar(G).floor(),O=Xe;if(z!==0&&(F=Mf),Y.bindFramebuffer(I.FRAMEBUFFER,F)&&H&&Y.drawBuffers(T,F),Y.viewport(P),Y.scissor(D),Y.setScissorTest(O),oe){const Me=ie.get(T.texture);I.framebufferTexture2D(I.FRAMEBUFFER,I.COLOR_ATTACHMENT0,I.TEXTURE_CUBE_MAP_POSITIVE_X+U,Me.__webglTexture,z)}else if(xe){const Me=U;for(let Fe=0;Fe<T.textures.length;Fe++){const ke=ie.get(T.textures[Fe]);I.framebufferTextureLayer(I.FRAMEBUFFER,I.COLOR_ATTACHMENT0+Fe,ke.__webglTexture,z,Me)}}else if(T!==null&&z!==0){const Me=ie.get(T.texture);I.framebufferTexture2D(I.FRAMEBUFFER,I.COLOR_ATTACHMENT0,I.TEXTURE_2D,Me.__webglTexture,z)}b=-1},this.readRenderTargetPixels=function(T,U,z,H,F,oe,xe,Te=0){if(!(T&&T.isWebGLRenderTarget)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");return}let Me=ie.get(T).__webglFramebuffer;if(T.isWebGLCubeRenderTarget&&xe!==void 0&&(Me=Me[xe]),Me){Y.bindFramebuffer(I.FRAMEBUFFER,Me);try{const Fe=T.textures[Te],ke=Fe.format,Ie=Fe.type;if(!j.textureFormatReadable(ke)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.");return}if(!j.textureTypeReadable(Ie)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.");return}U>=0&&U<=T.width-H&&z>=0&&z<=T.height-F&&(T.textures.length>1&&I.readBuffer(I.COLOR_ATTACHMENT0+Te),I.readPixels(U,z,H,F,Pe.convert(ke),Pe.convert(Ie),oe))}finally{const Fe=L!==null?ie.get(L).__webglFramebuffer:null;Y.bindFramebuffer(I.FRAMEBUFFER,Fe)}}},this.readRenderTargetPixelsAsync=async function(T,U,z,H,F,oe,xe,Te=0){if(!(T&&T.isWebGLRenderTarget))throw new Error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");let Me=ie.get(T).__webglFramebuffer;if(T.isWebGLCubeRenderTarget&&xe!==void 0&&(Me=Me[xe]),Me)if(U>=0&&U<=T.width-H&&z>=0&&z<=T.height-F){Y.bindFramebuffer(I.FRAMEBUFFER,Me);const Fe=T.textures[Te],ke=Fe.format,Ie=Fe.type;if(!j.textureFormatReadable(ke))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in RGBA or implementation defined format.");if(!j.textureTypeReadable(Ie))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in UnsignedByteType or implementation defined type.");const Je=I.createBuffer();I.bindBuffer(I.PIXEL_PACK_BUFFER,Je),I.bufferData(I.PIXEL_PACK_BUFFER,oe.byteLength,I.STREAM_READ),T.textures.length>1&&I.readBuffer(I.COLOR_ATTACHMENT0+Te),I.readPixels(U,z,H,F,Pe.convert(ke),Pe.convert(Ie),0);const lt=L!==null?ie.get(L).__webglFramebuffer:null;Y.bindFramebuffer(I.FRAMEBUFFER,lt);const yt=I.fenceSync(I.SYNC_GPU_COMMANDS_COMPLETE,0);return I.flush(),await Ed(I,yt,4),I.bindBuffer(I.PIXEL_PACK_BUFFER,Je),I.getBufferSubData(I.PIXEL_PACK_BUFFER,0,oe),I.deleteBuffer(Je),I.deleteSync(yt),oe}else throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: requested read bounds are out of range.")},this.copyFramebufferToTexture=function(T,U=null,z=0){const H=Math.pow(2,-z),F=Math.floor(T.image.width*H),oe=Math.floor(T.image.height*H),xe=U!==null?U.x:0,Te=U!==null?U.y:0;he.setTexture2D(T,0),I.copyTexSubImage2D(I.TEXTURE_2D,z,0,0,xe,Te,F,oe),Y.unbindTexture()};const Sf=I.createFramebuffer(),bf=I.createFramebuffer();this.copyTextureToTexture=function(T,U,z=null,H=null,F=0,oe=null){oe===null&&(F!==0?(ur("WebGLRenderer: copyTextureToTexture function signature has changed to support src and dst mipmap levels."),oe=F,F=0):oe=0);let xe,Te,Me,Fe,ke,Ie,Je,lt,yt;const pt=T.isCompressedTexture?T.mipmaps[oe]:T.image;if(z!==null)xe=z.max.x-z.min.x,Te=z.max.y-z.min.y,Me=z.isBox3?z.max.z-z.min.z:1,Fe=z.min.x,ke=z.min.y,Ie=z.isBox3?z.min.z:0;else{const rn=Math.pow(2,-F);xe=Math.floor(pt.width*rn),Te=Math.floor(pt.height*rn),T.isDataArrayTexture?Me=pt.depth:T.isData3DTexture?Me=Math.floor(pt.depth*rn):Me=1,Fe=0,ke=0,Ie=0}H!==null?(Je=H.x,lt=H.y,yt=H.z):(Je=0,lt=0,yt=0);const ut=Pe.convert(U.format),De=Pe.convert(U.type);let gt;U.isData3DTexture?(he.setTexture3D(U,0),gt=I.TEXTURE_3D):U.isDataArrayTexture||U.isCompressedArrayTexture?(he.setTexture2DArray(U,0),gt=I.TEXTURE_2D_ARRAY):(he.setTexture2D(U,0),gt=I.TEXTURE_2D),I.pixelStorei(I.UNPACK_FLIP_Y_WEBGL,U.flipY),I.pixelStorei(I.UNPACK_PREMULTIPLY_ALPHA_WEBGL,U.premultiplyAlpha),I.pixelStorei(I.UNPACK_ALIGNMENT,U.unpackAlignment);const tt=I.getParameter(I.UNPACK_ROW_LENGTH),Zt=I.getParameter(I.UNPACK_IMAGE_HEIGHT),Ui=I.getParameter(I.UNPACK_SKIP_PIXELS),Jt=I.getParameter(I.UNPACK_SKIP_ROWS),As=I.getParameter(I.UNPACK_SKIP_IMAGES);I.pixelStorei(I.UNPACK_ROW_LENGTH,pt.width),I.pixelStorei(I.UNPACK_IMAGE_HEIGHT,pt.height),I.pixelStorei(I.UNPACK_SKIP_PIXELS,Fe),I.pixelStorei(I.UNPACK_SKIP_ROWS,ke),I.pixelStorei(I.UNPACK_SKIP_IMAGES,Ie);const vt=T.isDataArrayTexture||T.isData3DTexture,sn=U.isDataArrayTexture||U.isData3DTexture;if(T.isDepthTexture){const rn=ie.get(T),kt=ie.get(U),qt=ie.get(rn.__renderTarget),Do=ie.get(kt.__renderTarget);Y.bindFramebuffer(I.READ_FRAMEBUFFER,qt.__webglFramebuffer),Y.bindFramebuffer(I.DRAW_FRAMEBUFFER,Do.__webglFramebuffer);for(let mi=0;mi<Me;mi++)vt&&(I.framebufferTextureLayer(I.READ_FRAMEBUFFER,I.COLOR_ATTACHMENT0,ie.get(T).__webglTexture,F,Ie+mi),I.framebufferTextureLayer(I.DRAW_FRAMEBUFFER,I.COLOR_ATTACHMENT0,ie.get(U).__webglTexture,oe,yt+mi)),I.blitFramebuffer(Fe,ke,xe,Te,Je,lt,xe,Te,I.DEPTH_BUFFER_BIT,I.NEAREST);Y.bindFramebuffer(I.READ_FRAMEBUFFER,null),Y.bindFramebuffer(I.DRAW_FRAMEBUFFER,null)}else if(F!==0||T.isRenderTargetTexture||ie.has(T)){const rn=ie.get(T),kt=ie.get(U);Y.bindFramebuffer(I.READ_FRAMEBUFFER,Sf),Y.bindFramebuffer(I.DRAW_FRAMEBUFFER,bf);for(let qt=0;qt<Me;qt++)vt?I.framebufferTextureLayer(I.READ_FRAMEBUFFER,I.COLOR_ATTACHMENT0,rn.__webglTexture,F,Ie+qt):I.framebufferTexture2D(I.READ_FRAMEBUFFER,I.COLOR_ATTACHMENT0,I.TEXTURE_2D,rn.__webglTexture,F),sn?I.framebufferTextureLayer(I.DRAW_FRAMEBUFFER,I.COLOR_ATTACHMENT0,kt.__webglTexture,oe,yt+qt):I.framebufferTexture2D(I.DRAW_FRAMEBUFFER,I.COLOR_ATTACHMENT0,I.TEXTURE_2D,kt.__webglTexture,oe),F!==0?I.blitFramebuffer(Fe,ke,xe,Te,Je,lt,xe,Te,I.COLOR_BUFFER_BIT,I.NEAREST):sn?I.copyTexSubImage3D(gt,oe,Je,lt,yt+qt,Fe,ke,xe,Te):I.copyTexSubImage2D(gt,oe,Je,lt,Fe,ke,xe,Te);Y.bindFramebuffer(I.READ_FRAMEBUFFER,null),Y.bindFramebuffer(I.DRAW_FRAMEBUFFER,null)}else sn?T.isDataTexture||T.isData3DTexture?I.texSubImage3D(gt,oe,Je,lt,yt,xe,Te,Me,ut,De,pt.data):U.isCompressedArrayTexture?I.compressedTexSubImage3D(gt,oe,Je,lt,yt,xe,Te,Me,ut,pt.data):I.texSubImage3D(gt,oe,Je,lt,yt,xe,Te,Me,ut,De,pt):T.isDataTexture?I.texSubImage2D(I.TEXTURE_2D,oe,Je,lt,xe,Te,ut,De,pt.data):T.isCompressedTexture?I.compressedTexSubImage2D(I.TEXTURE_2D,oe,Je,lt,pt.width,pt.height,ut,pt.data):I.texSubImage2D(I.TEXTURE_2D,oe,Je,lt,xe,Te,ut,De,pt);I.pixelStorei(I.UNPACK_ROW_LENGTH,tt),I.pixelStorei(I.UNPACK_IMAGE_HEIGHT,Zt),I.pixelStorei(I.UNPACK_SKIP_PIXELS,Ui),I.pixelStorei(I.UNPACK_SKIP_ROWS,Jt),I.pixelStorei(I.UNPACK_SKIP_IMAGES,As),oe===0&&U.generateMipmaps&&I.generateMipmap(gt),Y.unbindTexture()},this.initRenderTarget=function(T){ie.get(T).__webglFramebuffer===void 0&&he.setupRenderTarget(T)},this.initTexture=function(T){T.isCubeTexture?he.setTextureCube(T,0):T.isData3DTexture?he.setTexture3D(T,0):T.isDataArrayTexture||T.isCompressedArrayTexture?he.setTexture2DArray(T,0):he.setTexture2D(T,0),Y.unbindTexture()},this.resetState=function(){A=0,R=0,L=null,Y.reset(),ve.reset()},typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}get coordinateSystem(){return Cn}get outputColorSpace(){return this._outputColorSpace}set outputColorSpace(e){this._outputColorSpace=e;const t=this.getContext();t.drawingBufferColorSpace=et._getDrawingBufferColorSpace(e),t.unpackColorSpace=et._getUnpackColorSpace()}}class _s{static createButton(e,t={}){const n=document.createElement("button");function i(){let c=null;async function u(d){d.addEventListener("end",h),await e.xr.setSession(d),n.textContent="EXIT VR",c=d}function h(){c.removeEventListener("end",h),n.textContent="ENTER VR",c=null}n.style.display="",n.style.cursor="pointer",n.style.left="calc(50% - 50px)",n.style.width="100px",n.textContent="ENTER VR";const f={...t,optionalFeatures:["local-floor","bounded-floor","layers",...t.optionalFeatures||[]]};n.onmouseenter=function(){n.style.opacity="1.0"},n.onmouseleave=function(){n.style.opacity="0.5"},n.onclick=function(){c===null?navigator.xr.requestSession("immersive-vr",f).then(u):(c.end(),navigator.xr.offerSession!==void 0&&navigator.xr.offerSession("immersive-vr",f).then(u).catch(d=>{console.warn(d)}))},navigator.xr.offerSession!==void 0&&navigator.xr.offerSession("immersive-vr",f).then(u).catch(d=>{console.warn(d)})}function r(){n.style.display="",n.style.cursor="auto",n.style.left="calc(50% - 75px)",n.style.width="150px",n.onmouseenter=null,n.onmouseleave=null,n.onclick=null}function o(){r(),n.textContent="VR NOT SUPPORTED"}function a(c){r(),console.warn("Exception when trying to call xr.isSessionSupported",c),n.textContent="VR NOT ALLOWED"}function l(c){c.style.position="absolute",c.style.bottom="20px",c.style.padding="12px 6px",c.style.border="1px solid #fff",c.style.borderRadius="4px",c.style.background="rgba(0,0,0,0.1)",c.style.color="#fff",c.style.font="normal 13px sans-serif",c.style.textAlign="center",c.style.opacity="0.5",c.style.outline="none",c.style.zIndex="999"}if("xr"in navigator)return n.id="VRButton",n.style.display="none",l(n),navigator.xr.isSessionSupported("immersive-vr").then(function(c){c?i():o(),c&&_s.xrSessionIsGranted&&n.click()}).catch(a),n;{const c=document.createElement("a");return window.isSecureContext===!1?(c.href=document.location.href.replace(/^http:/,"https:"),c.innerHTML="WEBXR NEEDS HTTPS"):(c.href="https://immersiveweb.dev/",c.innerHTML="WEBXR NOT AVAILABLE"),c.style.left="calc(50% - 90px)",c.style.width="180px",c.style.textDecoration="none",l(c),c}}static registerSessionGrantedListener(){if(typeof navigator<"u"&&"xr"in navigator){if(/WebXRViewer\//i.test(navigator.userAgent))return;navigator.xr.addEventListener("sessiongranted",()=>{_s.xrSessionIsGranted=!0})}}}_s.xrSessionIsGranted=!1;_s.registerSessionGrantedListener();function r_(s,e=1e-4){e=Math.max(e,Number.EPSILON);const t={},n=s.getIndex(),i=s.getAttribute("position"),r=n?n.count:i.count;let o=0;const a=Object.keys(s.attributes),l={},c={},u=[],h=["getX","getY","getZ","getW"],f=["setX","setY","setZ","setW"];for(let _=0,y=a.length;_<y;_++){const x=a[_],E=s.attributes[x];l[x]=new E.constructor(new E.array.constructor(E.count*E.itemSize),E.itemSize,E.normalized);const A=s.morphAttributes[x];A&&(c[x]||(c[x]=[]),A.forEach((R,L)=>{const b=new R.array.constructor(R.count*R.itemSize);c[x][L]=new R.constructor(b,R.itemSize,R.normalized)}))}const d=e*.5,p=Math.log10(1/e),v=Math.pow(10,p),g=d*v;for(let _=0;_<r;_++){const y=n?n.getX(_):_;let x="";for(let E=0,A=a.length;E<A;E++){const R=a[E],L=s.getAttribute(R),b=L.itemSize;for(let M=0;M<b;M++)x+=`${~~(L[h[M]](y)*v+g)},`}if(x in t)u.push(t[x]);else{for(let E=0,A=a.length;E<A;E++){const R=a[E],L=s.getAttribute(R),b=s.morphAttributes[R],M=L.itemSize,P=l[R],D=c[R];for(let O=0;O<M;O++){const V=h[O],B=f[O];if(P[B](o,L[V](y)),b)for(let W=0,K=b.length;W<K;W++)D[W][B](o,b[W][V](y))}}t[x]=o,u.push(o),o++}}const m=s.clone();for(const _ in s.attributes){const y=l[_];if(m.setAttribute(_,new y.constructor(y.array.slice(0,o*y.itemSize),y.itemSize,y.normalized)),_ in c)for(let x=0;x<c[_].length;x++){const E=c[_][x];m.morphAttributes[_][x]=new E.constructor(E.array.slice(0,o*E.itemSize),E.itemSize,E.normalized)}}return m.setIndex(u),m}function ku(s,e){if(e===Zf)return console.warn("THREE.BufferGeometryUtils.toTrianglesDrawMode(): Geometry already defined as triangles."),s;if(e===dl||e===gh){let t=s.getIndex();if(t===null){const o=[],a=s.getAttribute("position");if(a!==void 0){for(let l=0;l<a.count;l++)o.push(l);s.setIndex(o),t=s.getIndex()}else return console.error("THREE.BufferGeometryUtils.toTrianglesDrawMode(): Undefined position attribute. Processing not possible."),s}const n=t.count-2,i=[];if(e===dl)for(let o=1;o<=n;o++)i.push(t.getX(0)),i.push(t.getX(o)),i.push(t.getX(o+1));else for(let o=0;o<n;o++)o%2===0?(i.push(t.getX(o)),i.push(t.getX(o+1)),i.push(t.getX(o+2))):(i.push(t.getX(o+2)),i.push(t.getX(o+1)),i.push(t.getX(o)));i.length/3!==n&&console.error("THREE.BufferGeometryUtils.toTrianglesDrawMode(): Unable to generate correct amount of triangles.");const r=s.clone();return r.setIndex(i),r.clearGroups(),r}else return console.error("THREE.BufferGeometryUtils.toTrianglesDrawMode(): Unknown draw mode:",e),s}class o_ extends Ts{constructor(e){super(e),this.dracoLoader=null,this.ktx2Loader=null,this.meshoptDecoder=null,this.pluginCallbacks=[],this.register(function(t){return new h_(t)}),this.register(function(t){return new f_(t)}),this.register(function(t){return new M_(t)}),this.register(function(t){return new S_(t)}),this.register(function(t){return new b_(t)}),this.register(function(t){return new p_(t)}),this.register(function(t){return new m_(t)}),this.register(function(t){return new g_(t)}),this.register(function(t){return new v_(t)}),this.register(function(t){return new u_(t)}),this.register(function(t){return new x_(t)}),this.register(function(t){return new d_(t)}),this.register(function(t){return new y_(t)}),this.register(function(t){return new __(t)}),this.register(function(t){return new l_(t)}),this.register(function(t){return new T_(t)}),this.register(function(t){return new E_(t)})}load(e,t,n,i){const r=this;let o;if(this.resourcePath!=="")o=this.resourcePath;else if(this.path!==""){const c=Qs.extractUrlBase(e);o=Qs.resolveURL(c,this.path)}else o=Qs.extractUrlBase(e);this.manager.itemStart(e);const a=function(c){i?i(c):console.error(c),r.manager.itemError(e),r.manager.itemEnd(e)},l=new Xh(this.manager);l.setPath(this.path),l.setResponseType("arraybuffer"),l.setRequestHeader(this.requestHeader),l.setWithCredentials(this.withCredentials),l.load(e,function(c){try{r.parse(c,o,function(u){t(u),r.manager.itemEnd(e)},a)}catch(u){a(u)}},n,a)}setDRACOLoader(e){return this.dracoLoader=e,this}setKTX2Loader(e){return this.ktx2Loader=e,this}setMeshoptDecoder(e){return this.meshoptDecoder=e,this}register(e){return this.pluginCallbacks.indexOf(e)===-1&&this.pluginCallbacks.push(e),this}unregister(e){return this.pluginCallbacks.indexOf(e)!==-1&&this.pluginCallbacks.splice(this.pluginCallbacks.indexOf(e),1),this}parse(e,t,n,i){let r;const o={},a={},l=new TextDecoder;if(typeof e=="string")r=JSON.parse(e);else if(e instanceof ArrayBuffer)if(l.decode(new Uint8Array(e,0,4))===Zh){try{o[Ze.KHR_BINARY_GLTF]=new w_(e)}catch(h){i&&i(h);return}r=JSON.parse(o[Ze.KHR_BINARY_GLTF].content)}else r=JSON.parse(l.decode(e));else r=e;if(r.asset===void 0||r.asset.version[0]<2){i&&i(new Error("THREE.GLTFLoader: Unsupported asset. glTF versions >=2.0 are supported."));return}const c=new B_(r,{path:t||this.resourcePath||"",crossOrigin:this.crossOrigin,requestHeader:this.requestHeader,manager:this.manager,ktx2Loader:this.ktx2Loader,meshoptDecoder:this.meshoptDecoder});c.fileLoader.setRequestHeader(this.requestHeader);for(let u=0;u<this.pluginCallbacks.length;u++){const h=this.pluginCallbacks[u](c);h.name||console.error("THREE.GLTFLoader: Invalid plugin found: missing name"),a[h.name]=h,o[h.name]=!0}if(r.extensionsUsed)for(let u=0;u<r.extensionsUsed.length;++u){const h=r.extensionsUsed[u],f=r.extensionsRequired||[];switch(h){case Ze.KHR_MATERIALS_UNLIT:o[h]=new c_;break;case Ze.KHR_DRACO_MESH_COMPRESSION:o[h]=new A_(r,this.dracoLoader);break;case Ze.KHR_TEXTURE_TRANSFORM:o[h]=new R_;break;case Ze.KHR_MESH_QUANTIZATION:o[h]=new C_;break;default:f.indexOf(h)>=0&&a[h]===void 0&&console.warn('THREE.GLTFLoader: Unknown extension "'+h+'".')}}c.setExtensions(o),c.setPlugins(a),c.parse(n,i)}parseAsync(e,t){const n=this;return new Promise(function(i,r){n.parse(e,t,i,r)})}}function a_(){let s={};return{get:function(e){return s[e]},add:function(e,t){s[e]=t},remove:function(e){delete s[e]},removeAll:function(){s={}}}}const Ze={KHR_BINARY_GLTF:"KHR_binary_glTF",KHR_DRACO_MESH_COMPRESSION:"KHR_draco_mesh_compression",KHR_LIGHTS_PUNCTUAL:"KHR_lights_punctual",KHR_MATERIALS_CLEARCOAT:"KHR_materials_clearcoat",KHR_MATERIALS_DISPERSION:"KHR_materials_dispersion",KHR_MATERIALS_IOR:"KHR_materials_ior",KHR_MATERIALS_SHEEN:"KHR_materials_sheen",KHR_MATERIALS_SPECULAR:"KHR_materials_specular",KHR_MATERIALS_TRANSMISSION:"KHR_materials_transmission",KHR_MATERIALS_IRIDESCENCE:"KHR_materials_iridescence",KHR_MATERIALS_ANISOTROPY:"KHR_materials_anisotropy",KHR_MATERIALS_UNLIT:"KHR_materials_unlit",KHR_MATERIALS_VOLUME:"KHR_materials_volume",KHR_TEXTURE_BASISU:"KHR_texture_basisu",KHR_TEXTURE_TRANSFORM:"KHR_texture_transform",KHR_MESH_QUANTIZATION:"KHR_mesh_quantization",KHR_MATERIALS_EMISSIVE_STRENGTH:"KHR_materials_emissive_strength",EXT_MATERIALS_BUMP:"EXT_materials_bump",EXT_TEXTURE_WEBP:"EXT_texture_webp",EXT_TEXTURE_AVIF:"EXT_texture_avif",EXT_MESHOPT_COMPRESSION:"EXT_meshopt_compression",EXT_MESH_GPU_INSTANCING:"EXT_mesh_gpu_instancing"};class l_{constructor(e){this.parser=e,this.name=Ze.KHR_LIGHTS_PUNCTUAL,this.cache={refs:{},uses:{}}}_markDefs(){const e=this.parser,t=this.parser.json.nodes||[];for(let n=0,i=t.length;n<i;n++){const r=t[n];r.extensions&&r.extensions[this.name]&&r.extensions[this.name].light!==void 0&&e._addNodeRef(this.cache,r.extensions[this.name].light)}}_loadLight(e){const t=this.parser,n="light:"+e;let i=t.cache.get(n);if(i)return i;const r=t.json,l=((r.extensions&&r.extensions[this.name]||{}).lights||[])[e];let c;const u=new Ue(16777215);l.color!==void 0&&u.setRGB(l.color[0],l.color[1],l.color[2],Wt);const h=l.range!==void 0?l.range:0;switch(l.type){case"directional":c=new cm(u),c.target.position.set(0,0,-1),c.add(c.target);break;case"point":c=new am(u),c.distance=h;break;case"spot":c=new rm(u),c.distance=h,l.spot=l.spot||{},l.spot.innerConeAngle=l.spot.innerConeAngle!==void 0?l.spot.innerConeAngle:0,l.spot.outerConeAngle=l.spot.outerConeAngle!==void 0?l.spot.outerConeAngle:Math.PI/4,c.angle=l.spot.outerConeAngle,c.penumbra=1-l.spot.innerConeAngle/l.spot.outerConeAngle,c.target.position.set(0,0,-1),c.add(c.target);break;default:throw new Error("THREE.GLTFLoader: Unexpected light type: "+l.type)}return c.position.set(0,0,0),Tn(c,l),l.intensity!==void 0&&(c.intensity=l.intensity),c.name=t.createUniqueName(l.name||"light_"+e),i=Promise.resolve(c),t.cache.add(n,i),i}getDependency(e,t){if(e==="light")return this._loadLight(t)}createNodeAttachment(e){const t=this,n=this.parser,r=n.json.nodes[e],a=(r.extensions&&r.extensions[this.name]||{}).light;return a===void 0?null:this._loadLight(a).then(function(l){return n._getNodeRef(t.cache,a,l)})}}class c_{constructor(){this.name=Ze.KHR_MATERIALS_UNLIT}getMaterialType(){return Kt}extendParams(e,t,n){const i=[];e.color=new Ue(1,1,1),e.opacity=1;const r=t.pbrMetallicRoughness;if(r){if(Array.isArray(r.baseColorFactor)){const o=r.baseColorFactor;e.color.setRGB(o[0],o[1],o[2],Wt),e.opacity=o[3]}r.baseColorTexture!==void 0&&i.push(n.assignTexture(e,"map",r.baseColorTexture,St))}return Promise.all(i)}}class u_{constructor(e){this.parser=e,this.name=Ze.KHR_MATERIALS_EMISSIVE_STRENGTH}extendMaterialParams(e,t){const i=this.parser.json.materials[e];if(!i.extensions||!i.extensions[this.name])return Promise.resolve();const r=i.extensions[this.name].emissiveStrength;return r!==void 0&&(t.emissiveIntensity=r),Promise.resolve()}}class h_{constructor(e){this.parser=e,this.name=Ze.KHR_MATERIALS_CLEARCOAT}getMaterialType(e){const n=this.parser.json.materials[e];return!n.extensions||!n.extensions[this.name]?null:Nn}extendMaterialParams(e,t){const n=this.parser,i=n.json.materials[e];if(!i.extensions||!i.extensions[this.name])return Promise.resolve();const r=[],o=i.extensions[this.name];if(o.clearcoatFactor!==void 0&&(t.clearcoat=o.clearcoatFactor),o.clearcoatTexture!==void 0&&r.push(n.assignTexture(t,"clearcoatMap",o.clearcoatTexture)),o.clearcoatRoughnessFactor!==void 0&&(t.clearcoatRoughness=o.clearcoatRoughnessFactor),o.clearcoatRoughnessTexture!==void 0&&r.push(n.assignTexture(t,"clearcoatRoughnessMap",o.clearcoatRoughnessTexture)),o.clearcoatNormalTexture!==void 0&&(r.push(n.assignTexture(t,"clearcoatNormalMap",o.clearcoatNormalTexture)),o.clearcoatNormalTexture.scale!==void 0)){const a=o.clearcoatNormalTexture.scale;t.clearcoatNormalScale=new ne(a,a)}return Promise.all(r)}}class f_{constructor(e){this.parser=e,this.name=Ze.KHR_MATERIALS_DISPERSION}getMaterialType(e){const n=this.parser.json.materials[e];return!n.extensions||!n.extensions[this.name]?null:Nn}extendMaterialParams(e,t){const i=this.parser.json.materials[e];if(!i.extensions||!i.extensions[this.name])return Promise.resolve();const r=i.extensions[this.name];return t.dispersion=r.dispersion!==void 0?r.dispersion:0,Promise.resolve()}}class d_{constructor(e){this.parser=e,this.name=Ze.KHR_MATERIALS_IRIDESCENCE}getMaterialType(e){const n=this.parser.json.materials[e];return!n.extensions||!n.extensions[this.name]?null:Nn}extendMaterialParams(e,t){const n=this.parser,i=n.json.materials[e];if(!i.extensions||!i.extensions[this.name])return Promise.resolve();const r=[],o=i.extensions[this.name];return o.iridescenceFactor!==void 0&&(t.iridescence=o.iridescenceFactor),o.iridescenceTexture!==void 0&&r.push(n.assignTexture(t,"iridescenceMap",o.iridescenceTexture)),o.iridescenceIor!==void 0&&(t.iridescenceIOR=o.iridescenceIor),t.iridescenceThicknessRange===void 0&&(t.iridescenceThicknessRange=[100,400]),o.iridescenceThicknessMinimum!==void 0&&(t.iridescenceThicknessRange[0]=o.iridescenceThicknessMinimum),o.iridescenceThicknessMaximum!==void 0&&(t.iridescenceThicknessRange[1]=o.iridescenceThicknessMaximum),o.iridescenceThicknessTexture!==void 0&&r.push(n.assignTexture(t,"iridescenceThicknessMap",o.iridescenceThicknessTexture)),Promise.all(r)}}class p_{constructor(e){this.parser=e,this.name=Ze.KHR_MATERIALS_SHEEN}getMaterialType(e){const n=this.parser.json.materials[e];return!n.extensions||!n.extensions[this.name]?null:Nn}extendMaterialParams(e,t){const n=this.parser,i=n.json.materials[e];if(!i.extensions||!i.extensions[this.name])return Promise.resolve();const r=[];t.sheenColor=new Ue(0,0,0),t.sheenRoughness=0,t.sheen=1;const o=i.extensions[this.name];if(o.sheenColorFactor!==void 0){const a=o.sheenColorFactor;t.sheenColor.setRGB(a[0],a[1],a[2],Wt)}return o.sheenRoughnessFactor!==void 0&&(t.sheenRoughness=o.sheenRoughnessFactor),o.sheenColorTexture!==void 0&&r.push(n.assignTexture(t,"sheenColorMap",o.sheenColorTexture,St)),o.sheenRoughnessTexture!==void 0&&r.push(n.assignTexture(t,"sheenRoughnessMap",o.sheenRoughnessTexture)),Promise.all(r)}}class m_{constructor(e){this.parser=e,this.name=Ze.KHR_MATERIALS_TRANSMISSION}getMaterialType(e){const n=this.parser.json.materials[e];return!n.extensions||!n.extensions[this.name]?null:Nn}extendMaterialParams(e,t){const n=this.parser,i=n.json.materials[e];if(!i.extensions||!i.extensions[this.name])return Promise.resolve();const r=[],o=i.extensions[this.name];return o.transmissionFactor!==void 0&&(t.transmission=o.transmissionFactor),o.transmissionTexture!==void 0&&r.push(n.assignTexture(t,"transmissionMap",o.transmissionTexture)),Promise.all(r)}}class g_{constructor(e){this.parser=e,this.name=Ze.KHR_MATERIALS_VOLUME}getMaterialType(e){const n=this.parser.json.materials[e];return!n.extensions||!n.extensions[this.name]?null:Nn}extendMaterialParams(e,t){const n=this.parser,i=n.json.materials[e];if(!i.extensions||!i.extensions[this.name])return Promise.resolve();const r=[],o=i.extensions[this.name];t.thickness=o.thicknessFactor!==void 0?o.thicknessFactor:0,o.thicknessTexture!==void 0&&r.push(n.assignTexture(t,"thicknessMap",o.thicknessTexture)),t.attenuationDistance=o.attenuationDistance||1/0;const a=o.attenuationColor||[1,1,1];return t.attenuationColor=new Ue().setRGB(a[0],a[1],a[2],Wt),Promise.all(r)}}class v_{constructor(e){this.parser=e,this.name=Ze.KHR_MATERIALS_IOR}getMaterialType(e){const n=this.parser.json.materials[e];return!n.extensions||!n.extensions[this.name]?null:Nn}extendMaterialParams(e,t){const i=this.parser.json.materials[e];if(!i.extensions||!i.extensions[this.name])return Promise.resolve();const r=i.extensions[this.name];return t.ior=r.ior!==void 0?r.ior:1.5,Promise.resolve()}}class x_{constructor(e){this.parser=e,this.name=Ze.KHR_MATERIALS_SPECULAR}getMaterialType(e){const n=this.parser.json.materials[e];return!n.extensions||!n.extensions[this.name]?null:Nn}extendMaterialParams(e,t){const n=this.parser,i=n.json.materials[e];if(!i.extensions||!i.extensions[this.name])return Promise.resolve();const r=[],o=i.extensions[this.name];t.specularIntensity=o.specularFactor!==void 0?o.specularFactor:1,o.specularTexture!==void 0&&r.push(n.assignTexture(t,"specularIntensityMap",o.specularTexture));const a=o.specularColorFactor||[1,1,1];return t.specularColor=new Ue().setRGB(a[0],a[1],a[2],Wt),o.specularColorTexture!==void 0&&r.push(n.assignTexture(t,"specularColorMap",o.specularColorTexture,St)),Promise.all(r)}}class __{constructor(e){this.parser=e,this.name=Ze.EXT_MATERIALS_BUMP}getMaterialType(e){const n=this.parser.json.materials[e];return!n.extensions||!n.extensions[this.name]?null:Nn}extendMaterialParams(e,t){const n=this.parser,i=n.json.materials[e];if(!i.extensions||!i.extensions[this.name])return Promise.resolve();const r=[],o=i.extensions[this.name];return t.bumpScale=o.bumpFactor!==void 0?o.bumpFactor:1,o.bumpTexture!==void 0&&r.push(n.assignTexture(t,"bumpMap",o.bumpTexture)),Promise.all(r)}}class y_{constructor(e){this.parser=e,this.name=Ze.KHR_MATERIALS_ANISOTROPY}getMaterialType(e){const n=this.parser.json.materials[e];return!n.extensions||!n.extensions[this.name]?null:Nn}extendMaterialParams(e,t){const n=this.parser,i=n.json.materials[e];if(!i.extensions||!i.extensions[this.name])return Promise.resolve();const r=[],o=i.extensions[this.name];return o.anisotropyStrength!==void 0&&(t.anisotropy=o.anisotropyStrength),o.anisotropyRotation!==void 0&&(t.anisotropyRotation=o.anisotropyRotation),o.anisotropyTexture!==void 0&&r.push(n.assignTexture(t,"anisotropyMap",o.anisotropyTexture)),Promise.all(r)}}class M_{constructor(e){this.parser=e,this.name=Ze.KHR_TEXTURE_BASISU}loadTexture(e){const t=this.parser,n=t.json,i=n.textures[e];if(!i.extensions||!i.extensions[this.name])return null;const r=i.extensions[this.name],o=t.options.ktx2Loader;if(!o){if(n.extensionsRequired&&n.extensionsRequired.indexOf(this.name)>=0)throw new Error("THREE.GLTFLoader: setKTX2Loader must be called before loading KTX2 textures");return null}return t.loadTextureImage(e,r.source,o)}}class S_{constructor(e){this.parser=e,this.name=Ze.EXT_TEXTURE_WEBP}loadTexture(e){const t=this.name,n=this.parser,i=n.json,r=i.textures[e];if(!r.extensions||!r.extensions[t])return null;const o=r.extensions[t],a=i.images[o.source];let l=n.textureLoader;if(a.uri){const c=n.options.manager.getHandler(a.uri);c!==null&&(l=c)}return n.loadTextureImage(e,o.source,l)}}class b_{constructor(e){this.parser=e,this.name=Ze.EXT_TEXTURE_AVIF}loadTexture(e){const t=this.name,n=this.parser,i=n.json,r=i.textures[e];if(!r.extensions||!r.extensions[t])return null;const o=r.extensions[t],a=i.images[o.source];let l=n.textureLoader;if(a.uri){const c=n.options.manager.getHandler(a.uri);c!==null&&(l=c)}return n.loadTextureImage(e,o.source,l)}}class T_{constructor(e){this.name=Ze.EXT_MESHOPT_COMPRESSION,this.parser=e}loadBufferView(e){const t=this.parser.json,n=t.bufferViews[e];if(n.extensions&&n.extensions[this.name]){const i=n.extensions[this.name],r=this.parser.getDependency("buffer",i.buffer),o=this.parser.options.meshoptDecoder;if(!o||!o.supported){if(t.extensionsRequired&&t.extensionsRequired.indexOf(this.name)>=0)throw new Error("THREE.GLTFLoader: setMeshoptDecoder must be called before loading compressed files");return null}return r.then(function(a){const l=i.byteOffset||0,c=i.byteLength||0,u=i.count,h=i.byteStride,f=new Uint8Array(a,l,c);return o.decodeGltfBufferAsync?o.decodeGltfBufferAsync(u,h,f,i.mode,i.filter).then(function(d){return d.buffer}):o.ready.then(function(){const d=new ArrayBuffer(u*h);return o.decodeGltfBuffer(new Uint8Array(d),u,h,f,i.mode,i.filter),d})})}else return null}}class E_{constructor(e){this.name=Ze.EXT_MESH_GPU_INSTANCING,this.parser=e}createNodeMesh(e){const t=this.parser.json,n=t.nodes[e];if(!n.extensions||!n.extensions[this.name]||n.mesh===void 0)return null;const i=t.meshes[n.mesh];for(const c of i.primitives)if(c.mode!==ln.TRIANGLES&&c.mode!==ln.TRIANGLE_STRIP&&c.mode!==ln.TRIANGLE_FAN&&c.mode!==void 0)return null;const o=n.extensions[this.name].attributes,a=[],l={};for(const c in o)a.push(this.parser.getDependency("accessor",o[c]).then(u=>(l[c]=u,l[c])));return a.length<1?null:(a.push(this.parser.createNodeMesh(e)),Promise.all(a).then(c=>{const u=c.pop(),h=u.isGroup?u.children:[u],f=c[0].count,d=[];for(const p of h){const v=new Le,g=new w,m=new Yt,_=new w(1,1,1),y=new ip(p.geometry,p.material,f);for(let x=0;x<f;x++)l.TRANSLATION&&g.fromBufferAttribute(l.TRANSLATION,x),l.ROTATION&&m.fromBufferAttribute(l.ROTATION,x),l.SCALE&&_.fromBufferAttribute(l.SCALE,x),y.setMatrixAt(x,v.compose(g,m,_));for(const x in l)if(x==="_COLOR_0"){const E=l[x];y.instanceColor=new gl(E.array,E.itemSize,E.normalized)}else x!=="TRANSLATION"&&x!=="ROTATION"&&x!=="SCALE"&&p.geometry.setAttribute(x,l[x]);dt.prototype.copy.call(y,p),this.parser.assignFinalMaterial(y),d.push(y)}return u.isGroup?(u.clear(),u.add(...d),u):d[0]}))}}const Zh="glTF",Bs=12,Bu={JSON:1313821514,BIN:5130562};class w_{constructor(e){this.name=Ze.KHR_BINARY_GLTF,this.content=null,this.body=null;const t=new DataView(e,0,Bs),n=new TextDecoder;if(this.header={magic:n.decode(new Uint8Array(e.slice(0,4))),version:t.getUint32(4,!0),length:t.getUint32(8,!0)},this.header.magic!==Zh)throw new Error("THREE.GLTFLoader: Unsupported glTF-Binary header.");if(this.header.version<2)throw new Error("THREE.GLTFLoader: Legacy binary file detected.");const i=this.header.length-Bs,r=new DataView(e,Bs);let o=0;for(;o<i;){const a=r.getUint32(o,!0);o+=4;const l=r.getUint32(o,!0);if(o+=4,l===Bu.JSON){const c=new Uint8Array(e,Bs+o,a);this.content=n.decode(c)}else if(l===Bu.BIN){const c=Bs+o;this.body=e.slice(c,c+a)}o+=a}if(this.content===null)throw new Error("THREE.GLTFLoader: JSON content not found.")}}class A_{constructor(e,t){if(!t)throw new Error("THREE.GLTFLoader: No DRACOLoader instance provided.");this.name=Ze.KHR_DRACO_MESH_COMPRESSION,this.json=e,this.dracoLoader=t,this.dracoLoader.preload()}decodePrimitive(e,t){const n=this.json,i=this.dracoLoader,r=e.extensions[this.name].bufferView,o=e.extensions[this.name].attributes,a={},l={},c={};for(const u in o){const h=bl[u]||u.toLowerCase();a[h]=o[u]}for(const u in e.attributes){const h=bl[u]||u.toLowerCase();if(o[u]!==void 0){const f=n.accessors[e.attributes[u]],d=ls[f.componentType];c[h]=d.name,l[h]=f.normalized===!0}}return t.getDependency("bufferView",r).then(function(u){return new Promise(function(h,f){i.decodeDracoFile(u,function(d){for(const p in d.attributes){const v=d.attributes[p],g=l[p];g!==void 0&&(v.normalized=g)}h(d)},a,c,Wt,f)})})}}class R_{constructor(){this.name=Ze.KHR_TEXTURE_TRANSFORM}extendTexture(e,t){return(t.texCoord===void 0||t.texCoord===e.channel)&&t.offset===void 0&&t.rotation===void 0&&t.scale===void 0||(e=e.clone(),t.texCoord!==void 0&&(e.channel=t.texCoord),t.offset!==void 0&&e.offset.fromArray(t.offset),t.rotation!==void 0&&(e.rotation=t.rotation),t.scale!==void 0&&e.repeat.fromArray(t.scale),e.needsUpdate=!0),e}}class C_{constructor(){this.name=Ze.KHR_MESH_QUANTIZATION}}class Jh extends xr{constructor(e,t,n,i){super(e,t,n,i)}copySampleValue_(e){const t=this.resultBuffer,n=this.sampleValues,i=this.valueSize,r=e*i*3+i;for(let o=0;o!==i;o++)t[o]=n[r+o];return t}interpolate_(e,t,n,i){const r=this.resultBuffer,o=this.sampleValues,a=this.valueSize,l=a*2,c=a*3,u=i-t,h=(n-t)/u,f=h*h,d=f*h,p=e*c,v=p-c,g=-2*d+3*f,m=d-f,_=1-g,y=m-f+h;for(let x=0;x!==a;x++){const E=o[v+x+a],A=o[v+x+l]*u,R=o[p+x+a],L=o[p+x]*u;r[x]=_*E+y*A+g*R+m*L}return r}}const P_=new Yt;class L_ extends Jh{interpolate_(e,t,n,i){const r=super.interpolate_(e,t,n,i);return P_.fromArray(r).normalize().toArray(r),r}}const ln={POINTS:0,LINES:1,LINE_LOOP:2,LINE_STRIP:3,TRIANGLES:4,TRIANGLE_STRIP:5,TRIANGLE_FAN:6},ls={5120:Int8Array,5121:Uint8Array,5122:Int16Array,5123:Uint16Array,5125:Uint32Array,5126:Float32Array},zu={9728:Vt,9729:_t,9984:lh,9985:oo,9986:Xs,9987:tn},Hu={33071:qn,33648:vo,10497:Pi},_a={SCALAR:1,VEC2:2,VEC3:3,VEC4:4,MAT2:4,MAT3:9,MAT4:16},bl={POSITION:"position",NORMAL:"normal",TANGENT:"tangent",TEXCOORD_0:"uv",TEXCOORD_1:"uv1",TEXCOORD_2:"uv2",TEXCOORD_3:"uv3",COLOR_0:"color",WEIGHTS_0:"skinWeight",JOINTS_0:"skinIndex"},oi={scale:"scale",translation:"position",rotation:"quaternion",weights:"morphTargetInfluences"},I_={CUBICSPLINE:void 0,LINEAR:lr,STEP:ar},ya={OPAQUE:"OPAQUE",MASK:"MASK",BLEND:"BLEND"};function D_(s){return s.DefaultMaterial===void 0&&(s.DefaultMaterial=new Zl({color:16777215,emissive:0,metalness:1,roughness:1,transparent:!1,depthTest:!0,side:Yn})),s.DefaultMaterial}function Si(s,e,t){for(const n in t.extensions)s[n]===void 0&&(e.userData.gltfExtensions=e.userData.gltfExtensions||{},e.userData.gltfExtensions[n]=t.extensions[n])}function Tn(s,e){e.extras!==void 0&&(typeof e.extras=="object"?Object.assign(s.userData,e.extras):console.warn("THREE.GLTFLoader: Ignoring primitive type .extras, "+e.extras))}function N_(s,e,t){let n=!1,i=!1,r=!1;for(let c=0,u=e.length;c<u;c++){const h=e[c];if(h.POSITION!==void 0&&(n=!0),h.NORMAL!==void 0&&(i=!0),h.COLOR_0!==void 0&&(r=!0),n&&i&&r)break}if(!n&&!i&&!r)return Promise.resolve(s);const o=[],a=[],l=[];for(let c=0,u=e.length;c<u;c++){const h=e[c];if(n){const f=h.POSITION!==void 0?t.getDependency("accessor",h.POSITION):s.attributes.position;o.push(f)}if(i){const f=h.NORMAL!==void 0?t.getDependency("accessor",h.NORMAL):s.attributes.normal;a.push(f)}if(r){const f=h.COLOR_0!==void 0?t.getDependency("accessor",h.COLOR_0):s.attributes.color;l.push(f)}}return Promise.all([Promise.all(o),Promise.all(a),Promise.all(l)]).then(function(c){const u=c[0],h=c[1],f=c[2];return n&&(s.morphAttributes.position=u),i&&(s.morphAttributes.normal=h),r&&(s.morphAttributes.color=f),s.morphTargetsRelative=!0,s})}function U_(s,e){if(s.updateMorphTargets(),e.weights!==void 0)for(let t=0,n=e.weights.length;t<n;t++)s.morphTargetInfluences[t]=e.weights[t];if(e.extras&&Array.isArray(e.extras.targetNames)){const t=e.extras.targetNames;if(s.morphTargetInfluences.length===t.length){s.morphTargetDictionary={};for(let n=0,i=t.length;n<i;n++)s.morphTargetDictionary[t[n]]=n}else console.warn("THREE.GLTFLoader: Invalid extras.targetNames length. Ignoring names.")}}function F_(s){let e;const t=s.extensions&&s.extensions[Ze.KHR_DRACO_MESH_COMPRESSION];if(t?e="draco:"+t.bufferView+":"+t.indices+":"+Ma(t.attributes):e=s.indices+":"+Ma(s.attributes)+":"+s.mode,s.targets!==void 0)for(let n=0,i=s.targets.length;n<i;n++)e+=":"+Ma(s.targets[n]);return e}function Ma(s){let e="";const t=Object.keys(s).sort();for(let n=0,i=t.length;n<i;n++)e+=t[n]+":"+s[t[n]]+";";return e}function Tl(s){switch(s){case Int8Array:return 1/127;case Uint8Array:return 1/255;case Int16Array:return 1/32767;case Uint16Array:return 1/65535;default:throw new Error("THREE.GLTFLoader: Unsupported normalized accessor component type.")}}function O_(s){return s.search(/\.jpe?g($|\?)/i)>0||s.search(/^data\:image\/jpeg/)===0?"image/jpeg":s.search(/\.webp($|\?)/i)>0||s.search(/^data\:image\/webp/)===0?"image/webp":s.search(/\.ktx2($|\?)/i)>0||s.search(/^data\:image\/ktx2/)===0?"image/ktx2":"image/png"}const k_=new Le;class B_{constructor(e={},t={}){this.json=e,this.extensions={},this.plugins={},this.options=t,this.cache=new a_,this.associations=new Map,this.primitiveCache={},this.nodeCache={},this.meshCache={refs:{},uses:{}},this.cameraCache={refs:{},uses:{}},this.lightCache={refs:{},uses:{}},this.sourceCache={},this.textureCache={},this.nodeNamesUsed={};let n=!1,i=-1,r=!1,o=-1;if(typeof navigator<"u"){const a=navigator.userAgent;n=/^((?!chrome|android).)*safari/i.test(a)===!0;const l=a.match(/Version\/(\d+)/);i=n&&l?parseInt(l[1],10):-1,r=a.indexOf("Firefox")>-1,o=r?a.match(/Firefox\/([0-9]+)\./)[1]:-1}typeof createImageBitmap>"u"||n&&i<17||r&&o<98?this.textureLoader=new im(this.options.manager):this.textureLoader=new um(this.options.manager),this.textureLoader.setCrossOrigin(this.options.crossOrigin),this.textureLoader.setRequestHeader(this.options.requestHeader),this.fileLoader=new Xh(this.options.manager),this.fileLoader.setResponseType("arraybuffer"),this.options.crossOrigin==="use-credentials"&&this.fileLoader.setWithCredentials(!0)}setExtensions(e){this.extensions=e}setPlugins(e){this.plugins=e}parse(e,t){const n=this,i=this.json,r=this.extensions;this.cache.removeAll(),this.nodeCache={},this._invokeAll(function(o){return o._markDefs&&o._markDefs()}),Promise.all(this._invokeAll(function(o){return o.beforeRoot&&o.beforeRoot()})).then(function(){return Promise.all([n.getDependencies("scene"),n.getDependencies("animation"),n.getDependencies("camera")])}).then(function(o){const a={scene:o[0][i.scene||0],scenes:o[0],animations:o[1],cameras:o[2],asset:i.asset,parser:n,userData:{}};return Si(r,a,i),Tn(a,i),Promise.all(n._invokeAll(function(l){return l.afterRoot&&l.afterRoot(a)})).then(function(){for(const l of a.scenes)l.updateMatrixWorld();e(a)})}).catch(t)}_markDefs(){const e=this.json.nodes||[],t=this.json.skins||[],n=this.json.meshes||[];for(let i=0,r=t.length;i<r;i++){const o=t[i].joints;for(let a=0,l=o.length;a<l;a++)e[o[a]].isBone=!0}for(let i=0,r=e.length;i<r;i++){const o=e[i];o.mesh!==void 0&&(this._addNodeRef(this.meshCache,o.mesh),o.skin!==void 0&&(n[o.mesh].isSkinnedMesh=!0)),o.camera!==void 0&&this._addNodeRef(this.cameraCache,o.camera)}}_addNodeRef(e,t){t!==void 0&&(e.refs[t]===void 0&&(e.refs[t]=e.uses[t]=0),e.refs[t]++)}_getNodeRef(e,t,n){if(e.refs[t]<=1)return n;const i=n.clone(),r=(o,a)=>{const l=this.associations.get(o);l!=null&&this.associations.set(a,l);for(const[c,u]of o.children.entries())r(u,a.children[c])};return r(n,i),i.name+="_instance_"+e.uses[t]++,i}_invokeOne(e){const t=Object.values(this.plugins);t.push(this);for(let n=0;n<t.length;n++){const i=e(t[n]);if(i)return i}return null}_invokeAll(e){const t=Object.values(this.plugins);t.unshift(this);const n=[];for(let i=0;i<t.length;i++){const r=e(t[i]);r&&n.push(r)}return n}getDependency(e,t){const n=e+":"+t;let i=this.cache.get(n);if(!i){switch(e){case"scene":i=this.loadScene(t);break;case"node":i=this._invokeOne(function(r){return r.loadNode&&r.loadNode(t)});break;case"mesh":i=this._invokeOne(function(r){return r.loadMesh&&r.loadMesh(t)});break;case"accessor":i=this.loadAccessor(t);break;case"bufferView":i=this._invokeOne(function(r){return r.loadBufferView&&r.loadBufferView(t)});break;case"buffer":i=this.loadBuffer(t);break;case"material":i=this._invokeOne(function(r){return r.loadMaterial&&r.loadMaterial(t)});break;case"texture":i=this._invokeOne(function(r){return r.loadTexture&&r.loadTexture(t)});break;case"skin":i=this.loadSkin(t);break;case"animation":i=this._invokeOne(function(r){return r.loadAnimation&&r.loadAnimation(t)});break;case"camera":i=this.loadCamera(t);break;default:if(i=this._invokeOne(function(r){return r!=this&&r.getDependency&&r.getDependency(e,t)}),!i)throw new Error("Unknown type: "+e);break}this.cache.add(n,i)}return i}getDependencies(e){let t=this.cache.get(e);if(!t){const n=this,i=this.json[e+(e==="mesh"?"es":"s")]||[];t=Promise.all(i.map(function(r,o){return n.getDependency(e,o)})),this.cache.add(e,t)}return t}loadBuffer(e){const t=this.json.buffers[e],n=this.fileLoader;if(t.type&&t.type!=="arraybuffer")throw new Error("THREE.GLTFLoader: "+t.type+" buffer type is not supported.");if(t.uri===void 0&&e===0)return Promise.resolve(this.extensions[Ze.KHR_BINARY_GLTF].body);const i=this.options;return new Promise(function(r,o){n.load(Qs.resolveURL(t.uri,i.path),r,void 0,function(){o(new Error('THREE.GLTFLoader: Failed to load buffer "'+t.uri+'".'))})})}loadBufferView(e){const t=this.json.bufferViews[e];return this.getDependency("buffer",t.buffer).then(function(n){const i=t.byteLength||0,r=t.byteOffset||0;return n.slice(r,r+i)})}loadAccessor(e){const t=this,n=this.json,i=this.json.accessors[e];if(i.bufferView===void 0&&i.sparse===void 0){const o=_a[i.type],a=ls[i.componentType],l=i.normalized===!0,c=new a(i.count*o);return Promise.resolve(new Gt(c,o,l))}const r=[];return i.bufferView!==void 0?r.push(this.getDependency("bufferView",i.bufferView)):r.push(null),i.sparse!==void 0&&(r.push(this.getDependency("bufferView",i.sparse.indices.bufferView)),r.push(this.getDependency("bufferView",i.sparse.values.bufferView))),Promise.all(r).then(function(o){const a=o[0],l=_a[i.type],c=ls[i.componentType],u=c.BYTES_PER_ELEMENT,h=u*l,f=i.byteOffset||0,d=i.bufferView!==void 0?n.bufferViews[i.bufferView].byteStride:void 0,p=i.normalized===!0;let v,g;if(d&&d!==h){const m=Math.floor(f/d),_="InterleavedBuffer:"+i.bufferView+":"+i.componentType+":"+m+":"+i.count;let y=t.cache.get(_);y||(v=new c(a,m*d,i.count*d/u),y=new Ah(v,d/u),t.cache.add(_,y)),g=new hr(y,l,f%d/u,p)}else a===null?v=new c(i.count*l):v=new c(a,f,i.count*l),g=new Gt(v,l,p);if(i.sparse!==void 0){const m=_a.SCALAR,_=ls[i.sparse.indices.componentType],y=i.sparse.indices.byteOffset||0,x=i.sparse.values.byteOffset||0,E=new _(o[1],y,i.sparse.count*m),A=new c(o[2],x,i.sparse.count*l);a!==null&&(g=new Gt(g.array.slice(),g.itemSize,g.normalized)),g.normalized=!1;for(let R=0,L=E.length;R<L;R++){const b=E[R];if(g.setX(b,A[R*l]),l>=2&&g.setY(b,A[R*l+1]),l>=3&&g.setZ(b,A[R*l+2]),l>=4&&g.setW(b,A[R*l+3]),l>=5)throw new Error("THREE.GLTFLoader: Unsupported itemSize in sparse BufferAttribute.")}g.normalized=p}return g})}loadTexture(e){const t=this.json,n=this.options,r=t.textures[e].source,o=t.images[r];let a=this.textureLoader;if(o.uri){const l=n.manager.getHandler(o.uri);l!==null&&(a=l)}return this.loadTextureImage(e,r,a)}loadTextureImage(e,t,n){const i=this,r=this.json,o=r.textures[e],a=r.images[t],l=(a.uri||a.bufferView)+":"+o.sampler;if(this.textureCache[l])return this.textureCache[l];const c=this.loadImageSource(t,n).then(function(u){u.flipY=!1,u.name=o.name||a.name||"",u.name===""&&typeof a.uri=="string"&&a.uri.startsWith("data:image/")===!1&&(u.name=a.uri);const f=(r.samplers||{})[o.sampler]||{};return u.magFilter=zu[f.magFilter]||_t,u.minFilter=zu[f.minFilter]||tn,u.wrapS=Hu[f.wrapS]||Pi,u.wrapT=Hu[f.wrapT]||Pi,u.generateMipmaps=!u.isCompressedTexture&&u.minFilter!==Vt&&u.minFilter!==_t,i.associations.set(u,{textures:e}),u}).catch(function(){return null});return this.textureCache[l]=c,c}loadImageSource(e,t){const n=this,i=this.json,r=this.options;if(this.sourceCache[e]!==void 0)return this.sourceCache[e].then(h=>h.clone());const o=i.images[e],a=self.URL||self.webkitURL;let l=o.uri||"",c=!1;if(o.bufferView!==void 0)l=n.getDependency("bufferView",o.bufferView).then(function(h){c=!0;const f=new Blob([h],{type:o.mimeType});return l=a.createObjectURL(f),l});else if(o.uri===void 0)throw new Error("THREE.GLTFLoader: Image "+e+" is missing URI and bufferView");const u=Promise.resolve(l).then(function(h){return new Promise(function(f,d){let p=f;t.isImageBitmapLoader===!0&&(p=function(v){const g=new At(v);g.needsUpdate=!0,f(g)}),t.load(Qs.resolveURL(h,r.path),p,void 0,d)})}).then(function(h){return c===!0&&a.revokeObjectURL(l),Tn(h,o),h.userData.mimeType=o.mimeType||O_(o.uri),h}).catch(function(h){throw console.error("THREE.GLTFLoader: Couldn't load texture",l),h});return this.sourceCache[e]=u,u}assignTexture(e,t,n,i){const r=this;return this.getDependency("texture",n.index).then(function(o){if(!o)return null;if(n.texCoord!==void 0&&n.texCoord>0&&(o=o.clone(),o.channel=n.texCoord),r.extensions[Ze.KHR_TEXTURE_TRANSFORM]){const a=n.extensions!==void 0?n.extensions[Ze.KHR_TEXTURE_TRANSFORM]:void 0;if(a){const l=r.associations.get(o);o=r.extensions[Ze.KHR_TEXTURE_TRANSFORM].extendTexture(o,a),r.associations.set(o,l)}}return i!==void 0&&(o.colorSpace=i),e[t]=o,o})}assignFinalMaterial(e){const t=e.geometry;let n=e.material;const i=t.attributes.tangent===void 0,r=t.attributes.color!==void 0,o=t.attributes.normal===void 0;if(e.isPoints){const a="PointsMaterial:"+n.uuid;let l=this.cache.get(a);l||(l=new Lh,xn.prototype.copy.call(l,n),l.color.copy(n.color),l.map=n.map,l.sizeAttenuation=!1,this.cache.add(a,l)),n=l}else if(e.isLine){const a="LineBasicMaterial:"+n.uuid;let l=this.cache.get(a);l||(l=new Vl,xn.prototype.copy.call(l,n),l.color.copy(n.color),l.map=n.map,this.cache.add(a,l)),n=l}if(i||r||o){let a="ClonedMaterial:"+n.uuid+":";i&&(a+="derivative-tangents:"),r&&(a+="vertex-colors:"),o&&(a+="flat-shading:");let l=this.cache.get(a);l||(l=n.clone(),r&&(l.vertexColors=!0),o&&(l.flatShading=!0),i&&(l.normalScale&&(l.normalScale.y*=-1),l.clearcoatNormalScale&&(l.clearcoatNormalScale.y*=-1)),this.cache.add(a,l),this.associations.set(l,this.associations.get(n))),n=l}e.material=n}getMaterialType(){return Zl}loadMaterial(e){const t=this,n=this.json,i=this.extensions,r=n.materials[e];let o;const a={},l=r.extensions||{},c=[];if(l[Ze.KHR_MATERIALS_UNLIT]){const h=i[Ze.KHR_MATERIALS_UNLIT];o=h.getMaterialType(),c.push(h.extendParams(a,r,t))}else{const h=r.pbrMetallicRoughness||{};if(a.color=new Ue(1,1,1),a.opacity=1,Array.isArray(h.baseColorFactor)){const f=h.baseColorFactor;a.color.setRGB(f[0],f[1],f[2],Wt),a.opacity=f[3]}h.baseColorTexture!==void 0&&c.push(t.assignTexture(a,"map",h.baseColorTexture,St)),a.metalness=h.metallicFactor!==void 0?h.metallicFactor:1,a.roughness=h.roughnessFactor!==void 0?h.roughnessFactor:1,h.metallicRoughnessTexture!==void 0&&(c.push(t.assignTexture(a,"metalnessMap",h.metallicRoughnessTexture)),c.push(t.assignTexture(a,"roughnessMap",h.metallicRoughnessTexture))),o=this._invokeOne(function(f){return f.getMaterialType&&f.getMaterialType(e)}),c.push(Promise.all(this._invokeAll(function(f){return f.extendMaterialParams&&f.extendMaterialParams(e,a)})))}r.doubleSided===!0&&(a.side=cn);const u=r.alphaMode||ya.OPAQUE;if(u===ya.BLEND?(a.transparent=!0,a.depthWrite=!1):(a.transparent=!1,u===ya.MASK&&(a.alphaTest=r.alphaCutoff!==void 0?r.alphaCutoff:.5)),r.normalTexture!==void 0&&o!==Kt&&(c.push(t.assignTexture(a,"normalMap",r.normalTexture)),a.normalScale=new ne(1,1),r.normalTexture.scale!==void 0)){const h=r.normalTexture.scale;a.normalScale.set(h,h)}if(r.occlusionTexture!==void 0&&o!==Kt&&(c.push(t.assignTexture(a,"aoMap",r.occlusionTexture)),r.occlusionTexture.strength!==void 0&&(a.aoMapIntensity=r.occlusionTexture.strength)),r.emissiveFactor!==void 0&&o!==Kt){const h=r.emissiveFactor;a.emissive=new Ue().setRGB(h[0],h[1],h[2],Wt)}return r.emissiveTexture!==void 0&&o!==Kt&&c.push(t.assignTexture(a,"emissiveMap",r.emissiveTexture,St)),Promise.all(c).then(function(){const h=new o(a);return r.name&&(h.name=r.name),Tn(h,r),t.associations.set(h,{materials:e}),r.extensions&&Si(i,h,r),h})}createUniqueName(e){const t=rt.sanitizeNodeName(e||"");return t in this.nodeNamesUsed?t+"_"+ ++this.nodeNamesUsed[t]:(this.nodeNamesUsed[t]=0,t)}loadGeometries(e){const t=this,n=this.extensions,i=this.primitiveCache;function r(a){return n[Ze.KHR_DRACO_MESH_COMPRESSION].decodePrimitive(a,t).then(function(l){return Vu(l,a,t)})}const o=[];for(let a=0,l=e.length;a<l;a++){const c=e[a],u=F_(c),h=i[u];if(h)o.push(h.promise);else{let f;c.extensions&&c.extensions[Ze.KHR_DRACO_MESH_COMPRESSION]?f=r(c):f=Vu(new Et,c,t),i[u]={primitive:c,promise:f},o.push(f)}}return Promise.all(o)}loadMesh(e){const t=this,n=this.json,i=this.extensions,r=n.meshes[e],o=r.primitives,a=[];for(let l=0,c=o.length;l<c;l++){const u=o[l].material===void 0?D_(this.cache):this.getDependency("material",o[l].material);a.push(u)}return a.push(t.loadGeometries(o)),Promise.all(a).then(function(l){const c=l.slice(0,l.length-1),u=l[l.length-1],h=[];for(let d=0,p=u.length;d<p;d++){const v=u[d],g=o[d];let m;const _=c[d];if(g.mode===ln.TRIANGLES||g.mode===ln.TRIANGLE_STRIP||g.mode===ln.TRIANGLE_FAN||g.mode===void 0)m=r.isSkinnedMesh===!0?new ep(v,_):new Ye(v,_),m.isSkinnedMesh===!0&&m.normalizeSkinWeights(),g.mode===ln.TRIANGLE_STRIP?m.geometry=ku(m.geometry,gh):g.mode===ln.TRIANGLE_FAN&&(m.geometry=ku(m.geometry,dl));else if(g.mode===ln.LINES)m=new ap(v,_);else if(g.mode===ln.LINE_STRIP)m=new wo(v,_);else if(g.mode===ln.LINE_LOOP)m=new lp(v,_);else if(g.mode===ln.POINTS)m=new cp(v,_);else throw new Error("THREE.GLTFLoader: Primitive mode unsupported: "+g.mode);Object.keys(m.geometry.morphAttributes).length>0&&U_(m,r),m.name=t.createUniqueName(r.name||"mesh_"+e),Tn(m,r),g.extensions&&Si(i,m,g),t.assignFinalMaterial(m),h.push(m)}for(let d=0,p=h.length;d<p;d++)t.associations.set(h[d],{meshes:e,primitives:d});if(h.length===1)return r.extensions&&Si(i,h[0],r),h[0];const f=new Ht;r.extensions&&Si(i,f,r),t.associations.set(f,{meshes:e});for(let d=0,p=h.length;d<p;d++)f.add(h[d]);return f})}loadCamera(e){let t;const n=this.json.cameras[e],i=n[n.type];if(!i){console.warn("THREE.GLTFLoader: Missing camera parameters.");return}return n.type==="perspective"?t=new Dt($t.radToDeg(i.yfov),i.aspectRatio||1,i.znear||1,i.zfar||2e6):n.type==="orthographic"&&(t=new Ni(-i.xmag,i.xmag,i.ymag,-i.ymag,i.znear,i.zfar)),n.name&&(t.name=this.createUniqueName(n.name)),Tn(t,n),Promise.resolve(t)}loadSkin(e){const t=this.json.skins[e],n=[];for(let i=0,r=t.joints.length;i<r;i++)n.push(this._loadNodeShallow(t.joints[i]));return t.inverseBindMatrices!==void 0?n.push(this.getDependency("accessor",t.inverseBindMatrices)):n.push(null),Promise.all(n).then(function(i){const r=i.pop(),o=i,a=[],l=[];for(let c=0,u=o.length;c<u;c++){const h=o[c];if(h){a.push(h);const f=new Le;r!==null&&f.fromArray(r.array,c*16),l.push(f)}else console.warn('THREE.GLTFLoader: Joint "%s" could not be found.',t.joints[c])}return new zl(a,l)})}loadAnimation(e){const t=this.json,n=this,i=t.animations[e],r=i.name?i.name:"animation_"+e,o=[],a=[],l=[],c=[],u=[];for(let h=0,f=i.channels.length;h<f;h++){const d=i.channels[h],p=i.samplers[d.sampler],v=d.target,g=v.node,m=i.parameters!==void 0?i.parameters[p.input]:p.input,_=i.parameters!==void 0?i.parameters[p.output]:p.output;v.node!==void 0&&(o.push(this.getDependency("node",g)),a.push(this.getDependency("accessor",m)),l.push(this.getDependency("accessor",_)),c.push(p),u.push(v))}return Promise.all([Promise.all(o),Promise.all(a),Promise.all(l),Promise.all(c),Promise.all(u)]).then(function(h){const f=h[0],d=h[1],p=h[2],v=h[3],g=h[4],m=[];for(let y=0,x=f.length;y<x;y++){const E=f[y],A=d[y],R=p[y],L=v[y],b=g[y];if(E===void 0)continue;E.updateMatrix&&E.updateMatrix();const M=n._createAnimationTracks(E,A,R,L,b);if(M)for(let P=0;P<M.length;P++)m.push(M[P])}const _=new jp(r,void 0,m);return Tn(_,i),_})}createNodeMesh(e){const t=this.json,n=this,i=t.nodes[e];return i.mesh===void 0?null:n.getDependency("mesh",i.mesh).then(function(r){const o=n._getNodeRef(n.meshCache,i.mesh,r);return i.weights!==void 0&&o.traverse(function(a){if(a.isMesh)for(let l=0,c=i.weights.length;l<c;l++)a.morphTargetInfluences[l]=i.weights[l]}),o})}loadNode(e){const t=this.json,n=this,i=t.nodes[e],r=n._loadNodeShallow(e),o=[],a=i.children||[];for(let c=0,u=a.length;c<u;c++)o.push(n.getDependency("node",a[c]));const l=i.skin===void 0?Promise.resolve(null):n.getDependency("skin",i.skin);return Promise.all([r,Promise.all(o),l]).then(function(c){const u=c[0],h=c[1],f=c[2];f!==null&&u.traverse(function(d){d.isSkinnedMesh&&d.bind(f,k_)});for(let d=0,p=h.length;d<p;d++)u.add(h[d]);return u})}_loadNodeShallow(e){const t=this.json,n=this.extensions,i=this;if(this.nodeCache[e]!==void 0)return this.nodeCache[e];const r=t.nodes[e],o=r.name?i.createUniqueName(r.name):"",a=[],l=i._invokeOne(function(c){return c.createNodeMesh&&c.createNodeMesh(e)});return l&&a.push(l),r.camera!==void 0&&a.push(i.getDependency("camera",r.camera).then(function(c){return i._getNodeRef(i.cameraCache,r.camera,c)})),i._invokeAll(function(c){return c.createNodeAttachment&&c.createNodeAttachment(e)}).forEach(function(c){a.push(c)}),this.nodeCache[e]=Promise.all(a).then(function(c){let u;if(r.isBone===!0?u=new Ph:c.length>1?u=new Ht:c.length===1?u=c[0]:u=new dt,u!==c[0])for(let h=0,f=c.length;h<f;h++)u.add(c[h]);if(r.name&&(u.userData.name=r.name,u.name=o),Tn(u,r),r.extensions&&Si(n,u,r),r.matrix!==void 0){const h=new Le;h.fromArray(r.matrix),u.applyMatrix4(h)}else r.translation!==void 0&&u.position.fromArray(r.translation),r.rotation!==void 0&&u.quaternion.fromArray(r.rotation),r.scale!==void 0&&u.scale.fromArray(r.scale);if(!i.associations.has(u))i.associations.set(u,{});else if(r.mesh!==void 0&&i.meshCache.refs[r.mesh]>1){const h=i.associations.get(u);i.associations.set(u,{...h})}return i.associations.get(u).nodes=e,u}),this.nodeCache[e]}loadScene(e){const t=this.extensions,n=this.json.scenes[e],i=this,r=new Ht;n.name&&(r.name=i.createUniqueName(n.name)),Tn(r,n),n.extensions&&Si(t,r,n);const o=n.nodes||[],a=[];for(let l=0,c=o.length;l<c;l++)a.push(i.getDependency("node",o[l]));return Promise.all(a).then(function(l){for(let u=0,h=l.length;u<h;u++)r.add(l[u]);const c=u=>{const h=new Map;for(const[f,d]of i.associations)(f instanceof xn||f instanceof At)&&h.set(f,d);return u.traverse(f=>{const d=i.associations.get(f);d!=null&&h.set(f,d)}),h};return i.associations=c(r),r})}_createAnimationTracks(e,t,n,i,r){const o=[],a=e.name?e.name:e.uuid,l=[];oi[r.path]===oi.weights?e.traverse(function(f){f.morphTargetInfluences&&l.push(f.name?f.name:f.uuid)}):l.push(a);let c;switch(oi[r.path]){case oi.weights:c=gs;break;case oi.rotation:c=vs;break;case oi.translation:case oi.scale:c=xs;break;default:switch(n.itemSize){case 1:c=gs;break;case 2:case 3:default:c=xs;break}break}const u=i.interpolation!==void 0?I_[i.interpolation]:lr,h=this._getArrayFromAccessor(n);for(let f=0,d=l.length;f<d;f++){const p=new c(l[f]+"."+oi[r.path],t.array,h,u);i.interpolation==="CUBICSPLINE"&&this._createCubicSplineTrackInterpolant(p),o.push(p)}return o}_getArrayFromAccessor(e){let t=e.array;if(e.normalized){const n=Tl(t.constructor),i=new Float32Array(t.length);for(let r=0,o=t.length;r<o;r++)i[r]=t[r]*n;t=i}return t}_createCubicSplineTrackInterpolant(e){e.createInterpolant=function(n){const i=this instanceof vs?L_:Jh;return new i(this.times,this.values,this.getValueSize()/3,n)},e.createInterpolant.isInterpolantFactoryMethodGLTFCubicSpline=!0}}function z_(s,e,t){const n=e.attributes,i=new Jn;if(n.POSITION!==void 0){const a=t.json.accessors[n.POSITION],l=a.min,c=a.max;if(l!==void 0&&c!==void 0){if(i.set(new w(l[0],l[1],l[2]),new w(c[0],c[1],c[2])),a.normalized){const u=Tl(ls[a.componentType]);i.min.multiplyScalar(u),i.max.multiplyScalar(u)}}else{console.warn("THREE.GLTFLoader: Missing min/max properties for accessor POSITION.");return}}else return;const r=e.targets;if(r!==void 0){const a=new w,l=new w;for(let c=0,u=r.length;c<u;c++){const h=r[c];if(h.POSITION!==void 0){const f=t.json.accessors[h.POSITION],d=f.min,p=f.max;if(d!==void 0&&p!==void 0){if(l.setX(Math.max(Math.abs(d[0]),Math.abs(p[0]))),l.setY(Math.max(Math.abs(d[1]),Math.abs(p[1]))),l.setZ(Math.max(Math.abs(d[2]),Math.abs(p[2]))),f.normalized){const v=Tl(ls[f.componentType]);l.multiplyScalar(v)}a.max(l)}else console.warn("THREE.GLTFLoader: Missing min/max properties for accessor POSITION.")}}i.expandByVector(a)}s.boundingBox=i;const o=new In;i.getCenter(o.center),o.radius=i.min.distanceTo(i.max)/2,s.boundingSphere=o}function Vu(s,e,t){const n=e.attributes,i=[];function r(o,a){return t.getDependency("accessor",o).then(function(l){s.setAttribute(a,l)})}for(const o in n){const a=bl[o]||o.toLowerCase();a in s.attributes||i.push(r(n[o],a))}if(e.indices!==void 0&&!s.index){const o=t.getDependency("accessor",e.indices).then(function(a){s.setIndex(a)});i.push(o)}return et.workingColorSpace!==Wt&&"COLOR_0"in n&&console.warn(`THREE.GLTFLoader: Converting vertex colors from "srgb-linear" to "${et.workingColorSpace}" not supported.`),Tn(s,e),z_(s,e,t),Promise.all(i).then(function(){return e.targets!==void 0?N_(s,e.targets,t):s})}const Mt={ComponentState:Object.freeze({DEFAULT:"default",TOUCHED:"touched",PRESSED:"pressed"}),ComponentProperty:Object.freeze({BUTTON:"button",X_AXIS:"xAxis",Y_AXIS:"yAxis",STATE:"state"}),ComponentType:Object.freeze({TRIGGER:"trigger",SQUEEZE:"squeeze",TOUCHPAD:"touchpad",THUMBSTICK:"thumbstick",BUTTON:"button"}),ButtonTouchThreshold:.05,AxisTouchThreshold:.1,VisualResponseProperty:Object.freeze({TRANSFORM:"transform",VISIBILITY:"visibility"})};async function Qh(s){const e=await fetch(s);if(e.ok)return e.json();throw new Error(e.statusText)}async function H_(s){if(!s)throw new Error("No basePath supplied");return await Qh(`${s}/profilesList.json`)}async function V_(s,e,t=null,n=!0){if(!s)throw new Error("No xrInputSource supplied");if(!e)throw new Error("No basePath supplied");const i=await H_(e);let r;if(s.profiles.some(l=>{const c=i[l];return c&&(r={profileId:l,profilePath:`${e}/${c.path}`,deprecated:!!c.deprecated}),!!r}),!r){if(!t)throw new Error("No matching profile name found");const l=i[t];if(!l)throw new Error(`No matching profile name found and default profile "${t}" missing.`);r={profileId:t,profilePath:`${e}/${l.path}`,deprecated:!!l.deprecated}}const o=await Qh(r.profilePath);let a;if(n){let l;if(s.handedness==="any"?l=o.layouts[Object.keys(o.layouts)[0]]:l=o.layouts[s.handedness],!l)throw new Error(`No matching handedness, ${s.handedness}, in profile ${r.profileId}`);l.assetPath&&(a=r.profilePath.replace("profile.json",l.assetPath))}return{profile:o,assetPath:a}}const G_={xAxis:0,yAxis:0,button:0,state:Mt.ComponentState.DEFAULT};function W_(s=0,e=0){let t=s,n=e;if(Math.sqrt(s*s+e*e)>1){const o=Math.atan2(e,s);t=Math.cos(o),n=Math.sin(o)}return{normalizedXAxis:t*.5+.5,normalizedYAxis:n*.5+.5}}class X_{constructor(e){this.componentProperty=e.componentProperty,this.states=e.states,this.valueNodeName=e.valueNodeName,this.valueNodeProperty=e.valueNodeProperty,this.valueNodeProperty===Mt.VisualResponseProperty.TRANSFORM&&(this.minNodeName=e.minNodeName,this.maxNodeName=e.maxNodeName),this.value=0,this.updateFromComponent(G_)}updateFromComponent({xAxis:e,yAxis:t,button:n,state:i}){const{normalizedXAxis:r,normalizedYAxis:o}=W_(e,t);switch(this.componentProperty){case Mt.ComponentProperty.X_AXIS:this.value=this.states.includes(i)?r:.5;break;case Mt.ComponentProperty.Y_AXIS:this.value=this.states.includes(i)?o:.5;break;case Mt.ComponentProperty.BUTTON:this.value=this.states.includes(i)?n:0;break;case Mt.ComponentProperty.STATE:this.valueNodeProperty===Mt.VisualResponseProperty.VISIBILITY?this.value=this.states.includes(i):this.value=this.states.includes(i)?1:0;break;default:throw new Error(`Unexpected visualResponse componentProperty ${this.componentProperty}`)}}}class q_{constructor(e,t){if(!e||!t||!t.visualResponses||!t.gamepadIndices||Object.keys(t.gamepadIndices).length===0)throw new Error("Invalid arguments supplied");this.id=e,this.type=t.type,this.rootNodeName=t.rootNodeName,this.touchPointNodeName=t.touchPointNodeName,this.visualResponses={},Object.keys(t.visualResponses).forEach(n=>{const i=new X_(t.visualResponses[n]);this.visualResponses[n]=i}),this.gamepadIndices=Object.assign({},t.gamepadIndices),this.values={state:Mt.ComponentState.DEFAULT,button:this.gamepadIndices.button!==void 0?0:void 0,xAxis:this.gamepadIndices.xAxis!==void 0?0:void 0,yAxis:this.gamepadIndices.yAxis!==void 0?0:void 0}}get data(){return{id:this.id,...this.values}}updateFromGamepad(e){if(this.values.state=Mt.ComponentState.DEFAULT,this.gamepadIndices.button!==void 0&&e.buttons.length>this.gamepadIndices.button){const t=e.buttons[this.gamepadIndices.button];this.values.button=t.value,this.values.button=this.values.button<0?0:this.values.button,this.values.button=this.values.button>1?1:this.values.button,t.pressed||this.values.button===1?this.values.state=Mt.ComponentState.PRESSED:(t.touched||this.values.button>Mt.ButtonTouchThreshold)&&(this.values.state=Mt.ComponentState.TOUCHED)}this.gamepadIndices.xAxis!==void 0&&e.axes.length>this.gamepadIndices.xAxis&&(this.values.xAxis=e.axes[this.gamepadIndices.xAxis],this.values.xAxis=this.values.xAxis<-1?-1:this.values.xAxis,this.values.xAxis=this.values.xAxis>1?1:this.values.xAxis,this.values.state===Mt.ComponentState.DEFAULT&&Math.abs(this.values.xAxis)>Mt.AxisTouchThreshold&&(this.values.state=Mt.ComponentState.TOUCHED)),this.gamepadIndices.yAxis!==void 0&&e.axes.length>this.gamepadIndices.yAxis&&(this.values.yAxis=e.axes[this.gamepadIndices.yAxis],this.values.yAxis=this.values.yAxis<-1?-1:this.values.yAxis,this.values.yAxis=this.values.yAxis>1?1:this.values.yAxis,this.values.state===Mt.ComponentState.DEFAULT&&Math.abs(this.values.yAxis)>Mt.AxisTouchThreshold&&(this.values.state=Mt.ComponentState.TOUCHED)),Object.values(this.visualResponses).forEach(t=>{t.updateFromComponent(this.values)})}}class K_{constructor(e,t,n){if(!e)throw new Error("No xrInputSource supplied");if(!t)throw new Error("No profile supplied");this.xrInputSource=e,this.assetUrl=n,this.id=t.profileId,this.layoutDescription=t.layouts[e.handedness],this.components={},Object.keys(this.layoutDescription.components).forEach(i=>{const r=this.layoutDescription.components[i];this.components[i]=new q_(i,r)}),this.updateFromGamepad()}get gripSpace(){return this.xrInputSource.gripSpace}get targetRaySpace(){return this.xrInputSource.targetRaySpace}get data(){const e=[];return Object.values(this.components).forEach(t=>{e.push(t.data)}),e}updateFromGamepad(){Object.values(this.components).forEach(e=>{e.updateFromGamepad(this.xrInputSource.gamepad)})}}const $_="https://cdn.jsdelivr.net/npm/@webxr-input-profiles/assets@1.0/dist/profiles",Y_="generic-trigger";class j_ extends dt{constructor(){super(),this.motionController=null,this.envMap=null}setEnvironmentMap(e){return this.envMap==e?this:(this.envMap=e,this.traverse(t=>{t.isMesh&&(t.material.envMap=this.envMap,t.material.needsUpdate=!0)}),this)}updateMatrixWorld(e){super.updateMatrixWorld(e),this.motionController&&(this.motionController.updateFromGamepad(),Object.values(this.motionController.components).forEach(t=>{Object.values(t.visualResponses).forEach(n=>{const{valueNode:i,minNode:r,maxNode:o,value:a,valueNodeProperty:l}=n;i&&(l===Mt.VisualResponseProperty.VISIBILITY?i.visible=a:l===Mt.VisualResponseProperty.TRANSFORM&&(i.quaternion.slerpQuaternions(r.quaternion,o.quaternion,a),i.position.lerpVectors(r.position,o.position,a)))})}))}}function Z_(s,e){Object.values(s.components).forEach(t=>{const{type:n,touchPointNodeName:i,visualResponses:r}=t;if(n===Mt.ComponentType.TOUCHPAD)if(t.touchPointNode=e.getObjectByName(i),t.touchPointNode){const o=new di(.001),a=new Kt({color:255}),l=new Ye(o,a);t.touchPointNode.add(l)}else console.warn(`Could not find touch dot, ${t.touchPointNodeName}, in touchpad component ${t.id}`);Object.values(r).forEach(o=>{const{valueNodeName:a,minNodeName:l,maxNodeName:c,valueNodeProperty:u}=o;if(u===Mt.VisualResponseProperty.TRANSFORM){if(o.minNode=e.getObjectByName(l),o.maxNode=e.getObjectByName(c),!o.minNode){console.warn(`Could not find ${l} in the model`);return}if(!o.maxNode){console.warn(`Could not find ${c} in the model`);return}}o.valueNode=e.getObjectByName(a),o.valueNode||console.warn(`Could not find ${a} in the model`)})})}function Gu(s,e){Z_(s.motionController,e),s.envMap&&e.traverse(t=>{t.isMesh&&(t.material.envMap=s.envMap,t.material.needsUpdate=!0)}),s.add(e)}class J_{constructor(e=null,t=null){this.gltfLoader=e,this.path=$_,this._assetCache={},this.onLoad=t,this.gltfLoader||(this.gltfLoader=new o_)}setPath(e){return this.path=e,this}createControllerModel(e){const t=new j_;let n=null;return e.addEventListener("connected",i=>{const r=i.data;r.targetRayMode!=="tracked-pointer"||!r.gamepad||r.hand||V_(r,this.path,Y_).then(({profile:o,assetPath:a})=>{t.motionController=new K_(r,o,a);const l=this._assetCache[t.motionController.assetUrl];if(l)n=l.scene.clone(),Gu(t,n),this.onLoad&&this.onLoad(n);else{if(!this.gltfLoader)throw new Error("GLTFLoader not set.");this.gltfLoader.setPath(""),this.gltfLoader.load(t.motionController.assetUrl,c=>{this._assetCache[t.motionController.assetUrl]=c,n=c.scene.clone(),Gu(t,n),this.onLoad&&this.onLoad(n)},null,()=>{throw new Error(`Asset ${t.motionController.assetUrl} missing or malformed.`)})}}).catch(o=>{console.warn(o)})}),e.addEventListener("disconnected",()=>{t.motionController=null,t.remove(n),n=null}),t}}const Wu=662607015e-42,Q_=1380649e-29,Sa=299792458,Ci=(s,e,t,n)=>{const i=(s-e)/(s<e?t:n);return Math.exp(-.5*i*i)},ey=s=>1.056*Ci(s,599.8,37.9,31)+.362*Ci(s,442,16,26.7)-.065*Ci(s,501.1,20.4,26.2),ty=s=>.821*Ci(s,568.8,46.9,40.5)+.286*Ci(s,530.9,16.3,31.1),ny=s=>1.217*Ci(s,437,11.8,36)+.681*Ci(s,459,26,13.8);function iy(s,e){const t=s*1e-9,n=Wu*Sa/(t*Q_*e);return n>700?0:2*Wu*Sa*Sa/(t**5*Math.expm1(n))}function cs(s){let e=0,t=0,n=0;const i=2;for(let h=360;h<=830;h+=i){const f=iy(h,s)*i*1e-9;e+=f*ey(h),t+=f*ty(h),n+=f*ny(h)}const r=683*t;if(t<=0)return{rgb:[1,.2,0],L:0};e/=t,n/=t;let o=3.2406*e-1.5372-.4986*n,a=-.9689*e+1.8758+.0415*n,l=.0557*e-.204+1.057*n;const c=Math.min(o,a,l);c<0&&(o-=c,a-=c,l-=c);const u=.2126*o+.7152*a+.0722*l;return{rgb:[o/u,a/u,l/u],L:r}}const El=Math.log10(400),ef=9,wi=512;function sy(){const s=new Float32Array(wi*4);for(let t=0;t<wi;t++){const n=Math.pow(10,El+(ef-El)*t/(wi-1)),i=cs(n);s.set([i.rgb[0],i.rgb[1],i.rgb[2],Math.log10(Math.max(i.L,1e-30))],t*4)}const e=new vr(tf(s),wi,1,Nt,nn);return e.magFilter=_t,e.minFilter=_t,e.wrapS=qn,e.needsUpdate=!0,e}function tf(s){const e=new Uint16Array(s.length);for(let t=0;t<s.length;t++)e[t]=ho.toHalfFloat(s[t]);return e}const ws=`
const float BB_LOG_T0 = ${El.toFixed(6)};
const float BB_LOG_T1 = ${ef.toFixed(6)};
vec4 bbFetch(float T) {
  float u = (log2(max(T, 1.0)) * 0.30103 - BB_LOG_T0) / (BB_LOG_T1 - BB_LOG_T0);
  u = clamp(u, 0.0, 1.0) * ${((wi-1)/wi).toFixed(6)} + ${(.5/wi).toFixed(6)};
  return texture(uBB, vec2(u, 0.5));
}
// Absolute linear-sRGB radiance (cd/m^2 scale) of a blackbody at temperature T.
vec3 bbRadiance(float T) {
  if (T < 300.0) return vec3(0.0);
  vec4 s = bbFetch(T);
  float fade = smoothstep(300.0, 500.0, T);
  return s.rgb * exp2(s.a * 3.321928) * fade;
}
// Log10 luminance of a blackbody at T.
float bbLogL(float T) { return bbFetch(T).a; }
vec3 bbChroma(float T) { return bbFetch(T).rgb; }
`,Ro=`
// Direction for cube face f (GL order +X,-X,+Y,-Y,+Z,-Z) at face coords st in [0,1]^2.
// Matches the GL sampling convention so texture(samplerCube, dir) reads this texel back.
vec3 cubeDir(int f, vec2 st) {
  float sc = 2.0 * st.x - 1.0;
  float tc = 2.0 * st.y - 1.0;
  if (f == 0) return normalize(vec3(1.0, -tc, -sc));
  if (f == 1) return normalize(vec3(-1.0, -tc, sc));
  if (f == 2) return normalize(vec3(sc, 1.0, tc));
  if (f == 3) return normalize(vec3(sc, -1.0, -tc));
  if (f == 4) return normalize(vec3(sc, -tc, 1.0));
  return normalize(vec3(-sc, -tc, -1.0));
}
`,ic=`
uvec3 pcg3d(uvec3 v) {
  v = v * 1664525u + 1013904223u;
  v.x += v.y * v.z; v.y += v.z * v.x; v.z += v.x * v.y;
  v ^= v >> 16u;
  v.x += v.y * v.z; v.y += v.z * v.x; v.z += v.x * v.y;
  return v;
}
vec3 hash33(vec3 p) {
  uvec3 u = pcg3d(uvec3(ivec3(floor(p)) + ivec3(1 << 20)));
  return vec3(u) * (1.0 / 4294967295.0);
}
float hash13(vec3 p) { return hash33(p).x; }
// Smooth value noise in [0,1]
float vnoise(vec3 p) {
  vec3 i = floor(p);
  vec3 f = fract(p);
  vec3 u = f * f * (3.0 - 2.0 * f);
  float n000 = hash13(i), n100 = hash13(i + vec3(1,0,0)), n010 = hash13(i + vec3(0,1,0)), n110 = hash13(i + vec3(1,1,0));
  float n001 = hash13(i + vec3(0,0,1)), n101 = hash13(i + vec3(1,0,1)), n011 = hash13(i + vec3(0,1,1)), n111 = hash13(i + vec3(1,1,1));
  return mix(mix(mix(n000, n100, u.x), mix(n010, n110, u.x), u.y), mix(mix(n001, n101, u.x), mix(n011, n111, u.x), u.y), u.z);
}
// Band-limited fbm: octaves whose wavelength is below 'footprint' fade to their mean
// (temporal stability in VR) and are skipped entirely once fully faded.
float fbm(vec3 p, int octaves, float footprint) {
  float s = 0.0, a = 0.5, w = 0.0, freq = 1.0;
  for (int i = 0; i < 12; i++) {
    if (i >= octaves) break;
    float fade = 1.0 - smoothstep(0.25, 1.0, footprint * freq);
    if (fade <= 0.0) {
      // remaining octaves contribute only their mean (0.5)
      float rem = a * 2.0 * (1.0 - exp2(-float(octaves - i)));
      s += 0.5 * rem;
      w += rem;
      break;
    }
    s += a * (fade * vnoise(p * freq + float(i) * 17.17) + (1.0 - fade) * 0.5);
    w += a;
    freq *= 2.03;
    a *= 0.5;
  }
  return s / max(w, 1e-5);
}
`,ry=`
precision highp float;
uniform int uFace;
uniform float uSize;
${Ro}
${ic}

const float PI = 3.14159265;
const float LUX0 = 2.54e-6;   // illuminance of a V = 0 star (lux)

float galDensity(vec3 d, float planeStrength) {
  float b = asin(clamp(d.z, -1.0, 1.0));
  float l = atan(d.y, d.x);
  float plane = exp(-abs(b) / 0.12);
  float bulge = exp(-(l * l / 0.12 + b * b / 0.05));
  return 1.0 + planeStrength * (2.5 * plane + 3.0 * bulge);
}

float dustTau(vec3 d, float footprint) {
  float b = asin(clamp(d.z, -1.0, 1.0));
  float lane = exp(-abs(b + 0.006) / 0.03);
  float n = fbm(d * 7.0 + vec3(3.1, 1.7, 0.4), 8, footprint * 7.0);
  float m = smoothstep(0.42, 0.78, n);
  return 3.0 * lane * m + 0.6 * lane;
}

float starTemp(float h) {
  // rough mix of spectral classes among naked-eye/telescopic stars
  if (h < 0.18) return mix(3100.0, 3700.0, fract(h * 37.0));   // M
  if (h < 0.48) return mix(4000.0, 5000.0, fract(h * 53.0));   // K (many giants)
  if (h < 0.63) return mix(5300.0, 6000.0, fract(h * 71.0));   // G
  if (h < 0.76) return mix(6100.0, 7400.0, fract(h * 13.0));   // F
  if (h < 0.91) return mix(7600.0, 10500.0, fract(h * 29.0));  // A
  return mix(11000.0, 32000.0, pow(fract(h * 91.0), 2.0));     // B/O
}

// Accumulates star luminance (cd/m^2) and luminance-weighted temperature.
void starLayer(vec3 d, float cs, float prob, float mMin, float mMax, float planeStrength, float seed, float sigma, float tau,
               inout float L, inout float LT) {
  vec3 p = d / cs;
  vec3 base = floor(p);
  for (int i = -1; i <= 1; i++)
  for (int j = -1; j <= 1; j++)
  for (int k = -1; k <= 1; k++) {
    vec3 cell = base + vec3(i, j, k);
    vec3 h = hash33(cell + seed);
    vec3 sp = (cell + hash33(cell + seed + 91.7)) * cs;
    float rr = length(sp);
    if (abs(rr - 1.0) > 0.5 * cs) continue;
    vec3 sd = sp / rr;
    if (h.x > prob * galDensity(sd, planeStrength) / (1.0 + planeStrength * 2.0)) continue;
    float ang = acos(clamp(dot(sd, d), -1.0, 1.0));
    if (ang > 3.5 * sigma) continue;
    float m = mMax + log(max(h.y, 1e-6)) / (0.45 * 2.302585);
    if (m < mMin) m = mMin + fract(h.y * 7919.0) * 0.6;
    float E = LUX0 * pow(10.0, -0.4 * m) * exp(-0.8 * tau);
    float lum = E * exp(-0.5 * ang * ang / (sigma * sigma)) / (2.0 * PI * sigma * sigma);
    float T = starTemp(h.z);
    T = mix(T, 3600.0, clamp(tau * 0.15, 0.0, 0.5));
    L += lum;
    LT += lum * T;
  }
}

void galaxies(vec3 d, inout float L, inout float LT) {
  float cs = 0.22;
  vec3 base = floor(d / cs);
  for (int i = -1; i <= 1; i++)
  for (int j = -1; j <= 1; j++)
  for (int k = -1; k <= 1; k++) {
    vec3 cell = base + vec3(i, j, k);
    vec3 h = hash33(cell + 501.0);
    vec3 sp = (cell + hash33(cell + 777.0)) * cs;
    float rr = length(sp);
    if (abs(rr - 1.0) > 0.5 * cs || h.x > 0.35) continue;
    vec3 sd = sp / rr;
    if (abs(sd.z) < 0.25) continue; // zone of avoidance
    vec3 t1 = normalize(cross(sd, abs(sd.z) < 0.9 ? vec3(0, 0, 1) : vec3(1, 0, 0)));
    vec3 t2 = cross(sd, t1);
    float rot = h.y * 6.283;
    vec3 ax = cos(rot) * t1 + sin(rot) * t2;
    vec3 ay = cross(sd, ax);
    float size = mix(0.0025, 0.009, h.z * h.z);
    float flat_ = mix(1.0, 4.0, fract(h.y * 13.7));
    vec2 q = vec2(dot(d - sd, ax), dot(d - sd, ay) * flat_) / size;
    float rq = length(q);
    if (rq > 4.0 || dot(d, sd) < 0.0) continue;
    float lum = 2.5e-3 * exp(-rq * 2.2) + 6e-3 * exp(-rq * rq * 30.0);
    L += lum;
    LT += lum * mix(4800.0, 6800.0, fract(h.z * 31.0));
  }
  // M31-like spiral near (l, b) = (121.2°, −21.6°)
  vec3 m31 = vec3(cos(-0.377) * cos(2.115), cos(-0.377) * sin(2.115), sin(-0.377));
  if (dot(d, m31) > 0.99) {
    vec3 t1 = normalize(cross(m31, vec3(0, 0, 1)));
    vec3 t2 = cross(m31, t1);
    float c = cos(0.6), s = sin(0.6);
    vec3 ax = c * t1 + s * t2, ay = cross(m31, ax);
    vec2 q = vec2(dot(d - m31, ax) / 0.026, dot(d - m31, ay) / 0.0075);
    float rq = length(q);
    float lum = 3.0e-3 * exp(-rq * 2.5) + 0.02 * exp(-rq * rq * 60.0);
    L += lum;
    LT += lum * 5200.0;
  }
}

void main() {
  vec2 st = gl_FragCoord.xy / uSize;
  vec3 d = cubeDir(uFace, st);
  float texel = 2.0 / uSize;
  float tau = dustTau(d, texel);
  float L = 0.0, LT = 0.0;
  float sigma = 0.85 * texel;
  starLayer(d, 0.05, 0.75, -1.5, 5.5, 0.35, 11.0, sigma, 0.0, L, LT);
  starLayer(d, 0.016, 0.7, 5.5, 8.5, 1.0, 23.0, sigma, tau * 0.5, L, LT);
  if (uSize >= 768.0) starLayer(d, 0.007, 0.55, 8.5, 11.0, 2.2, 37.0, sigma, tau, L, LT);

  // diffuse Milky Way
  float b = asin(clamp(d.z, -1.0, 1.0));
  float l = atan(d.y, d.x);
  float clouds = 0.45 + 1.1 * fbm(d * 5.0 + 9.0, 8, texel * 5.0);
  float band = exp(-abs(b) / 0.085) * (0.3 + 0.7 * exp(-l * l / 1.6)) * clouds;
  float bulge = 1.6 * exp(-(l * l / 0.06 + b * b / 0.022));
  float halo = 0.12 * exp(-abs(b) / 0.4);
  float Lmw = 1.6e-3 * (band + bulge + halo) * exp(-tau) + 2e-5;
  float Tmw = mix(mix(5400.0, 4600.0, bulge / (band + bulge + 1e-3)), 3300.0, 1.0 - exp(-0.5 * tau));
  L += Lmw;
  LT += Lmw * Tmw;
  galaxies(d, L, LT);

  float Lm = L * 1000.0;
  gl_FragColor = vec4(Lm, Lm * (LT / max(L, 1e-30)) * 1e-4, 0.0, 1.0);
}
`,Co=`
void main() { gl_Position = vec4(position.xy, 0.0, 1.0); }
`;function Po(){const s=new Et;return s.setAttribute("position",new it([-1,-1,0,3,-1,0,-1,3,0],3)),s}function oy(s,e,t,n=[0,1,2,3,4,5]){const i=new Ii,r=new Ye(Po(),t);r.frustumCulled=!1,i.add(r);const o=new Ni(-1,1,1,-1,0,1),a=s.getRenderTarget(),l=s.xr.enabled;s.xr.enabled=!1;const c=e.texture.generateMipmaps;for(let u=0;u<n.length;u++)t.uniforms.uFace.value=n[u],e.texture.generateMipmaps=c&&u===n.length-1,s.setRenderTarget(e,n[u]),s.render(i,o);e.texture.generateMipmaps=c,s.xr.enabled=l,s.setRenderTarget(a),r.geometry.dispose()}function ay(s,e){const t=new Eo(e,{type:nn,format:Nt,generateMipmaps:!0,minFilter:tn,magFilter:_t,depthBuffer:!1}),n=new Tt({vertexShader:Co,fragmentShader:ry,uniforms:{uFace:{value:0},uSize:{value:e}},depthTest:!1,depthWrite:!1});return oy(s,t,n),n.dispose(),t}const ly=`
varying vec3 vDir;
void main() {
  vDir = position;
  vec4 p = projectionMatrix * mat4(mat3(viewMatrix)) * vec4(position, 1.0);
  gl_Position = p.xyww;
}
`,cy=`
uniform int uMode;
uniform samplerCube uSky;
uniform samplerCube uTraced;
uniform sampler2D uBB;
uniform mat3 uSkyRot;     // body frame → galactic sky frame
uniform vec3 uBeta;       // ship velocity in body frame (units of c)
uniform float uExposure;
varying vec3 vDir;
${ws}
void main() {
  vec3 n = normalize(vDir);
  vec3 col;
  if (uMode == 1) {
    col = texture(uTraced, n).rgb;
  } else {
    float b2 = dot(uBeta, uBeta);
    vec3 src = n;
    float g = 1.0;
    if (b2 > 1e-12) {
      float b = sqrt(b2);
      vec3 bh = uBeta / b;
      float gam = inversesqrt(1.0 - b2);
      float bn = dot(uBeta, n);
      // direction to the source in the rest frame, and Doppler factor E_obs/E_emit
      src = normalize((n + bh * ((gam - 1.0) * dot(bh, n) - gam * b)) / (gam * (1.0 - bn)));
      g = 1.0 / (gam * (1.0 - bn));
    }
    vec4 s = texture(uSky, uSkyRot * src);
    float L = s.r * 1e-3;
    float T = max(s.g / max(s.r, 1e-12) * 1e4, 500.0);
    // surface brightness transforms as g^4 bolometrically; exact for blackbodies via T -> gT
    float ratio = exp2((bbLogL(g * T) - bbLogL(T)) * 3.321928);
    col = bbChroma(g * T) * L * ratio * uExposure;
  }
  gl_FragColor = vec4(min(col, vec3(6e4)), 1.0);
  #include <tonemapping_fragment>
  #include <colorspace_fragment>
}
`;class uy{mesh;material;constructor(e,t){this.material=new Tt({vertexShader:ly,fragmentShader:cy,uniforms:{uMode:{value:0},uSky:{value:e},uTraced:{value:null},uBB:{value:t},uSkyRot:{value:new Ce},uBeta:{value:new w},uExposure:{value:1}},side:Lt,depthTest:!1,depthWrite:!1}),this.mesh=new Ye(new Qn(10,10,10),this.material),this.mesh.frustumCulled=!1,this.mesh.renderOrder=-1e3}useTraced(e){this.material.uniforms.uMode.value=1,this.material.uniforms.uTraced.value=e}useStatic(e,t,n){const i=this.material.uniforms;i.uMode.value=0,i.uSkyRot.value.copy(e),i.uBeta.value.copy(t),i.uExposure.value=n}}class hy{exposure=1;measuredL=0;key=.2;floorL=.0015;bias=1;minExposure=1e-14;maxExposure=1e5;locked=!1;sync=!1;frame=0;wide;fovea;constructor(){this.wide=this.makeMeter(48,80),this.fovea=this.makeMeter(16,3)}makeMeter(e,t){const n=new Dt(t,1,.05,5e4);return n.layers.set(3),{target:new Ln(e,e,{type:nn,depthBuffer:!0}),camera:n,size:e,buf:new Uint16Array(e*e*4),pending:!1,value:0,reads:0,lastUsed:0}}meter(e,t,n){if(this.frame++,this.frame%3!==0&&!this.sync)return;const i=e.getRenderTarget(),r=e.xr.enabled;e.xr.enabled=!1;for(const o of[this.wide,this.fovea]){if(o.pending)continue;o.camera.quaternion.copy(n),o.camera.position.set(0,0,0),o.camera.updateMatrixWorld(),e.setRenderTarget(o.target),e.clear(),e.render(t,o.camera);const a=this.exposure;if(this.sync){e.readRenderTargetPixels(o.target,0,0,o.size,o.size,o.buf),o.reads++,o.lastUsed=a,o.value=o===this.wide?this.analyseWide(o,a):this.analyseFovea(o,a),this.combine();continue}o.pending=!0,e.readRenderTargetPixelsAsync(o.target,0,0,o.size,o.size,o.buf).then(()=>{o.pending=!1,o.reads++,o.lastUsed=a,o.value=o===this.wide?this.analyseWide(o,a):this.analyseFovea(o,a),this.combine()}).catch(()=>o.pending=!1)}e.setRenderTarget(i),e.xr.enabled=r}lum(e,t,n){const i=ho.fromHalfFloat(e.buf[t]),r=ho.fromHalfFloat(e.buf[t+1]),o=ho.fromHalfFloat(e.buf[t+2]);let a=.2126*i+.7152*r+.0722*o;return Number.isFinite(a)||(a=65504),Math.max(a,0)/n}analyseWide(e,t){const n=e.size;let i=0,r=0;const o=[];for(let l=0;l<n;l++)for(let c=0;c<n;c++){const u=this.lum(e,(l*n+c)*4,t),h=(c+.5)/n-.5,f=(l+.5)/n-.5,d=Math.exp(-(h*h+f*f)/.08);i+=d,r+=d*Math.log(u+this.floorL*.05),o.push(u)}o.sort((l,c)=>l-c);const a=o[Math.floor(o.length*.98)];return Math.max(Math.exp(r/i),a/10)}analyseFovea(e,t){let n=0;const i=e.size*e.size;for(let r=0;r<i;r++)n+=this.lum(e,r*4,t);return n/i/5}combine(){const e=Math.max(this.wide.value,this.fovea.value);Number.isFinite(e)&&e>0&&(this.measuredL=e)}update(e){if(this.locked||this.measuredL<=0)return;const t=Math.max(this.measuredL,this.floorL),n=$t.clamp(this.key*this.bias/t,this.minExposure,this.maxExposure);(!Number.isFinite(this.exposure)||this.exposure<=0)&&(this.exposure=n);const i=n<this.exposure?.4:3,r=1-Math.exp(-e/i);this.exposure=Math.exp(Math.log(this.exposure)+(Math.log(n)-Math.log(this.exposure))*r)}snapTo(e){this.measuredL=e,this.exposure=$t.clamp(this.key/Math.max(e,this.floorL),this.minExposure,this.maxExposure)}}const zs=new w;function an(s,e,t,n,i,r){const o=2*Math.PI*i/4,a=Math.max(r-2*i,0),l=Math.PI/4;zs.copy(e),zs[n]=0,zs.normalize();const c=.5*o/(o+a),u=1-zs.angleTo(s)/l;return Math.sign(zs[t])===1?u*c:a/(o+a)+c+c*(1-u)}class sc extends Qn{constructor(e=1,t=1,n=1,i=2,r=.1){const o=i*2+1;if(r=Math.min(e/2,t/2,n/2,r),super(1,1,1,o,o,o),this.type="RoundedBoxGeometry",this.parameters={width:e,height:t,depth:n,segments:i,radius:r},o===1)return;const a=this.toNonIndexed();this.index=null,this.attributes.position=a.attributes.position,this.attributes.normal=a.attributes.normal,this.attributes.uv=a.attributes.uv;const l=new w,c=new w,u=new w(e,t,n).divideScalar(2).subScalar(r),h=this.attributes.position.array,f=this.attributes.normal.array,d=this.attributes.uv.array,p=h.length/6,v=new w,g=.5/o;for(let m=0,_=0;m<h.length;m+=3,_+=2)switch(l.fromArray(h,m),c.copy(l),c.x-=Math.sign(c.x)*g,c.y-=Math.sign(c.y)*g,c.z-=Math.sign(c.z)*g,c.normalize(),h[m+0]=u.x*Math.sign(l.x)+c.x*r,h[m+1]=u.y*Math.sign(l.y)+c.y*r,h[m+2]=u.z*Math.sign(l.z)+c.z*r,f[m+0]=c.x,f[m+1]=c.y,f[m+2]=c.z,Math.floor(m/p)){case 0:v.set(1,0,0),d[_+0]=an(v,c,"z","y",r,n),d[_+1]=1-an(v,c,"y","z",r,t);break;case 1:v.set(-1,0,0),d[_+0]=1-an(v,c,"z","y",r,n),d[_+1]=1-an(v,c,"y","z",r,t);break;case 2:v.set(0,1,0),d[_+0]=1-an(v,c,"x","z",r,e),d[_+1]=an(v,c,"z","x",r,n);break;case 3:v.set(0,-1,0),d[_+0]=1-an(v,c,"x","z",r,e),d[_+1]=1-an(v,c,"z","x",r,n);break;case 4:v.set(0,0,1),d[_+0]=1-an(v,c,"x","y",r,e),d[_+1]=1-an(v,c,"y","x",r,t);break;case 5:v.set(0,0,-1),d[_+0]=an(v,c,"x","y",r,e),d[_+1]=1-an(v,c,"y","x",r,t);break}}static fromJSON(e){return new sc(e.width,e.height,e.depth,e.segments,e.radius)}}const fy=`
varying vec3 vN;
varying vec3 vPos;
void main() {
  vec4 w = modelMatrix * vec4(position, 1.0);
  vPos = w.xyz;
  vN = normalize(mat3(modelMatrix) * normal);
  gl_Position = projectionMatrix * viewMatrix * w;
}
`,dy=`
uniform samplerCube uEnv;
uniform int uEnvMode;
uniform float uEnvMip;
uniform vec3 uKeyDir;
uniform vec3 uKeyE;
uniform vec3 uFillDir;
uniform vec3 uFillE;
uniform vec3 uAlbedo;
uniform vec3 uEmissive;
uniform float uMetal;
uniform float uExposure;
uniform float uCabin;
varying vec3 vN;
varying vec3 vPos;
void main() {
  vec3 n = normalize(vN);
  if (!gl_FrontFacing) n = -n;
  vec3 v = normalize(cameraPosition - vPos);
  vec3 E = uKeyE * max(dot(n, uKeyDir), 0.0) + uFillE * max(dot(n, uFillDir) * 0.7 + 0.3, 0.0);
  vec3 env = vec3(0.0);
  if (uEnvMode == 1) env = textureLod(uEnv, n, uEnvMip).rgb / max(uExposure, 1e-30) * 3.14159;
  vec3 diffuse = uAlbedo / 3.14159 * (E + env + vec3(uCabin, uCabin * 0.85, uCabin * 0.8));
  vec3 h = normalize(uKeyDir + v);
  vec3 spec = uKeyE * pow(max(dot(n, h), 0.0), 60.0) * 0.25 * uMetal * step(0.0, dot(n, uKeyDir)) / 3.14159;
  vec3 refl = vec3(0.0);
  if (uEnvMode == 1) refl = textureLod(uEnv, reflect(-v, n), uEnvMip - 2.0).rgb / max(uExposure, 1e-30) * 0.08 * uMetal;
  vec3 col = (diffuse + spec + refl) * uExposure;
  // instrument glow keeps the cockpit faintly readable whatever the eye is adapted to
  col = max(col, uAlbedo * 0.03 * (0.6 + 0.4 * max(n.y, 0.0)));
  col = min(col + uEmissive, vec3(6e4));
  gl_FragColor = vec4(col, 1.0);
  #include <tonemapping_fragment>
  #include <colorspace_fragment>
}
`,py=`
varying vec3 vN;
varying vec3 vPos;
void main() {
  vec4 w = modelMatrix * vec4(position, 1.0);
  vPos = w.xyz;
  vN = normalize(mat3(modelMatrix) * normal);
  gl_Position = projectionMatrix * viewMatrix * w;
}
`,my=`
uniform samplerCube uEnv;
uniform int uEnvMode;
uniform float uExposure;
varying vec3 vN;
varying vec3 vPos;
void main() {
  vec3 v = normalize(vPos - cameraPosition);
  vec3 n = -normalize(vN);
  float fres = pow(1.0 - abs(dot(n, -v)), 5.0);
  vec3 refl = uEnvMode == 1 ? textureLod(uEnv, reflect(v, n), 1.0).rgb : vec3(0.0);
  // faint edge sheen so the canopy reads as glass, plus the real reflected sky
  vec3 c = refl * (0.02 + 0.25 * fres) + vec3(0.03, 0.05, 0.06) * fres * 0.4;
  gl_FragColor = vec4(min(c, vec3(4.0)), 1.0);
  #include <tonemapping_fragment>
  #include <colorspace_fragment>
}
`;class gy{group=new Ht;body=new Ht;materials=[];shared={uEnv:{value:null},uEnvMode:{value:0},uEnvMip:{value:6},uKeyDir:{value:new w(0,1,0)},uKeyE:{value:new w},uFillDir:{value:new w(0,-1,0)},uFillE:{value:new w},uExposure:{value:1},uCabin:{value:.02}};panelAnchors={};constructor(){this.group.add(this.body);const e=this.mat(2830648,.55),t=this.mat(1448221,.35),n=this.mat(3817544,.85),i=this.mat(2040616,.15),r=this.mat(856083,.2,new Ue(.05,.42,.62)),o=this.mat(856083,.2,new Ue(.75,.42,.08)),a=(x,E,A,R,L,b=0,M=0,P=0)=>{const D=new Ye(x,E);return D.position.set(A,R,L),D.rotation.set(b,M,P),this.body.add(D),D},l=(x,E,A,R=.02)=>new sc(x,E,A,3,R),c=new fo;c.moveTo(-1.08,-1),c.lineTo(-1.08,-.36),c.quadraticCurveTo(-1.07,-.32,-1,-.325),c.lineTo(-.62,-.44),c.quadraticCurveTo(-.56,-.455,-.555,-.5),c.lineTo(-.56,-1),c.closePath();const u=1.78,h=new Js(c,{depth:u,bevelEnabled:!0,bevelThickness:.018,bevelSize:.018,bevelSegments:3,curveSegments:12});a(h,e,u/2,0,0,0,-Math.PI/2);const f=new fo;f.moveTo(-1.07,-.33),f.quadraticCurveTo(-1.05,-.24,-.93,-.225),f.lineTo(-.9,-.23),f.lineTo(-1,-.33),f.closePath(),a(new Js(f,{depth:1.2,bevelEnabled:!0,bevelThickness:.01,bevelSize:.01,bevelSegments:2}),t,.6,0,0,0,-Math.PI/2),a(l(1.7,.012,.012,.005),r,0,-.505,-.545),a(l(1.1,.008,.008,.003),o,0,-.226,-.905);for(const x of[-1,1]){a(l(.34,.16,.95,.04),e,.6*x,-.6,-.12),a(l(.3,.012,.9,.005),t,.6*x,-.515,-.12);for(let E=0;E<4;E++)for(let A=0;A<2;A++){const R=(E+A)%3===0;a(l(.035,.012,.035,.006),R?r:t,.6*x+(A-.5)*.09,-.505,-.42+E*.07)}a(l(.07,.07,1.9,.025),n,.95*x,-.52,-.1)}a(new jn(.012,.016,.2,12),n,-.56,-.43,-.08,.35),a(l(.07,.05,.11,.02),i,-.56,-.33,-.12,.35),a(new jn(.014,.02,.22,12),n,.56,-.42,-.06,.12),a(new Wl(.026,.07,6,12),i,.56,-.29,-.075,.12),a(new di(.008,10,8),o,.56,-.24,-.08),a(l(.56,.12,.52,.05),i,0,-.74,.2),a(l(.58,.9,.13,.06),i,0,-.27,.5,-.13),a(l(.32,.2,.1,.05),i,0,.24,.56,-.13);for(const x of[-1,1])a(l(.08,.7,.2,.04),i,.29*x,-.33,.47,-.13);a(l(1.85,.05,2.1,.02),t,0,-1.02,.05);for(let x=0;x<5;x++)a(l(1.5,.006,.01,.003),x%2?t:r,0,-.993,-.75+x*.25);const d=new fo,p=.014,v=.022,g=.006;d.moveTo(-p+g,-v),d.lineTo(p-g,-v),d.quadraticCurveTo(p,-v,p,-v+g),d.lineTo(p,v-g),d.quadraticCurveTo(p,v,p-g,v),d.lineTo(-p+g,v),d.quadraticCurveTo(-p,v,-p,v-g),d.lineTo(-p,-v+g),d.quadraticCurveTo(-p,-v,-p+g,-v);const m=x=>{let E=new Js(d,{steps:96,bevelEnabled:!1,extrudePath:new Nh(x)});return E.deleteAttribute("uv"),E.deleteAttribute("normal"),E=r_(E,1e-4),E.computeVertexNormals(),a(E,e,0,0,0)};m([new w(-.93,-.5,-.96),new w(-.7,.18,-.86),new w(0,.5,-.66),new w(.7,.18,-.86),new w(.93,-.5,-.96)]),m([new w(-.95,-.5,.62),new w(-.72,.32,.6),new w(0,.62,.55),new w(.72,.32,.6),new w(.95,-.5,.62)]),m([new w(0,.5,-.66),new w(0,.64,-.05),new w(0,.62,.55)]);const _=new Ye(new di(1.25,48,24,0,Math.PI*2,0,Math.PI*.55),new Tt({vertexShader:py,fragmentShader:my,uniforms:{uEnv:this.shared.uEnv,uEnvMode:this.shared.uEnvMode,uExposure:this.shared.uExposure},transparent:!0,depthWrite:!1,side:Lt,blending:nr}));_.position.set(0,-.48,-.15),_.renderOrder=20,this.body.add(_);const y=(x,E,A,R,L,b)=>{const M=new dt;M.position.set(E,A,R),M.rotation.set(L,b,0,"YXZ"),this.body.add(M),this.panelAnchors[x]=M};y("left",-.52,-.385,-.78,-.42,.32),y("center",0,-.37,-.81,-.42,0),y("right",.52,-.385,-.78,-.42,-.32),y("status",0,-.17,-.97,-.12,0),y("legend",.6,-.49,-.25,-1.2,-.5),y("menu",-.6,-.495,-.3,-1.25,.4)}mat(e,t,n=new Ue(0,0,0)){const i=wl(this.shared,e,t,n);return this.materials.push(i),i}setDeformation(e){this.body.matrixAutoUpdate=!1,this.body.matrix.copy(e),this.body.matrixWorldNeedsUpdate=!0}}function wl(s,e,t,n=new Ue(0,0,0)){const i=new Ue(e);return new Tt({vertexShader:fy,fragmentShader:dy,uniforms:{...s,uAlbedo:{value:new w(i.r,i.g,i.b).multiplyScalar(1.6)},uEmissive:{value:new w(n.r,n.g,n.b)},uMetal:{value:t}},side:cn})}function vy(s){const e=new Ht,t=wl(s,1909288,.4),n=wl(s,4870232,.8),i=new Ye(new jn(1.6,1.6,.06,48),t);i.position.y=-1.25,e.add(i);const r=new Ye(new jl(1.5,.025,8,64),n);r.rotation.x=Math.PI/2,r.position.y=-.25,e.add(r);for(let o=0;o<12;o++){const a=o/12*Math.PI*2,l=new Ye(new jn(.02,.02,1,8),n);l.position.set(Math.cos(a)*1.5,-.75,Math.sin(a)*1.5),e.add(l)}return e}const ba=2e3,nf=`
varying vec3 vWorld;
void main() {
  vec4 w = modelMatrix * vec4(position, 1.0);
  vWorld = w.xyz;
  gl_Position = projectionMatrix * viewMatrix * w;
}
`,sf=`
uniform sampler2D uBB;
uniform float uExposure;
uniform mat3 uToBody;       // scene (ship) frame → body-fixed frame
uniform vec3 uOrigin;       // eye position relative to body centre, body-fixed, in equatorial radii
uniform float uC;           // |origin|^2 - 1, computed in double precision on the CPU
uniform float uFlat;        // flattening (a - c)/a
uniform vec3 uSunDir;       // body-fixed unit vector toward the star (planets/moons)
uniform float uSunE;        // illuminance from the star at the body (lux)
uniform float uSunT;        // star temperature (K)
uniform float uSunAng;      // star angular radius seen from the body (rad)
uniform float uTime;        // simulation time (s)
uniform float uRadius;      // equatorial radius (m)
uniform float uPixelAngle;  // rad per pixel (approx)
uniform vec4 uOcc[4];       // occluders: centre (body-fixed, radii) + radius (radii)
uniform int uOccN;
uniform int uOct;           // octave budget from the quality setting (VR performance)
varying vec3 vWorld;
${ic}
${ws}

vec3 rayDir() { return normalize(uToBody * normalize(vWorld - cameraPosition)); }

// sun visibility from point p (body-fixed, radii) given occluding spheres
float sunVisibility(vec3 p) {
  float vis = 1.0;
  for (int i = 0; i < 4; i++) {
    if (i >= uOccN) break;
    vec3 c = uOcc[i].xyz - p;
    float dist = length(c);
    if (dot(c, uSunDir) <= 0.0) continue;
    float ang = acos(clamp(dot(c / dist, uSunDir), -1.0, 1.0));
    float rOcc = asin(clamp(uOcc[i].w / dist, 0.0, 1.0));
    float rs = max(uSunAng, 1e-5);
    // fraction of the solar disk hidden (smooth overlap approximation)
    float cover = 1.0 - smoothstep(abs(rOcc - rs), rOcc + rs, ang);
    float maxCover = min(1.0, (rOcc * rOcc) / (rs * rs));
    vis *= 1.0 - cover * maxCover;
  }
  return vis;
}

vec3 sunColor() { return bbChroma(uSunT); }

vec4 finish(vec3 radiance, float alpha) {
  // keep within half-float range (metering targets); tone mapping saturates long before
  return vec4(min(radiance * uExposure, vec3(6e4)), alpha);
}
`,xy=`
${sf}
uniform int uStyle;          // 0 jupiter, 1 io, 2 europa, 3 ganymede, 4 callisto
uniform vec3 uAlbedo;
uniform float uAtmTop;       // shell top above surface (radii)
uniform float uAtmH;         // scale height (radii)
uniform float uAtmTau;       // vertical optical depth at the reference level

float bandProfile(float lat) {
  // Jupiter's belts (dark) and zones (light), latitudes in degrees, smoothed
  float d = degrees(lat);
  float v = 0.0;
  v += smoothstep(6.0, 8.0, d) * (1.0 - smoothstep(17.0, 19.0, d));       // NEB
  v += 0.8 * smoothstep(24.0, 25.5, d) * (1.0 - smoothstep(29.0, 31.0, d)); // NTB
  v += 0.6 * smoothstep(35.0, 36.5, d) * (1.0 - smoothstep(39.0, 41.0, d)); // NNTB
  v += smoothstep(6.5, 8.5, -d) * (1.0 - smoothstep(19.0, 21.0, -d));      // SEB
  v += 0.75 * smoothstep(27.0, 28.5, -d) * (1.0 - smoothstep(32.0, 34.0, -d)); // STB
  v += 0.55 * smoothstep(38.0, 39.5, -d) * (1.0 - smoothstep(42.0, 44.0, -d)); // SSTB
  return clamp(v, 0.0, 1.0);
}

float windProfile(float lat) {
  // zonal wind (m/s): fast prograde jets at belt/zone boundaries
  float d = degrees(lat);
  return 100.0 * sin(radians(d) * 14.0) * exp(-abs(d) / 45.0) + 40.0 * exp(-d * d / 60.0) + 140.0 * exp(-(d - 23.5) * (d - 23.5) / 3.0);
}

vec3 jupiterAlbedo(vec3 n, float footprint) {
  float lat = asin(clamp(n.z, -1.0, 1.0));
  // differential rotation: each latitude drifts with its zonal wind; patterns are
  // re-seeded every few days with a cross-fade to bound shear
  float life = 4.0 * 86400.0;
  vec3 acc = vec3(0.0);
  for (int k = 0; k < 2; k++) {
    float ph = uTime / life + 0.5 * float(k);
    float f = fract(ph);
    float w = 1.0 - abs(2.0 * f - 1.0);
    float drift = windProfile(lat) * f * life / (uRadius * max(cos(lat), 0.05));
    float c = cos(-drift), s = sin(-drift);
    vec3 p = vec3(c * n.x - s * n.y, s * n.x + c * n.y, n.z) + floor(ph) * 3.7;
    // anisotropic turbulence: stretched along longitude
    vec3 q = p * vec3(6.0, 6.0, 26.0);
    vec3 warp = vec3(fbm(q * 0.7, min(5, uOct), footprint * 6.0), fbm(q * 0.7 + 7.1, min(5, uOct), footprint * 6.0), 0.0) - 0.5;
    float turb = smoothstep(0.25, 0.75, fbm(q + warp * 3.0, min(11, uOct), footprint * 26.0));
    float fine = smoothstep(0.2, 0.8, fbm(q * 6.0 + warp * 8.0, min(8, uOct), footprint * 160.0));
    float latp = lat + 0.035 * (turb - 0.5) + 0.006 * (fine - 0.5);
    float belt = bandProfile(latp);
    vec3 zone = mix(vec3(0.92, 0.86, 0.74), vec3(0.98, 0.95, 0.88), fine);
    vec3 beltC = mix(vec3(0.50, 0.30, 0.18), vec3(0.70, 0.50, 0.33), turb);
    vec3 col = mix(zone, beltC, belt);
    // eddies and filaments within bands
    float eddy = smoothstep(0.42, 0.62, fbm(q * 2.3 + warp * 6.0 + 11.0, min(9, uOct), footprint * 60.0));
    // thin bright/dark filaments (ridged turbulence)
    float fil = 1.0 - abs(2.0 * fbm(q * 4.1 + warp * 10.0 + 23.0, min(9, uOct), footprint * 110.0) - 1.0);
    col *= 0.85 + 0.3 * smoothstep(0.75, 0.95, fil);
    col = mix(col, col * vec3(0.78, 0.7, 0.62), eddy * 0.55);
    col *= 0.78 + 0.44 * mix(turb, fine, 0.45);
    // equatorial zone ochre tint and festoons
    col = mix(col, vec3(0.86, 0.72, 0.52), 0.35 * exp(-degrees(lat) * degrees(lat) / 30.0) * smoothstep(0.45, 0.75, fine));
    // polar regions: bluish haze with cyclone speckle
    float pol = smoothstep(radians(45.0), radians(60.0), abs(lat));
    col = mix(col, vec3(0.55, 0.56, 0.58) * (0.8 + 0.4 * fine), pol);
    acc += w * col;
  }
  // Great Red Spot (~16,000 x 12,000 km) at 22.5°S, slowly drifting in longitude
  float lon = atan(n.y, n.x);
  float grsLon = 1.2 - uTime * 2.0e-7;
  float dl = atan(sin(lon - grsLon), cos(lon - grsLon));
  vec2 e = vec2(dl / 0.24, (lat + radians(22.5)) / 0.085);
  float rr = length(e);
  float swirl = fbm(vec3(e * 4.0 + vec2(cos(rr * 6.0 - uTime * 4e-5), sin(rr * 6.0 - uTime * 4e-5)), 3.0), 6, footprint * 40.0);
  float grs = 1.0 - smoothstep(0.65, 1.05, rr + 0.15 * (swirl - 0.5));
  acc = mix(acc, mix(vec3(0.78, 0.40, 0.26), vec3(0.88, 0.55, 0.38), swirl), grs * 0.9);
  float collar = smoothstep(0.85, 1.0, rr) * (1.0 - smoothstep(1.0, 1.25, rr));
  acc = mix(acc, vec3(0.95, 0.92, 0.85), collar * 0.5);
  return acc;
}

vec3 moonAlbedo(vec3 n, float footprint) {
  vec3 p = n * 4.0;
  float a = fbm(p, min(9, uOct), footprint * 4.0);
  float b = fbm(p * 3.0 + 11.0, min(8, uOct), footprint * 12.0);
  if (uStyle == 1) { // Io: sulfur plains, red rings, dark paterae
    vec3 col = mix(vec3(0.92, 0.84, 0.45), vec3(0.95, 0.93, 0.8), smoothstep(0.4, 0.7, a));
    col = mix(col, vec3(0.75, 0.38, 0.2), smoothstep(0.62, 0.72, b) * 0.6);
    vec3 cell = floor(n * 9.0);
    vec3 h = hash33(cell);
    float spot = 1.0 - smoothstep(0.0, 0.12, length(fract(n * 9.0) - h) - 0.02);
    col = mix(col, vec3(0.12, 0.08, 0.05), spot * step(0.6, h.x));
    return col;
  }
  if (uStyle == 2) { // Europa: bright ice with reddish lineae
    float lines = 1.0 - smoothstep(0.0, 0.035, abs(fbm(p * vec3(1.0, 2.0, 1.0) + 3.0, min(7, uOct), footprint * 6.0) - 0.5));
    float lines2 = 1.0 - smoothstep(0.0, 0.02, abs(b - 0.5));
    vec3 col = mix(vec3(0.9, 0.87, 0.8), vec3(0.78, 0.7, 0.6), a * 0.6);
    return mix(col, vec3(0.55, 0.32, 0.2), max(lines, lines2) * 0.7);
  }
  if (uStyle == 3) { // Ganymede: dark cratered + bright grooved terrain
    vec3 col = mix(vec3(0.36, 0.33, 0.29), vec3(0.68, 0.66, 0.62), smoothstep(0.45, 0.6, a));
    return col * (0.85 + 0.3 * b);
  }
  // Callisto: dark, saturated with bright crater ejecta
  vec3 col = vec3(0.24, 0.22, 0.2) * (0.8 + 0.4 * b);
  vec3 cell = floor(n * 14.0);
  vec3 h = hash33(cell + 5.0);
  float d = length(fract(n * 14.0) - h);
  return mix(col, vec3(0.75, 0.73, 0.7), (1.0 - smoothstep(0.03, 0.1, d)) * 0.8);
}

// single scattering through an exponential shell, numerically (Rayleigh + haze).
// Works in the spheroid's scaled frame (os = o*S, ds = d*S) so altitude is
// measured from the oblate cloud deck, not from a sphere.
vec3 atmosphere(vec3 os, vec3 ds, float A, float tMax, inout float trans) {
  if (uAtmTau <= 0.0) return vec3(0.0);
  float R1 = 1.0 + uAtmTop;
  float b = dot(os, ds);
  float c = dot(os, os) - R1 * R1;
  float disc = b * b - A * c;
  if (disc <= 0.0) return vec3(0.0);
  float sq = sqrt(disc);
  float t0 = max(0.0, (-b - sq) / A);
  float t1 = min(tMax, (-b + sq) / A);
  if (t1 <= t0) return vec3(0.0);
  const int N = 10;
  float dt = (t1 - t0) / float(N);
  vec3 betaR = vec3(0.32, 0.6, 1.0);    // λ^-4 weighting (relative)
  vec3 d = normalize(ds);
  float mu = dot(d, uSunDir);
  float pR = 0.75 * (1.0 + mu * mu);
  float g = 0.72;
  float pM = (1.0 - g * g) / pow(1.0 + g * g - 2.0 * g * mu, 1.5);
  vec3 sum = vec3(0.0);
  vec3 Tview = vec3(1.0);
  for (int i = 0; i < N; i++) {
    vec3 p = os + ds * (t0 + (float(i) + 0.5) * dt);
    float r = length(p);
    float h = r - 1.0;
    float rho = exp(clamp(-h / uAtmH, -60.0, 8.0));
    vec3 n = p / r;
    float cosZ = dot(n, uSunDir);
    // sun path optical depth: Chapman-like grazing column through the tangent altitude
    float tauSun;
    if (cosZ > 0.0) {
      float airmass = 1.0 / (cosZ + 0.15 * pow(1.0 - cosZ, 4.0) * 0.5 + 0.02 * sqrt(uAtmH));
      tauSun = uAtmTau * rho * min(airmass, sqrt(6.2832 * r / uAtmH));
    } else {
      float hmin = r * sqrt(max(1.0 - cosZ * cosZ, 0.0)) - 1.0;
      if (hmin < 0.0) { tauSun = 1e4; }
      else tauSun = uAtmTau * exp(clamp(-hmin / uAtmH, -60.0, 8.0)) * sqrt(6.2832 * r / uAtmH) * 2.0;
    }
    float lit = 1.0;
    vec3 dTau = uAtmTau * rho * dt / uAtmH * (0.55 * betaR + 0.45 * vec3(1.0));
    vec3 Tsun = exp(-min(tauSun, 60.0) * (0.55 * betaR + 0.45));
    vec3 scatter = (0.55 * betaR * pR + 0.45 * vec3(pM)) / (4.0 * 3.14159);
    sum += Tview * min(dTau, vec3(30.0)) * scatter * Tsun * lit;
    Tview *= exp(-min(dTau, vec3(30.0)));
  }
  trans = (Tview.r + Tview.g + Tview.b) / 3.0;
  return sum * uSunE * sunColor();
}

void main() {
  vec3 d = rayDir();
  vec3 o = uOrigin;
  vec3 S = vec3(1.0, 1.0, 1.0 / (1.0 - uFlat));
  vec3 os = o * S, ds = d * S;
  float A = dot(ds, ds);
  float B = dot(os, ds);
  float C = uFlat > 0.0 ? dot(os, os) - 1.0 : uC;
  float disc = B * B - A * C;
  float tHit = 1e30;
  vec3 color = vec3(0.0);
  float alpha = 0.0;
  if (disc > 0.0) {
    float t = (-B - sqrt(disc)) / A;
    if (t > 0.0) {
      tHit = t;
      vec3 p = o + d * t;
      vec3 n = normalize(p * S * S);
      float footprint = t * uPixelAngle;
      vec3 alb = (uStyle == 0 ? jupiterAlbedo(normalize(p * S), footprint) : moonAlbedo(normalize(p), footprint)) * uAlbedo;
      float mu0 = dot(n, uSunDir);
      float mu = max(dot(n, -d), 0.0);
      // Minnaert law (k = 0.9) for cloud decks, Lambert-ish for moons
      float k = uStyle == 0 ? 0.9 : 0.75;
      float lam = mu0 > 0.0 ? pow(mu0, k) * pow(max(mu, 0.02), k - 1.0) : 0.0;
      // soft terminator from the finite solar disk
      lam *= smoothstep(-uSunAng, uSunAng, mu0);
      float vis = sunVisibility(p);
      color = alb * (uSunE / 3.14159) * lam * vis * sunColor();
      alpha = 1.0;
    }
  }
  float trans = 1.0;
  vec3 atm = atmosphere(os, ds, A, tHit, trans);
  color = color * trans + atm;
  // fade alpha for atmosphere-only fragments: additive (premultiplied, alpha 0)
  gl_FragColor = finish(color, alpha);
  if (alpha == 0.0 && dot(atm, atm) <= 0.0) discard;
  #include <tonemapping_fragment>
  #include <colorspace_fragment>
}
`,_y=`
${sf}
uniform float uTeff;
uniform int uStarStyle;     // 0 sun-like (granulation), 1 red supergiant (giant cells)
uniform float uCellSize;    // granule size / radius

// Worley F1, F2
vec2 worley(vec3 p) {
  vec3 i = floor(p);
  vec3 f = fract(p);
  float f1 = 8.0, f2 = 8.0;
  for (int x = -1; x <= 1; x++)
  for (int y = -1; y <= 1; y++)
  for (int z = -1; z <= 1; z++) {
    vec3 g = vec3(x, y, z);
    vec3 o = hash33(i + g);
    float dd = length(g + o - f);
    if (dd < f1) { f2 = f1; f1 = dd; } else if (dd < f2) f2 = dd;
  }
  return vec2(f1, f2);
}

float granulation(vec3 n, float freq, float footprint, float tphase, float lane) {
  float lod = footprint * freq;
  if (lod > 1.2) return 0.5;
  vec3 q = n * freq + vec3(0.0, 0.0, tphase);
  vec2 w = worley(q + 0.35 * (vec3(vnoise(q * 0.7), vnoise(q * 0.7 + 9.0), vnoise(q * 0.7 + 4.0)) - 0.5));
  // bright upflowing cell interiors, darker cooler intergranular lanes
  float g = smoothstep(0.0, lane, w.y - w.x) * (1.0 - 0.6 * smoothstep(0.2, 0.9, w.x));
  return mix(g, 0.5, smoothstep(0.4, 1.2, lod));
}

void main() {
  vec3 d = rayDir();
  vec3 o = uOrigin;
  float B = dot(o, d);
  float disc = B * B - uC;
  if (disc <= 0.0) discard;
  float t = -B - sqrt(disc);
  if (t <= 0.0) discard;
  vec3 p = o + d * t;
  vec3 n = normalize(p);
  float mu = max(dot(n, -d), 0.0);
  float footprint = t * uPixelAngle;
  float T = uTeff;
  float bright = 1.0;
  if (uStarStyle == 0) {
    // granules (~1,000 km) evolving over ~10 min, supergranules (~30,000 km)
    float g = granulation(n, 1.0 / uCellSize, footprint, uTime / 600.0, 0.5);
    float sg = fbm(n * 25.0 + uTime * 1e-6, min(5, uOct), footprint * 25.0);
    T *= 1.0 + 0.035 * (g - 0.5) + 0.01 * (sg - 0.5);
    // a few sunspots
    for (int i = 0; i < 3; i++) {
      vec3 h = hash33(vec3(float(i) * 7.0, 3.0, 1.0));
      float lat = (h.x - 0.5) * 0.6;
      float lon = h.y * 6.283 + uTime * 2.8e-6;
      vec3 c = vec3(cos(lat) * cos(lon), cos(lat) * sin(lon), sin(lat));
      float r = acos(clamp(dot(n, c), -1.0, 1.0)) / (0.012 + 0.02 * h.z);
      float umbra = 1.0 - smoothstep(0.35, 0.5, r);
      float pen = 1.0 - smoothstep(0.8, 1.0, r + 0.1 * fbm(n * 300.0, min(4, uOct), footprint * 300.0));
      T = mix(T, 4200.0, pen * 0.6);
      T = mix(T, 3600.0, umbra);
    }
  } else {
    // red supergiant: a handful of enormous convection cells plus smaller ones
    // red supergiant: a handful of convection cells comparable to the stellar radius
    // (cf. 3D RHD models, Freytag/Chiavassa) with blotchy, irregular plumes
    vec3 wq = n * 1.6 + 0.6 * (vec3(fbm(n * 2.0, 4, footprint * 2.0), fbm(n * 2.0 + 5.0, 4, footprint * 2.0), fbm(n * 2.0 + 9.0, 4, footprint * 2.0)) - 0.5);
    float big = granulation(normalize(wq), 2.0, footprint, uTime / (86400.0 * 200.0), 1.4);
    float mid = fbm(n * 7.0 + big * 2.0, min(7, uOct), footprint * 7.0);
    float small = fbm(n * 45.0, min(6, uOct), footprint * 45.0);
    T *= 1.0 + 0.16 * (big - 0.5) + 0.09 * (mid - 0.5) + 0.03 * (small - 0.5);
  }
  // limb darkening (quadratic law); cooler, redder limb
  float limb = 0.3 + 0.93 * mu - 0.23 * mu * mu;
  if (uStarStyle == 1) limb = 0.12 + 1.2 * mu - 0.32 * mu * mu;
  float Tl = T * (0.86 + 0.14 * pow(mu, 0.5));
  vec3 rad = bbChroma(Tl) * pow(10.0, bbLogL(T)) * limb * bright;
  gl_FragColor = finish(rad, 1.0);
  #include <tonemapping_fragment>
  #include <colorspace_fragment>
}
`,yy=`
varying vec2 vUv;
void main() {
  vUv = uv * 2.0 - 1.0;
  // camera-facing quad in scaled space
  vec4 c = viewMatrix * modelMatrix * vec4(0.0, 0.0, 0.0, 1.0);
  float s = length(modelMatrix[0].xyz);
  gl_Position = projectionMatrix * (c + vec4(position.xy * s, 0.0, 0.0));
}
`,My=`
uniform sampler2D uBB;
uniform float uExposure;
uniform float uE;           // illuminance at the eye (lux) from the whole body
uniform float uT;           // colour temperature (K)
uniform float uHalfAngle;   // angular half-size of the quad (rad)
uniform float uPixelAngle;
uniform float uResolved;    // 0 = point source, 1 = resolved disc (core handled by body shader)
uniform float uGlare;       // glare strength (0 for planets)
varying vec2 vUv;
${ws}
void main() {
  float th = length(vUv) * uHalfAngle;
  float sigma = 0.8 * uPixelAngle;
  float core = (1.0 - uResolved) * uE * exp(-0.5 * th * th / (sigma * sigma)) / (6.2832 * sigma * sigma);
  // CIE/Stiles–Holladay veiling glare: L = 10 E / θ²(deg), softened near the core
  float thd = degrees(max(th, 0.0));
  float glare = uGlare * 10.0 * uE / (thd * thd + 0.02) * (1.0 - smoothstep(0.6, 1.0, length(vUv)));
  vec3 c = bbChroma(uT) * (core + glare);
  gl_FragColor = vec4(min(c * uExposure, vec3(6e4)), 0.0);
  #include <tonemapping_fragment>
  #include <colorspace_fragment>
}
`;function rf(s){return{uBB:{value:s},uExposure:{value:1},uToBody:{value:new Ce},uOrigin:{value:new w(0,0,3)},uC:{value:8},uFlat:{value:0},uSunDir:{value:new w(1,0,0)},uSunE:{value:0},uSunT:{value:5772},uSunAng:{value:.001},uTime:{value:0},uRadius:{value:1},uPixelAngle:{value:.0015},uOcc:{value:[0,1,2,3].map(()=>new He(0,0,0,0))},uOccN:{value:0},uOct:{value:11}}}const of={transparent:!0,depthTest:!1,depthWrite:!1,side:Lt,blending:th,blendSrc:nh,blendDst:go,blendEquation:li};function Sy(s,e,t,n){return new Tt({vertexShader:nf,fragmentShader:xy,uniforms:{...rf(s),uStyle:{value:e},uAlbedo:{value:new w(t.r,t.g,t.b)},uAtmTop:{value:n?.top??0},uAtmH:{value:n?.H??.01},uAtmTau:{value:n?.tau??0}},...of})}function by(s,e,t,n){return new Tt({vertexShader:nf,fragmentShader:_y,uniforms:{...rf(s),uTeff:{value:e},uStarStyle:{value:t},uCellSize:{value:n}},...of})}function Ty(s,e,t){return new Tt({vertexShader:yy,fragmentShader:My,uniforms:{uBB:{value:s},uExposure:{value:1},uE:{value:0},uT:{value:e},uHalfAngle:{value:.05},uPixelAngle:{value:.0015},uResolved:{value:0},uGlare:{value:t}},transparent:!0,depthTest:!1,depthWrite:!1,blending:nr})}const Ey=new $l(1,5),wy=new Zn(2,2),Qe=299792458,Ai=66743e-15,er=5670374419e-17,rc=198847e25,Al=6957e5,Rl=149597870700,An=9.80665,Ay=167262192369e-38,Ry=66524587321e-39,Cy=3600,En=86400,af=365.25*En,oc=s=>Ai*s/(Qe*Qe),Py=s=>Ai*s/(Qe*Qe*Qe),Ly=s=>4*Math.PI*Ai*s*Ay*Qe/Ry,Iy={jupiter:0,io:1,europa:2,ganymede:3,callisto:4},Dy={jupiter:16777215,io:13156512,europa:13683906,ganymede:9209728,callisto:6051408};class Ny{constructor(e,t,n){this.world=e;for(const i of e.bodies){const r=i.def;let o,a=r.radius*1.03;if(r.kind==="star"){const f=r.style==="sun";o=by(t,r.Teff,f?0:1,f?1e6/r.radius:.05)}else{const f=r.atmosphere?{top:r.atmosphere.top/r.radius,H:r.atmosphere.scaleHeight*1.5/r.radius,tau:.12}:void 0;f&&(a=r.radius*(1+f.top)*1.02);const d=new Ue(Dy[r.style]??8947848),p=.2126*d.r+.7152*d.g+.0722*d.b,v=(r.albedo??.4)/(p*(r.style==="jupiter"?.8:.6));o=Sy(t,Iy[r.style]??3,d.multiplyScalar(v),f),o.uniforms.uFlat.value=r.flattening??0}o.uniforms.uExposure=n,o.uniforms.uRadius.value=r.radius;const l=new Ye(Ey,o);l.frustumCulled=!1;const c=Ty(t,r.Teff??5772,r.kind==="star"?.25:0);c.uniforms.uExposure=n;const u=new Ye(wy,c);u.frustumCulled=!1,this.group.add(l,u);const h={state:i,mesh:l,glow:u,mat:o,glowMat:c,bound:a};r.kind==="star"&&(h.Lstar=cs(r.Teff).L),this.vis.push(h)}if(e.def.skyFrame==="ecliptic"){const i=$t.degToRad(23.4393),r=new Ce().set(1,0,0,0,Math.cos(i),-Math.sin(i),0,Math.sin(i),Math.cos(i)),o=new Ce().set(-.0548755604,-.8734370902,-.4838350155,.4941094279,-.44482963,.7469822445,-.867666149,-.1980763734,.4559837762);this.worldToGal=o.multiply(r)}else this.worldToGal=new Ce().setFromMatrix4(new Le().makeRotationFromEuler(new Xt(.4,1.9,-.7)))}group=new Ht;vis=[];skyRotBodyToGal=new Ce;betaBody=new w;worldToGal;starLight(e,t){let n=null;for(const i of this.vis){if(i.state.def.kind!=="star")continue;const r=i.state,o=[r.pos[0]-e[0],r.pos[1]-e[1],r.pos[2]-e[2]],a=Math.hypot(...o),l=Math.asin(Math.min(1,r.def.radius/a));let c=i.Lstar*Math.PI*Math.sin(l)**2;for(const u of this.vis){if(u.state===t||u.state.def.kind==="star")continue;const h=[u.state.pos[0]-e[0],u.state.pos[1]-e[1],u.state.pos[2]-e[2]],f=Math.hypot(...h);if(f>a)continue;const d=Math.acos(Math.max(-1,Math.min(1,(h[0]*o[0]+h[1]*o[1]+h[2]*o[2])/(f*a)))),p=Math.asin(Math.min(1,u.state.def.radius/f)),v=1-$t.smoothstep(d,Math.abs(p-l),p+l);c*=1-v*Math.min(1,p*p/(l*l))}(!n||c>n.E)&&(n={dir:[o[0]/a,o[1]/a,o[2]/a],E:c,T:r.def.Teff,ang:l})}return n}update(e){const t=this.world,n=new Ce().setFromMatrix4(new Le().makeRotationFromQuaternion(t.q)),i=n.clone().transpose();this.skyRotBodyToGal.copy(this.worldToGal).multiply(n);const r=t.vel;this.betaBody.set(r[0]/Qe,r[1]/Qe,r[2]/Qe).applyMatrix3(i);const o=[...this.vis].sort((u,h)=>Xu(h.state.pos,t.pos)-Xu(u.state.pos,t.pos)),a={keyDir:new w(0,1,0),keyE:new w,fillDir:new w(0,-1,0),fillE:new w},l=this.starLight(t.pos);if(l){a.keyDir.set(...l.dir).applyMatrix3(i);const u=cs(l.T).rgb;a.keyE.set(u[0],u[1],u[2]).multiplyScalar(l.E)}let c=0;return o.forEach((u,h)=>{const f=u.state,d=f.def,p=[f.pos[0]-t.pos[0],f.pos[1]-t.pos[1],f.pos[2]-t.pos[2]],v=Math.hypot(...p),g=new w(p[0]/v,p[1]/v,p[2]/v).applyMatrix3(i),m=ba/v;u.mesh.position.copy(g).multiplyScalar(ba),u.mesh.scale.setScalar(u.bound*m),u.mesh.renderOrder=-500+h*2;const _=f.rot.clone().transpose(),y=_.clone().multiply(n),x=u.mat.uniforms;x.uToBody.value.copy(y);const E=new w(-p[0],-p[1],-p[2]).applyMatrix3(_).divideScalar(d.radius);x.uOrigin.value.copy(E),x.uC.value=(v-d.radius)*(v+d.radius)/(d.radius*d.radius),x.uTime.value=t.t,x.uPixelAngle.value=e;const A=Math.asin(Math.min(1,d.radius/v));let R=0;if(d.kind!=="star"){const M=this.starLight(f.pos,f);if(M){x.uSunDir.value.set(...M.dir).applyMatrix3(_),x.uSunE.value=M.E,x.uSunT.value=M.T,x.uSunAng.value=M.ang;const O=.5*(1+-(M.dir[0]*p[0]+M.dir[1]*p[1]+M.dir[2]*p[2])/v);if(R=(d.albedo??.3)*M.E/Math.PI*Math.PI*Math.sin(A)**2*O,R>c){c=R,a.fillDir.copy(g);const V=cs(M.T).rgb,B=d.style==="jupiter"?[1,.85,.65]:[1,1,1];a.fillE.set(V[0]*B[0],V[1]*B[1],V[2]*B[2]).multiplyScalar(R)}}let P=0;for(const D of this.vis){if(D===u||D.state.def.kind==="star"||P>=4)continue;const O=new w(D.state.pos[0]-f.pos[0],D.state.pos[1]-f.pos[1],D.state.pos[2]-f.pos[2]).applyMatrix3(_).divideScalar(d.radius);x.uOcc.value[P].set(O.x,O.y,O.z,D.state.def.radius/d.radius),P++}x.uOccN.value=P}else R=u.Lstar*Math.PI*Math.sin(A)**2;const L=u.glowMat.uniforms,b=d.kind==="star"?Math.min(.35,Math.max(A*3,.05)):Math.max(A*1.5,e*4);u.glow.position.copy(u.mesh.position),u.glow.scale.setScalar(Math.tan(b)*ba),u.glow.renderOrder=-500+h*2+1,L.uE.value=R,L.uHalfAngle.value=b,L.uPixelAngle.value=e,L.uResolved.value=$t.smoothstep(A/e,.4,1.5),d.kind!=="star"&&(L.uT.value=x.uSunT.value),u.glow.visible=d.kind==="star"||L.uResolved.value<1}),a}setOctaves(e){for(const t of this.vis)t.mat.uniforms.uOct.value=e}dispose(){for(const e of this.vis)e.mat.dispose(),e.glowMat.dispose()}}const Xu=(s,e)=>Math.hypot(s[0]-e[0],s[1]-e[1],s[2]-e[2]),lf=`
float A2;

float ksR(vec3 x) {
  float b = dot(x, x) - A2;
  return sqrt(max(0.5 * (b + sqrt(b * b + 4.0 * A2 * x.z * x.z)), 1e-10));
}

// metric pieces at x: returns f, writes l
float ksF(vec3 x, out vec3 l) {
  float a = uSpin;
  float r = ksR(x);
  float r2 = r * r;
  float A = r2 + A2;
  l = vec3((r * x.x + a * x.y) / A, (r * x.y - a * x.x) / A, x.z / r);
  return 2.0 * r2 * r / (r2 * r2 + A2 * x.z * x.z);
}

vec4 lowerKS(vec3 x, vec4 v) {
  vec3 l;
  float f = ksF(x, l);
  float lv = v.x + dot(l, v.yzw);
  return vec4(-v.x + f * lv, v.yzw + f * lv * l);
}

float dotKS(vec3 x, vec4 u, vec4 v) {
  vec3 l;
  float f = ksF(x, l);
  float lu = u.x + dot(l, u.yzw);
  float lv = v.x + dot(l, v.yzw);
  return -u.x * v.x + dot(u.yzw, v.yzw) + f * lu * lv;
}

// Hamilton's equations, analytic gradient (mirror of src/physics/kerr.ts geodesicDeriv)
void deriv(vec3 x, vec3 p, float pt, out vec3 dx, out float dt, out vec3 dp) {
  float a = uSpin;
  float z = x.z, z2 = z * z;
  float r = ksR(x);
  float r2 = r * r, r3 = r2 * r;
  float iD = 1.0 / (r2 * r2 + A2 * z2);
  float f = 2.0 * r3 * iD;
  float A = r2 + A2;
  float iA = 1.0 / A;
  vec3 l = vec3((r * x.x + a * x.y) * iA, (r * x.y - a * x.x) * iA, z / r);
  float q = -pt + dot(l, p);
  float fq = f * q;
  dt = -pt + fq;
  dx = p - fq * l;
  vec3 dr = vec3(r3 * x.x * iD, r3 * x.y * iD, r * z * A * iD);
  float cf = 2.0 * r2 * (3.0 * A2 * z2 - r2 * r2) * iD * iD;
  vec3 df = cf * dr;
  df.z -= 4.0 * A2 * z * r3 * iD * iD;
  float W = (x.x * p.x + x.y * p.y) * iA - (l.x * p.x + l.y * p.y) * 2.0 * r * iA - p.z * z / r2;
  vec3 dq = W * dr + vec3((r * p.x - a * p.y) * iA, (a * p.x + r * p.y) * iA, p.z / r);
  dp = 0.5 * q * q * df + fq * dq;
}

// enforce H = 0 keeping p_t and the direction of travel (see renormalizeNull in kerr.ts)
vec3 nullMomentum(vec3 x, vec3 dir, float pt) {
  vec3 l;
  float f = ksF(x, l);
  float c = dot(l, dir);
  float A = 1.0 - f * c * c;
  float B = 2.0 * f * pt * c;
  float C = -(1.0 + f) * pt * pt;
  float disc = sqrt(max(B * B - 4.0 * A * C, 0.0));
  float m1 = (-B + disc) / (2.0 * A);
  float m2 = (-B - disc) / (2.0 * A);
  float v1 = m1 - f * (-pt + m1 * c) * c;
  return dir * (v1 > 0.0 ? m1 : m2);
}

// remaining weak-field deflection from position x moving along unit v toward infinity
vec3 asymptoticDir(vec3 x, vec3 v) {
  float s0 = dot(x, v);
  vec3 bvec = x - s0 * v;
  float b = length(bvec);
  if (b < 1e-4) return v;
  float defl = (2.0 / b) * (1.0 - s0 / sqrt(b * b + s0 * s0));
  return normalize(v - defl * bvec / b);
}

`,Uy=`
precision highp float;
uniform int uFace;            // 0..5 cube face, 6 = perspective (telescope)
uniform vec2 uRes;
uniform mat3 uPersp;          // perspective: columns = right, up, back (observer body frame)
uniform vec2 uTanHalf;
uniform vec4 uE0;
uniform vec4 uE1;
uniform vec4 uE2;
uniform vec4 uE3;
uniform vec3 uCamPos;
uniform float uCamT;
uniform float uSpin;
uniform float uRplus;
uniform float uDiskIn;
uniform float uDiskOut;
uniform int uDiskOn;
uniform sampler2D uDiskTemp;  // normalised T(r) on log r grid [uDiskIn, uDiskOut]
uniform float uDiskTmax;
uniform sampler2D uBB;
uniform samplerCube uSky;
uniform mat3 uSkyRot;         // KS frame → galactic sky frame
uniform float uExposure;
uniform int uMaxSteps;
uniform float uStepScale;
uniform float uFarR;
uniform float uPixelAngle;
${Ro}
${ic}
${ws}

${lf}
vec3 diskEmission(vec3 xi, float rd, vec3 p, float pt, float tEmit, float footprint) {
  float a = uSpin;
  float Om = 1.0 / (pow(rd, 1.5) + a);
  vec4 v = vec4(1.0, -Om * xi.y, Om * xi.x, 0.0);
  float nn = dotKS(xi, v, v);
  if (nn >= 0.0) return vec3(0.0);
  float ut = inversesqrt(-nn);
  float Ee = ut * (pt + Om * (-xi.y * p.x + xi.x * p.y));
  if (Ee <= 0.0) return vec3(0.0);
  float g = 1.0 / Ee;
  float u = log(rd / uDiskIn) / log(uDiskOut / uDiskIn);
  float Tn = texture(uDiskTemp, vec2(clamp(u, 0.0, 1.0), 0.5)).r;
  // co-rotating turbulence, re-seeded every ~2 local orbits with a cross-fade
  float life = 12.566 / Om;
  float ph = tEmit / life;
  float phi = atan(xi.y, xi.x);
  float lr = log(rd);
  float n = 0.0;
  for (int k = 0; k < 2; k++) {
    float pk = ph + 0.5 * float(k);
    float fk = fract(pk);
    float w = 1.0 - abs(2.0 * fk - 1.0);
    float ang = phi - Om * fk * life;
    vec3 q = vec3(cos(ang) * 3.0, sin(ang) * 3.0, lr * 7.0) + floor(pk) * 13.1;
    float fp = footprint / max(rd, 1.0) * 3.0;
    float m = fbm(q * vec3(1.0, 1.0, 1.0), 6, fp);
    float spiral = 0.5 + 0.5 * sin(2.0 * ang + lr * 9.0 + floor(pk));
    n += w * mix(m, spiral, 0.25);
  }
  float T = uDiskTmax * Tn * (0.86 + 0.28 * n);
  float mu = clamp(abs(p.z) * g, 0.0, 1.0);
  float limb = 0.42 + 0.87 * mu;                                  // Chandrasekhar electron-scattering limb law
  float edge = smoothstep(uDiskOut, uDiskOut * 0.8, rd);
  return bbRadiance(g * T) * limb * edge;
}

void main() {
  A2 = uSpin * uSpin;
  vec2 st = gl_FragCoord.xy / uRes;
  vec3 dirB;
  if (uFace < 6) dirB = cubeDir(uFace, st);
  else dirB = normalize(uPersp * vec3((2.0 * st.x - 1.0) * uTanHalf.x, (2.0 * st.y - 1.0) * uTanHalf.y, -1.0));

  // backward photon momentum (contravariant), normalised so E_observer = 1
  vec4 pc = -uE0 + dirB.x * uE1 + dirB.y * uE2 + dirB.z * uE3;
  vec3 x = uCamPos;
  vec4 pcov = lowerKS(x, pc);
  float pt = pcov.x;
  vec3 p = pcov.yzw;
  float t = 0.0;

  int result = 0;         // 0 running, 1 escaped, 2 opaque, 3 captured/unresolved
  vec3 escDir = dirB;
  vec3 color = vec3(0.0);
  float trans = 1.0;
  float rCam = ksR(x);
  bool inside = rCam < uRplus;
  float bWeak = max(60.0, 1.25 * uDiskOut);

  vec3 dx; float dt; vec3 dp;
  deriv(x, p, pt, dx, dt, dp);

  // far field: skip the (almost straight) approach analytically
  if (!inside && rCam > uFarR) {
    vec3 v = normalize(dx);
    float s0 = dot(x, v);
    float b = length(x - s0 * v);
    if (s0 >= 0.0 || b > bWeak) {
      result = 1;
      escDir = asymptoticDir(x, v);
    } else {
      float R = uFarR * 0.999;
      float s = -s0 - sqrt(max(R * R - b * b, 0.0));
      x += s * v;
      t -= s + 2.0 * log(rCam / R);      // flat distance + leading Shapiro term (KS time)
      p = nullMomentum(x, v, pt);
      deriv(x, p, pt, dx, dt, dp);
    }
  }

  float rEsc = max(uFarR, rCam * 1.02);
  float rr = ksR(x);
  for (int i = 0; i < 2000; i++) {
    if (result != 0) break;
    if (i >= uMaxSteps) { result = 3; break; }
    float spd = length(dx);
    float h = uStepScale * max(rr, 0.05) / spd;
    // RK4
    vec3 x0 = x, p0 = p; float t0 = t;
    vec3 k1x = dx, k1p = dp; float k1t = dt;
    vec3 k2x, k2p, k3x, k3p, k4x, k4p; float k2t, k3t, k4t;
    deriv(x0 + 0.5 * h * k1x, p0 + 0.5 * h * k1p, pt, k2x, k2t, k2p);
    deriv(x0 + 0.5 * h * k2x, p0 + 0.5 * h * k2p, pt, k3x, k3t, k3p);
    deriv(x0 + h * k3x, p0 + h * k3p, pt, k4x, k4t, k4p);
    x = x0 + h / 6.0 * (k1x + 2.0 * k2x + 2.0 * k3x + k4x);
    p = p0 + h / 6.0 * (k1p + 2.0 * k2p + 2.0 * k3p + k4p);
    t = t0 + h / 6.0 * (k1t + 2.0 * k2t + 2.0 * k3t + k4t);
    rr = ksR(x);
    deriv(x, p, pt, dx, dt, dp);

    // equatorial disk crossing
    if (uDiskOn == 1 && x0.z * x.z < 0.0) {
      float fr = x0.z / (x0.z - x.z);
      vec3 xi = mix(x0, x, fr);
      float rd = sqrt(max(dot(xi.xy, xi.xy) - A2, 0.0));
      if (rd > uDiskIn && rd < uDiskOut) {
        vec3 pi = mix(p0, p, fr);
        float ti = mix(t0, t, fr);
        float footprint = abs(ti) * uPixelAngle;
        vec3 em = diskEmission(xi, rd, pi, pt, uCamT + ti, footprint);
        float alpha = smoothstep(uDiskOut, uDiskOut * 0.85, rd);
        color += trans * em;
        trans *= 1.0 - alpha;
        if (trans < 0.01) { result = 2; break; }
      }
    }
    // capture: backward rays cannot cross the future horizon inward; they pile up at r₊ (shadow)
    if (!inside && rr < uRplus * 1.0005 + 1e-3 && dot(x, dx) < 0.0) { result = 3; break; }
    // runaway momentum = ray asymptoting to a horizon we cannot see through
    if (dot(p, p) > 1e8) { result = 3; break; }
    if (rr > rEsc && dot(x, dx) > 0.0) {
      result = 1;
      escDir = asymptoticDir(x, normalize(dx));
      break;
    }
  }

  // sky lookup with ray-differential filtering (stable under extreme lensing)
  vec3 skyDir = uSkyRot * escDir;
  vec3 gx = dFdx(skyDir), gy = dFdy(skyDir);
  float gl = max(length(gx), length(gy));
  float maxGrad = 0.25;
  if (gl > maxGrad) { gx *= maxGrad / gl; gy *= maxGrad / gl; }
  if (result == 1 && trans > 0.0 && pt > 0.0) {
    vec4 s = textureGrad(uSky, skyDir, gx, gy);
    float Lsky = s.r * 1e-3;
    if (Lsky > 0.0) {
      float T = max(s.g / max(s.r, 1e-12) * 1e4, 500.0);
      float g = 1.0 / pt;
      float ratio = exp2((bbLogL(g * T) - bbLogL(T)) * 3.321928);
      color += trans * bbChroma(g * T) * Lsky * ratio;
    }
  }
  gl_FragColor = vec4(min(color * uExposure, vec3(60000.0)), 1.0);
}
`;class Fy{constructor(e,t){this.size=e,this.material=new Tt({vertexShader:Co,fragmentShader:Uy,depthTest:!1,depthWrite:!1,uniforms:{uFace:{value:0},uRes:{value:new ne(e,e)},uPersp:{value:new Ce},uTanHalf:{value:new ne(1,1)},uE0:{value:new He},uE1:{value:new He},uE2:{value:new He},uE3:{value:new He},uCamPos:{value:new w},uCamT:{value:0},uSpin:{value:t.spin},uRplus:{value:t.rPlus},uDiskIn:{value:t.diskIn},uDiskOut:{value:t.diskOut},uDiskOn:{value:t.diskOn?1:0},uDiskTemp:{value:t.diskTemp},uDiskTmax:{value:t.diskTmax},uBB:{value:t.bb},uSky:{value:t.sky},uSkyRot:{value:t.skyRot},uExposure:{value:1},uMaxSteps:{value:400},uStepScale:{value:.04},uFarR:{value:Math.max(200,t.diskOut*1.6)},uPixelAngle:{value:2/e}}});const n=new Ye(Po(),this.material);n.frustumCulled=!1,this.scene.add(n),this.cube=this.makeCube(e)}material;scene=new Ii;cam=new Ni(-1,1,1,-1,0,1);cube;facesPerFrame=6;nextFace=0;makeCube(e){return new Eo(e,{type:nn,format:Nt,generateMipmaps:!0,minFilter:tn,magFilter:_t,depthBuffer:!1})}resize(e){e!==this.size&&(this.cube.dispose(),this.size=e,this.cube=this.makeCube(e),this.material.uniforms.uRes.value.set(e,e),this.material.uniforms.uPixelAngle.value=2/e,this.nextFace=0)}setParams(e){const t=this.material.uniforms;e.spin!==void 0&&(t.uSpin.value=e.spin),e.rPlus!==void 0&&(t.uRplus.value=e.rPlus),e.diskOn!==void 0&&(t.uDiskOn.value=e.diskOn?1:0),e.diskIn!==void 0&&(t.uDiskIn.value=e.diskIn),e.diskOut!==void 0&&(t.uDiskOut.value=e.diskOut,t.uFarR.value=Math.max(200,e.diskOut*1.6)),e.diskTmax!==void 0&&(t.uDiskTmax.value=e.diskTmax),e.diskTemp&&(t.uDiskTemp.value=e.diskTemp),e.skyRot&&(t.uSkyRot.value=e.skyRot)}setCamera(e,t){const n=this.material.uniforms;n.uE0.value.set(e.e[0][0],e.e[0][1],e.e[0][2],e.e[0][3]),n.uE1.value.set(e.e[1][0],e.e[1][1],e.e[1][2],e.e[1][3]),n.uE2.value.set(e.e[2][0],e.e[2][1],e.e[2][2],e.e[2][3]),n.uE3.value.set(e.e[3][0],e.e[3][1],e.e[3][2],e.e[3][3]),n.uCamPos.value.set(e.pos[0],e.pos[1],e.pos[2]),n.uCamT.value=e.t,n.uExposure.value=t}setQuality(e,t){this.material.uniforms.uMaxSteps.value=e,this.material.uniforms.uStepScale.value=t}renderCube(e){const t=e.getRenderTarget(),n=e.xr.enabled;e.xr.enabled=!1;const i=this.material.uniforms;i.uRes.value.set(this.size,this.size);const r=Math.min(6,this.facesPerFrame);for(let o=0;o<r;o++){const a=this.nextFace;this.nextFace=(this.nextFace+1)%6,i.uFace.value=a,this.cube.texture.generateMipmaps=a===5||r<6,e.setRenderTarget(this.cube,a),e.render(this.scene,this.cam)}e.xr.enabled=n,e.setRenderTarget(t)}renderPerspective(e,t,n,i){const r=e.getRenderTarget(),o=e.xr.enabled;e.xr.enabled=!1;const a=this.material.uniforms,l=a.uPixelAngle.value;a.uFace.value=6,a.uPersp.value.copy(n),a.uTanHalf.value.set(i*(t.width/t.height),i),a.uRes.value.set(t.width,t.height),a.uPixelAngle.value=2*i/t.height,e.setRenderTarget(t),e.render(this.scene,this.cam),a.uRes.value.set(this.size,this.size),a.uPixelAngle.value=l,e.xr.enabled=o,e.setRenderTarget(r)}}function Oy(s,e){const t=s.length,n=new Float32Array(t*4);for(let r=0;r<t;r++)n[r*4]=s[r]/e;const i=new vr(tf(n),t,1,Nt,nn);return i.magFilter=_t,i.minFilter=_t,i.needsUpdate=!0,i}const ky=`
void dirToFace(vec3 d, out int f, out vec2 st) {
  vec3 a = abs(d);
  float sc, tc, ma;
  if (a.x >= a.y && a.x >= a.z) {
    ma = a.x;
    if (d.x > 0.0) { f = 0; sc = -d.z; tc = -d.y; } else { f = 1; sc = d.z; tc = -d.y; }
  } else if (a.y >= a.z) {
    ma = a.y;
    if (d.y > 0.0) { f = 2; sc = d.x; tc = d.z; } else { f = 3; sc = d.x; tc = -d.z; }
  } else {
    ma = a.z;
    if (d.z > 0.0) { f = 4; sc = d.x; tc = -d.y; } else { f = 5; sc = -d.x; tc = -d.y; }
  }
  st = vec2(sc, tc) / ma * 0.5 + 0.5;
}
`,By=`
precision highp float;
precision highp int;
uniform vec2 uAtlas;
uniform float uN;
uniform vec4 uE0;
uniform vec4 uE1;
uniform vec4 uE2;
uniform vec4 uE3;
uniform vec3 uCamPos;
uniform float uSpin;
uniform float uRplus;
uniform float uDiskIn;
uniform float uDiskOut;
uniform int uDiskOn;
uniform mat3 uSkyRot;
uniform int uMaxSteps;
uniform float uStepScale;
uniform float uFarR;
layout(location = 0) out highp vec4 outA;  // escape direction (sky frame), sky transmittance
layout(location = 1) out highp vec4 outB;  // disk hit: x, y, g, light-travel time (premultiplied by coverage)
layout(location = 2) out highp vec4 outC;  // disk coverage
${Ro}
${lf}

float diskG(vec3 xi, float rd, vec3 p, float pt) {
  float Om = 1.0 / (pow(rd, 1.5) + uSpin);
  vec4 v = vec4(1.0, -Om * xi.y, Om * xi.x, 0.0);
  float nn = dotKS(xi, v, v);
  if (nn >= 0.0) return 0.0;
  float Ee = inversesqrt(-nn) * (pt + Om * (-xi.y * p.x + xi.x * p.y));
  return Ee > 0.0 ? 1.0 / Ee : 0.0;
}

void main() {
  A2 = uSpin * uSpin;
  float cell = uN + 2.0;
  vec2 px = gl_FragCoord.xy;
  float fx = floor(px.x / cell), fy = floor(px.y / cell);
  int face = int(fy * 3.0 + fx);
  vec2 st = (px - vec2(fx, fy) * cell - 1.0) / uN;   // gutter texels extrapolate past the face edge
  vec3 dirB = cubeDir(face, st);

  vec4 pc = -uE0 + dirB.x * uE1 + dirB.y * uE2 + dirB.z * uE3;
  vec3 x = uCamPos;
  vec4 pcov = lowerKS(x, pc);
  float pt = pcov.x;
  vec3 p = pcov.yzw;
  float t = 0.0;

  int result = 0;
  vec3 escDir = dirB;
  float trans = 1.0;
  vec4 hit = vec4(0.0);
  float cov = 0.0;
  float rCam = ksR(x);
  bool inside = rCam < uRplus;
  float bWeak = max(60.0, 1.25 * uDiskOut);

  vec3 dx; float dt; vec3 dp;
  deriv(x, p, pt, dx, dt, dp);
  if (!inside && rCam > uFarR) {
    vec3 v = normalize(dx);
    float s0 = dot(x, v);
    float b = length(x - s0 * v);
    if (s0 >= 0.0 || b > bWeak) {
      result = 1;
      escDir = asymptoticDir(x, v);
    } else {
      float R = uFarR * 0.999;
      float s = -s0 - sqrt(max(R * R - b * b, 0.0));
      x += s * v;
      t -= s + 2.0 * log(rCam / R);
      p = nullMomentum(x, v, pt);
      deriv(x, p, pt, dx, dt, dp);
    }
  }

  float rEsc = max(uFarR, rCam * 1.02);
  float rr = ksR(x);
  for (int i = 0; i < 2000; i++) {
    if (result != 0) break;
    if (i >= uMaxSteps) { result = 3; break; }
    float h = uStepScale * max(rr, 0.05) / length(dx);
    vec3 x0 = x, p0 = p; float t0 = t;
    vec3 k2x, k2p, k3x, k3p, k4x, k4p; float k2t, k3t, k4t;
    deriv(x0 + 0.5 * h * dx, p0 + 0.5 * h * dp, pt, k2x, k2t, k2p);
    deriv(x0 + 0.5 * h * k2x, p0 + 0.5 * h * k2p, pt, k3x, k3t, k3p);
    deriv(x0 + h * k3x, p0 + h * k3p, pt, k4x, k4t, k4p);
    x = x0 + h / 6.0 * (dx + 2.0 * k2x + 2.0 * k3x + k4x);
    p = p0 + h / 6.0 * (dp + 2.0 * k2p + 2.0 * k3p + k4p);
    t = t0 + h / 6.0 * (dt + 2.0 * k2t + 2.0 * k3t + k4t);
    rr = ksR(x);
    deriv(x, p, pt, dx, dt, dp);

    if (uDiskOn == 1 && x0.z * x.z < 0.0) {
      float fr = x0.z / (x0.z - x.z);
      vec3 xi = mix(x0, x, fr);
      float rd = sqrt(max(dot(xi.xy, xi.xy) - A2, 0.0));
      if (rd > uDiskIn && rd < uDiskOut) {
        if (cov == 0.0) {
          float g = diskG(xi, rd, mix(p0, p, fr), pt);
          hit = vec4(xi.xy, g, mix(t0, t, fr));
          cov = 1.0;
        }
        float alpha = smoothstep(uDiskOut, uDiskOut * 0.85, rd);
        trans *= 1.0 - alpha;
        if (trans < 0.01) { result = 2; break; }
      }
    }
    if (!inside && rr < uRplus * 1.0005 + 1e-3 && dot(x, dx) < 0.0) { result = 3; break; }
    if (dot(p, p) > 1e8) { result = 3; break; }
    if (rr > rEsc && dot(x, dx) > 0.0) {
      result = 1;
      escDir = asymptoticDir(x, normalize(dx));
      break;
    }
  }
  if (result != 1) trans = 0.0;
  if (pt <= 0.0) trans = 0.0;
  outA = vec4(uSkyRot * escDir, trans);
  outB = hit * cov;
  outC = vec4(cov, 0.0, 0.0, 1.0);
}
`,cf=`
uniform sampler2D uMapA;
uniform sampler2D uMapB;
uniform sampler2D uMapC;
uniform vec2 uAtlas;
uniform float uN;
uniform mat3 uAtt;          // body (view) frame → reference frame of the map
uniform samplerCube uSky;
uniform sampler2D uBB;
uniform sampler2D uDiskTemp;
uniform sampler2D uNoise;
uniform float uDiskTmax;
uniform float uDiskIn;
uniform float uDiskOut;
uniform float uSpinS;
uniform float uTime;        // observer's coordinate time (M)
uniform vec4 uR0;           // current reference tetrad (for the exact starlight shift)
uniform vec4 uR1;
uniform vec4 uR2;
uniform vec4 uR3;
uniform float uCamF;
uniform vec3 uCamL;
uniform float uExposure;
${ws}
${ky}

vec2 atlasUV(vec3 d) {
  int f; vec2 st;
  dirToFace(d, f, st);
  float cell = uN + 2.0;
  vec2 org = vec2(float(f - (f / 3) * 3), float(f / 3)) * cell;
  return (org + 1.0 + clamp(st, 0.0, 1.0) * uN) / uAtlas;
}

// E_obs / E_inf for starlight arriving from reference-frame direction d (p_t is conserved)
float starShift(vec3 d) {
  vec4 pc = -uR0 + d.x * uR1 + d.y * uR2 + d.z * uR3;
  float lp = pc.x + dot(uCamL, pc.yzw);
  float pt = -pc.x + uCamF * lp;
  return pt > 0.0 ? 1.0 / pt : 0.0;
}

vec3 diskShade(vec2 xy, float g, float tRel, float fp) {
  float a2 = uSpinS * uSpinS;
  float rd = sqrt(max(dot(xy, xy) - a2, 0.0));
  if (g <= 0.0 || rd < uDiskIn * 0.97) return vec3(0.0);
  float u = log(rd / uDiskIn) / log(uDiskOut / uDiskIn);
  float Tn = texture(uDiskTemp, vec2(clamp(u, 0.0, 1.0), 0.5)).r;
  float Om = 1.0 / (pow(rd, 1.5) + uSpinS);
  float tEmit = uTime + tRel;
  float life = 12.566 / Om;
  float ph = tEmit / life;
  float phi = atan(xy.y, xy.x);
  float lr = log(rd);
  float n = 0.0;
  for (int k = 0; k < 2; k++) {
    float pk = ph + 0.5 * float(k);
    float fk = fract(pk);
    float w = 1.0 - abs(2.0 * fk - 1.0);
    float ang = phi - Om * fk * life;
    float seed = floor(pk);
    vec2 q = vec2(ang * (4.0 / 6.2831853) + fract(seed * 0.618) * 7.0, lr * 1.6 + fract(seed * 0.414) * 5.0);
    float m = texture(uNoise, q).r * 0.55 + texture(uNoise, q * vec2(3.0, 3.0) + 0.37).r * 0.3 + texture(uNoise, q * vec2(9.0, 7.0) + 0.71).r * 0.15;
    float spiral = 0.5 + 0.5 * sin(2.0 * ang + lr * 9.0 + seed);
    n += w * mix(m, spiral, 0.22);
  }
  float T = uDiskTmax * Tn * (0.84 + 0.32 * n);
  float edge = smoothstep(uDiskOut, uDiskOut * 0.8, rd);
  return bbRadiance(g * T) * edge;
}

// radiance (cd/m^2 × exposure) arriving from body-frame direction dirBody
vec3 shadeKerr(vec3 dirBody) {
  vec3 dref = normalize(uAtt * dirBody);
  vec2 uv = atlasUV(dref);
  vec4 A = texture(uMapA, uv);
  vec4 B = texture(uMapB, uv);
  float cov = texture(uMapC, uv).r;
  vec3 esc = normalize(A.xyz + vec3(1e-6));
  // ray differentials → filtered star lookup (stable under extreme lensing)
  vec3 gx = dFdx(esc), gy = dFdy(esc);
  float gl = max(length(gx), length(gy));
  if (gl > 0.2) { gx *= 0.2 / gl; gy *= 0.2 / gl; }
  vec3 col = vec3(0.0);
  float trans = A.w;
  if (trans > 0.0) {
    vec4 s = textureGrad(uSky, esc, gx, gy);
    float L = s.r * 1e-3;
    if (L > 0.0) {
      float T = max(s.g / max(s.r, 1e-12) * 1e4, 500.0);
      float g = starShift(dref);
      float ratio = exp2((bbLogL(g * T) - bbLogL(T)) * 3.321928);
      col += trans * bbChroma(g * T) * L * ratio;
    }
  }
  if (cov > 0.002) {
    vec4 h = B / cov;
    float fp = max(length(dFdx(h.xy)), length(dFdy(h.xy)));
    float a2 = uSpinS * uSpinS;
    float rd = sqrt(max(dot(h.xy, h.xy) - a2, 0.0));
    float alpha = cov * smoothstep(uDiskOut, uDiskOut * 0.85, rd);
    col += alpha * diskShade(h.xy, h.z, h.w, fp);
  }
  return min(col * uExposure, vec3(6e4));
}
`,zy=`
varying vec3 vDir;
void main() {
  vDir = position;
  vec4 p = projectionMatrix * mat4(mat3(viewMatrix)) * vec4(position, 1.0);
  gl_Position = p.xyww;
}
`,Hy=`
varying vec3 vDir;
${cf}
void main() {
  gl_FragColor = vec4(shadeKerr(normalize(vDir)), 1.0);
  #include <tonemapping_fragment>
  #include <colorspace_fragment>
}
`,Vy=`
uniform int uFace;
uniform float uSize;
${Ro}
${cf}
void main() {
  gl_FragColor = vec4(shadeKerr(cubeDir(uFace, gl_FragCoord.xy / uSize)), 1.0);
}
`;function eo(s,e){return new Ln(s,e,{count:3,type:nn,format:Nt,minFilter:_t,magFilter:_t,generateMipmaps:!1,depthBuffer:!1})}class qu{constructor(e,t){this.N=e;const n=3*(e+2),i=2*(e+2);this.front=eo(n,i),this.back=eo(n,i),this.material=new Tt({glslVersion:ml,vertexShader:Co,fragmentShader:By,depthTest:!1,depthWrite:!1,uniforms:{uAtlas:{value:new ne(n,i)},uN:{value:e},uE0:{value:new He},uE1:{value:new He},uE2:{value:new He},uE3:{value:new He},uCamPos:{value:new w},uSpin:{value:t.spin},uRplus:{value:t.rPlus},uDiskIn:{value:t.diskIn},uDiskOut:{value:t.diskOut},uDiskOn:{value:t.diskOn?1:0},uSkyRot:{value:t.skyRot},uMaxSteps:{value:400},uStepScale:{value:.04},uFarR:{value:Math.max(200,t.diskOut*1.6)}}});const r=new Ye(Po(),this.material);r.frustumCulled=!1,this.scene.add(r)}front;back;material;scene=new Ii;cam=new Ni(-1,1,1,-1,0,1);nextFace=0;frontCam=null;pendingCam=null;facesPerFrame=6;generation=0;setQuality(e,t){this.material.uniforms.uMaxSteps.value=e,this.material.uniforms.uStepScale.value=t}setDisk(e){this.material.uniforms.uDiskOn.value=e?1:0}resize(e){if(e===this.N)return;this.N=e;const t=3*(e+2),n=2*(e+2);this.front.dispose(),this.back.dispose(),this.front=eo(t,n),this.back=eo(t,n),this.material.uniforms.uAtlas.value.set(t,n),this.material.uniforms.uN.value=e,this.nextFace=0,this.frontCam=null}setCamera(e){const t=this.material.uniforms;t.uE0.value.set(e.e[0][0],e.e[0][1],e.e[0][2],e.e[0][3]),t.uE1.value.set(e.e[1][0],e.e[1][1],e.e[1][2],e.e[1][3]),t.uE2.value.set(e.e[2][0],e.e[2][1],e.e[2][2],e.e[2][3]),t.uE3.value.set(e.e[3][0],e.e[3][1],e.e[3][2],e.e[3][3]),t.uCamPos.value.set(e.pos[0],e.pos[1],e.pos[2])}traceFace(e,t){const n=this.N+2,i=t%3,r=Math.floor(t/3),o=this.back;o.scissor.set(i*n,r*n,n,n),o.scissorTest=!0,e.setRenderTarget(o),e.render(this.scene,this.cam),o.scissorTest=!1}update(e,t,n=!1){const i=e.getRenderTarget(),r=e.xr.enabled;e.xr.enabled=!1,n&&(this.nextFace=0);const o=n?6:Math.max(1,Math.min(6,this.facesPerFrame));for(let a=0;a<o;a++)if(this.nextFace===0&&(this.pendingCam=t(),this.setCamera(this.pendingCam)),this.traceFace(e,this.nextFace),this.nextFace++,this.nextFace===6){const l=this.front;if(this.front=this.back,this.back=l,this.frontCam=this.pendingCam,this.nextFace=0,this.generation++,!n)break}e.xr.enabled=r,e.setRenderTarget(i)}dispose(){this.front.dispose(),this.back.dispose(),this.material.dispose()}}function Gy(s=256){const e=new Uint8Array(s*s),t=(r,o)=>{const a=new Float32Array(r*r);let l=o;for(let c=0;c<a.length;c++)l=l*1664525+1013904223>>>0,a[c]=l/4294967296;return(c,u)=>{const h=Math.floor(c),f=Math.floor(u),d=c-h,p=u-f,v=d*d*(3-2*d),g=p*p*(3-2*p),m=(A,R)=>a[(R%r+r)%r*r+(A%r+r)%r],_=m(h,f),y=m(h+1,f),x=m(h,f+1),E=m(h+1,f+1);return _+(y-_)*v+(x-_)*g+(_-y-x+E)*v*g}},n=[4,8,16,32,64].map((r,o)=>({p:r,f:t(r,7919*(o+1)),a:.5**o}));for(let r=0;r<s;r++)for(let o=0;o<s;o++){let a=0,l=0;for(const c of n)a+=c.a*c.f(o/s*c.p,r/s*c.p),l+=c.a;a/=l,e[r*s+o]=Math.max(0,Math.min(255,Math.round(((a-.5)*1.8+.5)*255)))}const i=new vr(e,s,s,To,yn);return i.wrapS=i.wrapT=Pi,i.magFilter=_t,i.minFilter=tn,i.generateMipmaps=!0,i.needsUpdate=!0,i}function uf(s,e,t){return{uMapA:{value:null},uMapB:{value:null},uMapC:{value:null},uAtlas:{value:new ne(1,1)},uN:{value:1},uAtt:{value:new Ce},uSky:{value:s.sky},uBB:{value:s.bb},uDiskTemp:{value:s.diskTemp},uNoise:{value:s.noise},uDiskTmax:{value:t},uDiskIn:{value:e.diskIn},uDiskOut:{value:e.diskOut},uSpinS:{value:e.spin},uTime:{value:0},uR0:{value:new He},uR1:{value:new He},uR2:{value:new He},uR3:{value:new He},uCamF:{value:0},uCamL:{value:new w},uExposure:{value:1}}}function Wy(s,e){const t=e.map;s.uMapA.value=t.front.textures[0],s.uMapB.value=t.front.textures[1],s.uMapC.value=t.front.textures[2],s.uAtlas.value.set(3*(t.N+2),2*(t.N+2)),s.uN.value=t.N,s.uAtt.value.copy(e.att),s.uR0.value.set(e.ref[0][0],e.ref[0][1],e.ref[0][2],e.ref[0][3]),s.uR1.value.set(e.ref[1][0],e.ref[1][1],e.ref[1][2],e.ref[1][3]),s.uR2.value.set(e.ref[2][0],e.ref[2][1],e.ref[2][2],e.ref[2][3]),s.uR3.value.set(e.ref[3][0],e.ref[3][1],e.ref[3][2],e.ref[3][3]),s.uCamF.value=e.f,s.uCamL.value.set(e.l[0],e.l[1],e.l[2]),s.uTime.value=e.t,s.uExposure.value=e.exposure}function Ku(s,e,t){const n=new Tt({vertexShader:zy,fragmentShader:Hy,uniforms:uf(s,e,t),side:Lt,depthTest:!1,depthWrite:!1}),i=new Ye(new Qn(10,10,10),n);return i.frustumCulled=!1,i.renderOrder=-1e3,{mesh:i,material:n,uniforms:n.uniforms}}class Xy{target;material;uniforms;scene=new Ii;cam=new Ni(-1,1,1,-1,0,1);face=0;constructor(e,t,n,i=32){this.target=new Eo(i,{type:nn,generateMipmaps:!0,minFilter:tn,magFilter:_t,depthBuffer:!1}),this.material=new Tt({vertexShader:Co,fragmentShader:Vy,uniforms:{...uf(e,t,n),uFace:{value:0},uSize:{value:i}},depthTest:!1,depthWrite:!1}),this.uniforms=this.material.uniforms;const r=new Ye(Po(),this.material);r.frustumCulled=!1,this.scene.add(r)}update(e,t=2){const n=e.getRenderTarget(),i=e.xr.enabled;e.xr.enabled=!1;for(let r=0;r<t;r++)this.material.uniforms.uFace.value=this.face,this.target.texture.generateMipmaps=this.face===5,e.setRenderTarget(this.target,this.face),e.render(this.scene,this.cam),this.face=(this.face+1)%6;e.xr.enabled=i,e.setRenderTarget(n)}dispose(){this.target.dispose(),this.material.dispose()}}const qy=`
varying vec3 vN;
varying vec3 vLocal;
void main() {
  vN = normalize(normal);
  vLocal = position;
  gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
}
`,Ky=`
uniform sampler2D uBB;
uniform float uExposure;
uniform float uG;          // received / emitted frequency
uniform int uKind;         // 0 hull, 1 engine plume, 2 beacon, 3 windows
uniform vec3 uKeyDir;      // model frame
uniform float uKeyT;
uniform float uKeyK;       // illuminance as a fraction of a blackbody's radiance × π
uniform float uAlbedo;
uniform float uEngine;     // 0..1
uniform float uTauEmit;    // ship proper time at emission (s)
varying vec3 vN;
varying vec3 vLocal;
${ws}
void main() {
  vec3 n = normalize(vN);
  vec3 c = vec3(0.0);
  if (uKind == 0) {
    float l = max(dot(n, uKeyDir), 0.0) + 0.08;
    c = bbRadiance(uG * uKeyT) * uKeyK * uAlbedo * l;
    // hull panel lines
    float pl = step(0.96, fract(vLocal.z * 0.25)) * 0.5;
    c *= 1.0 - pl;
  } else if (uKind == 1) {
    float core = exp(-length(vLocal.xy) * 0.6);
    c = bbRadiance(uG * 25000.0) * 1e-3 * uEngine * core;
  } else if (uKind == 2) {
    // navigation strobe: 1 Hz in the ship's own proper time
    float ph = fract(uTauEmit);
    float on = step(ph, 0.08);
    c = bbRadiance(uG * 3200.0) * 2e-4 * on;
  } else {
    c = bbRadiance(uG * 3400.0) * 2e-6;
  }
  gl_FragColor = vec4(c * uExposure, 1.0);
  #include <tonemapping_fragment>
  #include <colorspace_fragment>
}
`;class $y{group=new Ht;materials=[];length=62;shared={uExposure:{value:1},uG:{value:1},uKeyDir:{value:new w(0,1,0)},uKeyT:{value:6e3},uKeyK:{value:.1},uEngine:{value:0},uTauEmit:{value:0}};constructor(e){const t=(f,d=.5)=>{const p=new Tt({vertexShader:qy,fragmentShader:Ky,uniforms:{...this.shared,uBB:{value:e},uKind:{value:f},uAlbedo:{value:d}},transparent:f===1,blending:f===1?nr:Ri,depthWrite:f!==1});return this.materials.push(p),p},n=t(0,.55),i=t(1),r=t(2),o=t(3),a=new Ye(new jn(3.2,4.2,44,24),n);a.rotation.x=Math.PI/2,this.group.add(a);const l=new Ye(new So(3.2,10,24),n);l.rotation.x=-Math.PI/2,l.position.z=-27,this.group.add(l);const c=new Ye(new di(2.2,16,12,0,Math.PI*2,0,Math.PI/2),o);c.position.set(0,2.6,-18),this.group.add(c);for(const f of[-1,1]){const d=new Ye(new Qn(16,.4,10),n);d.position.set(f*11,0,6),d.rotation.z=f*.15,this.group.add(d);const p=new Ye(new di(.6,8,6),r);p.position.set(f*19,1.2*f,6),this.group.add(p)}const u=new Ye(new jn(3,4.6,6,24,1,!0),n);u.rotation.x=Math.PI/2,u.position.z=25,this.group.add(u);const h=new Ye(new So(4.2,60,24,1,!0),i);h.rotation.x=Math.PI/2,h.position.z=58,this.group.add(h)}}const Lo=s=>s.M+Math.sqrt(Math.max(s.M*s.M-s.a*s.a,0)),hf=s=>s.M-Math.sqrt(Math.max(s.M*s.M-s.a*s.a,0));function vn(s,e,t,n){const i=e*e+t*t+n*n-s*s,r=.5*(i+Math.sqrt(i*i+4*s*s*n*n));return Math.sqrt(Math.max(r,1e-300))}function _n(s,e,t,n,i){const{M:r,a:o}=s,a=vn(o,e,t,n),l=a*a,c=l*l+o*o*n*n,u=l+o*o,h=i??{r:0,f:0,lx:0,ly:0,lz:0};return h.r=a,h.f=2*r*l*a/c,h.lx=(a*e+o*t)/u,h.ly=(a*t-o*e)/u,h.lz=n/a,h}function Pn(s,e,t=[0,0,0,0]){const n=e[0]+s.lx*e[1]+s.ly*e[2]+s.lz*e[3],i=s.f*n;return t[0]=-e[0]+i,t[1]=e[1]+i*s.lx,t[2]=e[2]+i*s.ly,t[3]=e[3]+i*s.lz,t}function mr(s,e,t=[0,0,0,0]){const n=-e[0]+s.lx*e[1]+s.ly*e[2]+s.lz*e[3],i=s.f*n;return t[0]=-e[0]+i,t[1]=e[1]-i*s.lx,t[2]=e[2]-i*s.ly,t[3]=e[3]-i*s.lz,t}function jt(s,e,t){const n=e[0]+s.lx*e[1]+s.ly*e[2]+s.lz*e[3],i=t[0]+s.lx*t[1]+s.ly*t[2]+s.lz*t[3];return-e[0]*t[0]+e[1]*t[1]+e[2]*t[2]+e[3]*t[3]+s.f*n*i}function Yy(s,e){const t=-e[0]+s.lx*e[1]+s.ly*e[2]+s.lz*e[3];return-e[0]*e[0]+e[1]*e[1]+e[2]*e[2]+e[3]*e[3]-s.f*t*t}function rs(s,e,t,n){const i=t[1],r=t[2],o=t[3],a=t[4],l=t[5],c=t[6],u=t[7],h=e*e,f=o*o,d=vn(e,i,r,o),p=d*d,v=p*d,m=1/(p*p+h*f),_=2*s*v*m,y=p+h,x=1/y,E=(d*i+e*r)*x,A=(d*r-e*i)*x,R=o/d,L=-a+E*l+A*c+R*u,b=_*L;n[0]=-a+b,n[1]=l-b*E,n[2]=c-b*A,n[3]=u-b*R;const M=v*i*m,P=v*r*m,D=d*o*y*m,O=2*s*p*(3*h*f-p*p)*m*m,V=O*M,B=O*P,W=O*D-4*s*h*o*v*m*m,K=(i*l+r*c)*x-(E*l+A*c)*2*d*x-u*o/p,G=K*M+(d*l-e*c)*x,le=K*P+(e*l+d*c)*x,de=K*D+u/d,pe=.5*L*L;n[4]=0,n[5]=pe*V+b*G,n[6]=pe*B+b*le,n[7]=pe*W+b*de}const Ta=new Float64Array(8),Ea=new Float64Array(8),wa=new Float64Array(8),$u=new Float64Array(8),ns=new Float64Array(8);function jy(s,e,t,n){rs(s,e,t,Ta);for(let i=0;i<8;i++)ns[i]=t[i]+.5*n*Ta[i];rs(s,e,ns,Ea);for(let i=0;i<8;i++)ns[i]=t[i]+.5*n*Ea[i];rs(s,e,ns,wa);for(let i=0;i<8;i++)ns[i]=t[i]+n*wa[i];rs(s,e,ns,$u);for(let i=0;i<8;i++)t[i]+=n/6*(Ta[i]+2*Ea[i]+2*wa[i]+$u[i])}function Yu(s,e){const t=_n(s,e[1],e[2],e[3]),n=Yy(t,[e[4],e[5],e[6],e[7]]);if(n>=0)return!1;const i=1/Math.sqrt(-n);return e[4]*=i,e[5]*=i,e[6]*=i,e[7]*=i,!0}function ff(s,e=!0){const t=s.M,n=s.a/t,i=1+Math.cbrt(1-n*n)*(Math.cbrt(1+n)+Math.cbrt(1-n)),r=Math.sqrt(3*n*n+i*i),o=e?-1:1;return t*(3+r+o*Math.sqrt((3-i)*(3+i+2*r)))}const Zy=(s,e)=>Math.sqrt(s.M)/(Math.pow(e,1.5)+s.a*Math.sqrt(s.M));function df(s,e){const t=s.M,n=s.a,i=Math.sqrt(e),r=Math.sqrt(t),o=Math.pow(e,.75)*Math.sqrt(Math.pow(e,1.5)-3*t*i+2*n*r),a=(Math.pow(e,1.5)-2*t*i+n*r)/o,l=r*(e*e-2*n*r*i+n*n)/o;return{E:a,L:l,Omega:Zy(s,e)}}function pf(s){const e=Math.sqrt(1+s.f),t=[e,-s.f*s.lx/e,-s.f*s.ly/e,-s.f*s.lz/e],n=1/e-1,i=[s.lx,s.ly,s.lz],r=[0,1,2].map(o=>{const a=[0,0,0,0];for(let l=0;l<3;l++)a[l+1]=(l===o?1:0)+n*i[o]*i[l];return a});return{n:t,eps:r}}function Jy(s,e,t,n){const i=-jt(s,e,n),r=[n[0]+e[0],n[1]+e[1],n[2]+e[2],n[3]+e[3]];return t.map(o=>{const a=jt(s,n,o)/(1+i);return[o[0]+a*r[0],o[1]+a*r[1],o[2]+a*r[2],o[3]+a*r[3]]})}function Qy(s){const[e,t,n,i]=[s[0],s[1],s[2],s[3]];return[[1-2*(t*t+n*n),2*(e*t-n*i),2*(e*n+t*i)],[2*(e*t+n*i),1-2*(e*e+n*n),2*(t*n-e*i)],[2*(e*n-t*i),2*(t*n+e*i),1-2*(e*e+t*t)]]}function fi(s,e,t,n){const i=_n(s,e[0],e[1],e[2]),r=mr(i,t,[0,0,0,0]),{n:o,eps:a}=pf(i),l=Jy(i,o,a,r),c=Qy(n),u=[0,1,2].map(h=>{const f=[0,0,0,0];for(let d=0;d<3;d++)for(let p=0;p<4;p++)f[p]+=c[d][h]*l[d][p];return f});return{e:[r,u[0],u[1],u[2]],point:i}}function eM(s){const e=1-s.f;return e<=1e-9?null:[1/Math.sqrt(e),0,0,0]}function os(s,e,t,n){const i=_n(s,e,t,n);if(i.r<=Lo(s)*(1+1e-6))return null;const r=[1,0,0,0],o=[0,-t,e,0],a=jt(i,r,o),l=jt(i,o,o);if(l<=0)return null;const c=-a/l,u=[1,-c*t,c*e,0],h=jt(i,u,u);if(h>=0)return null;const f=1/Math.sqrt(-h);return[u[0]*f,u[1]*f,u[2]*f,u[3]*f]}const tM=(s,e,t)=>-jt(s,e,t);function nM(s,e){const t=[0,0,0,0];t[0]=-jt(s.point,s.e[0],e);for(let n=1;n<4;n++)t[n]=jt(s.point,s.e[n],e);return t}const Hs={low:{map:224,faces:1,steps:240,h:.06,octaves:5,telescope:160},medium:{map:288,faces:1,steps:340,h:.045,octaves:7,telescope:224},high:{map:448,faces:6,steps:500,h:.035,octaves:10,telescope:384},ultra:{map:640,faces:6,steps:700,h:.028,octaves:12,telescope:512}};class iM{constructor(e,t,n,i){this.world=e,this.bb=t,this.sky=n,this.quality=i,this.diskTex=Oy(e.disk.T,e.disk.Tmax),this.noise=Gy(256),this.tracer=this.makeTracer(i);const r=this.lensingScene();this.pilotMap=new qu(i.map,r),this.obsMap=new qu(i.map,r);for(const c of[this.pilotMap,this.obsMap])c.setQuality(i.steps,i.h);this.pilotMap.facesPerFrame=i.faces;const o={sky:n,bb:t,diskTemp:this.diskTex,noise:this.noise};this.dome=Ku(o,r,e.disk.Tmax),this.dome2=Ku(o,r,e.disk.Tmax),this.probe=new Xy(o,r,e.disk.Tmax,32),this.telescopeRT.setSize(i.telescope,i.telescope);const a=new Kt({map:this.telescopeRT.texture,toneMapped:!0});this.telescopePanel=new Ye(new Zn(.55,.55),a);const l=new Ye(new Zn(.6,.66),new Kt({color:725272,toneMapped:!1}));l.position.set(0,.025,-.002),this.telescopePanel.add(l),this.telescopePanel.position.set(-.62,-.32,-.95),this.telescopePanel.rotation.set(-.25,.45,0),this.marker=new Ye(new Yl(1.1,1.35,40),new Kt({color:16740576,toneMapped:!1,depthTest:!1,transparent:!0,opacity:.85,side:cn})),this.marker.renderOrder=5,this.ship=new $y(t),this.shipScene.add(this.ship.group)}tracer;pilotMap;obsMap;dome;dome2;probe;telescopeRT=new Ln(384,384,{type:nn});telescopePanel;marker;ship;shipScene=new Ii;shipCam=new Dt(10,1,.1,1e5);telescopeZoom=1;image=null;diskTex;noise;quality;frame=0;lensingScene(){const e=this.world;return{spin:e.k.a,rPlus:e.rPlus,diskOn:e.diskOn,diskIn:e.disk.rIn,diskOut:e.disk.rOut,skyRot:e.skyRot}}makeTracer(e){const t=this.world,n=new Fy(16,{spin:t.k.a,rPlus:t.rPlus,diskOn:t.diskOn,diskIn:t.disk.rIn,diskOut:t.disk.rOut,diskTmax:t.disk.Tmax,diskTemp:this.diskTex,sky:this.sky,bb:this.bb,skyRot:t.skyRot});return n.setQuality(e.steps,e.h),n}setQuality(e){this.quality=e,this.tracer.setQuality(e.steps,e.h);for(const t of[this.pilotMap,this.obsMap])t.resize(e.map),t.setQuality(e.steps,e.h);this.pilotMap.facesPerFrame=e.faces,this.telescopeRT.setSize(e.telescope,e.telescope)}setDisk(e){this.tracer.setParams({diskOn:e});for(const t of[this.pilotMap,this.obsMap])t.setDisk(e),t.frontCam=null}mapCamera(e){const t=this.world.viewState(e);return{e:t.ref,pos:t.pos,t:t.t}}shade(e,t,n){const i=this.world.viewState(t);Wy(e,{map:t?this.obsMap:this.pilotMap,att:i.att,ref:i.ref,f:i.f,l:i.l,t:i.t,exposure:n})}renderSky(e,t,n){this.frame++,t?this.obsMap.frontCam||this.obsMap.update(e,()=>this.mapCamera(!0),!0):this.pilotMap.update(e,()=>this.mapCamera(!1),!this.pilotMap.frontCam),this.shade(this.dome.uniforms,t,n),this.shade(this.probe.uniforms,t,n),this.probe.update(e,1)}renderOther(e,t,n){const i=!t,r=i?this.obsMap:this.pilotMap;(!r.frontCam||!i)&&r.update(e,()=>this.mapCamera(i),!r.frontCam),this.shade(this.dome2.uniforms,i,n)}updateExternal(e,t){const n=this.world,i=n.observer.imageAt(n.observerT,n.ship.history);if(this.image=i,this.marker.visible=!!i,!i){this.telescopeZoom=1;return}const r=i.frac,o=(me,be)=>be?me.map((ye,ze)=>ye+r*(be[ze]-ye)):me,a=new w(...o(i.sol.dir,i.solB?.dir)).normalize(),l=i.solB?i.sol.g+r*(i.solB.g-i.sol.g):i.sol.g,c=i.solB?i.sol.DA+r*(i.solB.DA-i.sol.DA):i.sol.DA;this.marker.position.copy(a).multiplyScalar(100),this.marker.lookAt(0,0,0);const u=oc(n.massKg),h=this.ship.length/Math.max(c*u,1),f=$t.clamp(h*5,1e-12,.3);this.telescopeZoom=1.6/f;const d=a.clone(),p=Math.abs(d.y)>.95?new w(1,0,0):new w(0,1,0),v=new w().crossVectors(d,p).normalize(),g=new w().crossVectors(v,d).normalize(),m=d.clone().negate(),_=new Ce().set(v.x,g.x,m.x,v.y,g.y,m.y,v.z,g.z,m.z),y=n.disk.Tmax*.6,x=n.diskOn?.15*Math.min(1,n.def.diskOuter*n.def.diskOuter/(i.a.x**2+i.a.y**2+i.a.z**2+1))+1e-4:1e-4,E=cs(Math.max(l*y,300)).L*x*.3+1e-30,A=t*1e6,R=Math.min(.25/E,A);(this.quality.faces>=6||this.frame%3===0)&&(this.tracer.setCamera({e:n.observer.tetrad.e,pos:n.observer.pos,t:n.observerT},R),this.tracer.renderPerspective(e,this.telescopeRT,_,Math.tan(f/2)));const L=i.a,b=fi(n.k,[L.x,L.y,L.z],L.u,L.q),M=[0,0,0,1],P=new w(...[1,2,3].map(me=>jt(b.point,b.e[me],M))),D=n.observer.tetrad,O=new w(...[1,2,3].map(me=>jt(D.point,D.e[me],M))),V=new w(O.dot(v),O.dot(g),O.dot(m)),B=new w(...o(i.sol.emitDirShip,i.solB?.emitDirShip)).normalize(),W=new w(0,0,1),K=(me,be)=>{const ye=me.clone(),ze=be.clone().sub(ye.clone().multiplyScalar(be.dot(ye)));ze.lengthSq()<1e-12&&ze.set(0,1,0).sub(ye.clone().multiplyScalar(ye.y)),ze.normalize();const at=new w().crossVectors(ye,ze);return new Le().makeBasis(ye,ze,at)},G=K(B,P),de=K(W,V).multiply(G.transpose());this.ship.group.quaternion.setFromRotationMatrix(de);const pe=100;this.ship.group.position.set(0,0,-pe),this.ship.group.scale.setScalar(pe/Math.max(c*u,.001));const Ne=[0,-L.x,-L.y,-L.z],Xe=new w(...[1,2,3].map(me=>jt(b.point,b.e[me],Ne))).normalize(),qe=this.ship.shared;qe.uKeyDir.value.copy(Xe),qe.uG.value=l,qe.uKeyT.value=y,qe.uKeyK.value=x,qe.uEngine.value=L.thrust,qe.uTauEmit.value=i.tauEmit*n.Tm,qe.uExposure.value=R,this.shipCam.fov=$t.radToDeg(f),this.shipCam.near=pe*.01,this.shipCam.far=pe*100,this.shipCam.updateProjectionMatrix();const je=e.getRenderTarget(),$=e.xr.enabled,Q=e.autoClear;e.xr.enabled=!1,e.autoClear=!1,e.setRenderTarget(this.telescopeRT),e.clearDepth(),e.render(this.shipScene,this.shipCam),e.setRenderTarget(je),e.autoClear=Q,e.xr.enabled=$}observerTelemetry(){const e=this.image,t=this.world;if(!e)return{seen:!1,delay:0,g:0,tauEmit:0,lastFrozen:!1,telescopeZoom:1};const n=e.a.t+(e.b?e.frac*(e.b.t-e.a.t):0),i=e.solB?e.sol.g+e.frac*(e.solB.g-e.sol.g):e.sol.g;return{seen:!0,delay:(t.observerT-n)*t.Tm,g:i,tauEmit:e.tauEmit*t.Tm,lastFrozen:!e.b,telescopeZoom:this.telescopeZoom}}dispose(){this.tracer.cube.dispose(),this.tracer.material.dispose(),this.pilotMap.dispose(),this.obsMap.dispose(),this.probe.dispose(),this.dome.material.dispose(),this.dome2.material.dispose(),this.telescopeRT.dispose(),this.diskTex.dispose(),this.noise.dispose()}}function sM(s,e,t,n){const{M:i,a:r}=s,o=r*r,a=n*n,l=vn(r,e,t,n),c=l*l,u=c*l,h=c*c+o*a,f=c+o,d=2*i*u/h,p=[(l*e+r*t)/f,(l*t-r*e)/f,n/l],v=[u*e/h,u*t/h,l*n*f/h],g=2*i*c*(3*o*a-c*c)/(h*h),m=[g*v[0],g*v[1],g*v[2]-4*i*o*n*u/(h*h)],_=[];for(let y=0;y<3;y++){const x=y===0?1:0,E=y===1?1:0,A=y===2?1:0;_.push([(e*v[y]+l*x+r*E)/f-p[0]*2*l*v[y]/f,(t*v[y]+l*E-r*x)/f-p[1]*2*l*v[y]/f,A/l-n*v[y]/c])}return{r:l,f:d,l:p,df:m,dl:_}}function mo(s,e,t,n){const i=sM(s,e,t,n),r=[1,i.l[0],i.l[1],i.l[2]],o=[-1,i.l[0],i.l[1],i.l[2]],a=[-1,1,1,1],l=(f,d)=>(f===d?a[f]:0)-i.f*o[f]*o[d],c=(f,d,p)=>{if(f===0)return 0;const v=f-1,g=d===0?0:i.dl[v][d-1],m=p===0?0:i.dl[v][p-1];return i.df[v]*r[d]*r[p]+i.f*(g*r[p]+r[d]*m)},u=new Float64Array(64);for(let f=0;f<4;f++)for(let d=0;d<4;d++)for(let p=d;p<4;p++){const v=.5*(c(d,f,p)+c(p,f,d)-c(f,d,p));u[f*16+d*4+p]=v,u[f*16+p*4+d]=v}const h=new Float64Array(64);for(let f=0;f<4;f++)for(let d=0;d<4;d++)for(let p=0;p<4;p++){let v=0;for(let g=0;g<4;g++)v+=l(f,g)*u[g*16+d*4+p];h[f*16+d*4+p]=v}return h}function rM(s,e,t,n){const i=vn(s.a,e,t,n),r=1e-5*Math.max(i,.05),o=mo(s,e,t,n),a=[new Float64Array(64)],l=[e,t,n];for(let u=0;u<3;u++){const h=l.slice(),f=l.slice();h[u]+=r,f[u]-=r;const d=mo(s,h[0],h[1],h[2]),p=mo(s,f[0],f[1],f[2]),v=new Float64Array(64);for(let g=0;g<64;g++)v[g]=(d[g]-p[g])/(2*r);a.push(v)}const c=new Float64Array(256);for(let u=0;u<4;u++)for(let h=0;h<4;h++)for(let f=0;f<4;f++)for(let d=0;d<4;d++){let p=a[f][u*16+d*4+h]-a[d][u*16+f*4+h];for(let v=0;v<4;v++)p+=o[u*16+f*4+v]*o[v*16+d*4+h]-o[u*16+d*4+v]*o[v*16+f*4+h];c[u*64+h*16+f*4+d]=p}return c}function oM(s,e,t){const n=rM(s,e[0],e[1],e[2]),i=t.e[0],r=new Float64Array(16);for(let a=0;a<4;a++)for(let l=0;l<4;l++){let c=0;for(let u=0;u<4;u++)for(let h=0;h<4;h++)c+=n[a*64+u*16+l*4+h]*i[u]*i[h];r[a*4+l]=c}const o=[];for(let a=1;a<4;a++){const l=Pn(t.point,t.e[a],[0,0,0,0]),c=[];for(let u=1;u<4;u++){const h=t.e[u];let f=0;for(let d=0;d<4;d++)for(let p=0;p<4;p++)f+=l[d]*r[d*4+p]*h[p];c.push(f)}o.push(c)}for(let a=0;a<3;a++)for(let l=a+1;l<3;l++){const c=.5*(o[a][l]+o[l][a]);o[a][l]=c,o[l][a]=c}return o}function aM(s){const e=s.map(i=>i.slice()),t=[[1,0,0],[0,1,0],[0,0,1]];for(let i=0;i<50&&!(e[0][1]**2+e[0][2]**2+e[1][2]**2<1e-30*(e[0][0]**2+e[1][1]**2+e[2][2]**2+1e-300));i++)for(let o=0;o<2;o++)for(let a=o+1;a<3;a++){if(Math.abs(e[o][a])<1e-300)continue;const l=(e[a][a]-e[o][o])/(2*e[o][a]),c=Math.sign(l||1)/(Math.abs(l)+Math.sqrt(l*l+1)),u=1/Math.sqrt(c*c+1),h=c*u;for(let f=0;f<3;f++){const d=e[f][o],p=e[f][a];e[f][o]=u*d-h*p,e[f][a]=h*d+u*p}for(let f=0;f<3;f++){const d=e[o][f],p=e[a][f];e[o][f]=u*d-h*p,e[a][f]=h*d+u*p}for(let f=0;f<3;f++){const d=t[f][o],p=t[f][a];t[f][o]=u*d-h*p,t[f][a]=h*d+u*p}}const n=[0,1,2].sort((i,r)=>e[i][i]-e[r][r]);return{values:n.map(i=>e[i][i]),vectors:n.map(i=>[t[0][i],t[1][i],t[2][i]])}}class mf{half=[10,4,31];rhoEff=400;yieldPa=9e8;ultimatePa=125e7;compressionFactor=1.4;hullTempLimit=2500;hullTempDestroy=3600;crushPa=25e5;stress=0;integrity=1;deformation=[];failed=!1;failReason="";crew="nominal";crewDiffAccel=0;shipDiffAccel=0;instrumentsDown=new Set;hullTemp=3;thermalTau=90;pressure=0;tidalEig=[0,0,0];reset(){this.hullTemp=3,this.stress=0,this.integrity=1,this.deformation=[],this.failed=!1,this.failReason="",this.crew="nominal",this.instrumentsDown.clear()}extentAlong(e){const[t,n,i]=this.half;return 1/Math.sqrt((e[0]/t)**2+(e[1]/n)**2+(e[2]/i)**2)}invulnerable=!1;update(e,t,n){const{values:i,vectors:r}=aM(e);this.tidalEig=[i[0],i[1],i[2]];let o=0,a=r[0],l=0;for(let g=0;g<3;g++){const m=i[g],_=r[g],y=this.extentAlong(_),E=this.rhoEff*Math.abs(m)*y*y/2*(m>0?this.compressionFactor:1)/this.yieldPa;l=Math.max(l,Math.abs(m)*2*y),E>o&&(o=E,a=_)}this.shipDiffAccel=l;const c=[e[0][1]*1.8,e[1][1]*1.8,e[2][1]*1.8];this.crewDiffAccel=Math.hypot(c[0],c[1],c[2]);const u=Math.max(n.pressure/this.crushPa,n.dynPressure/6e5);this.stress=Math.max(o,u);const h=1-Math.exp(-t/this.thermalTau);this.hullTemp=this.hullTemp<=3.5?n.hullTemp:this.hullTemp+(n.hullTemp-this.hullTemp)*h;const f=this.hullTemp;if(this.pressure=n.pressure,!this.failed&&!this.invulnerable){if(o>1){const _=.02*(o-1)**1.5;this.addStrain(a,_*t),this.integrity-=_*t*4}f>this.hullTempLimit&&(this.integrity-=t*.05*((f-this.hullTempLimit)/300)),u>1&&(this.integrity-=t*.3*u);const g=Math.max(0,this.stress-.55)**2*.6*t;for(const _ of["navigation","relativity","structure","status","legend"])Math.random()<g&&this.instrumentsDown.add(_);const m=this.ultimatePa/this.yieldPa;o>m?this.fail("Catastrophic structural failure: tidal stress exceeded ultimate strength"):f>this.hullTempDestroy?this.fail("Hull destroyed by radiative heating"):u>2.5?this.fail("Hull collapse under atmospheric pressure"):this.integrity<=0&&this.fail("Structural integrity lost")}if(this.invulnerable)return;const d=this.crewDiffAccel,p=["nominal","aware","strained","injured","incapacitated","killed"],v=d>1500?"killed":d>400?"incapacitated":d>120?"injured":d>20?"strained":d>1?"aware":"nominal";(p.indexOf(v)>p.indexOf(this.crew)||p.indexOf(this.crew)<3)&&(this.crew=v),f>2e3&&p.indexOf(this.crew)<3&&(this.crew="injured")}addStrain(e,t){for(const n of this.deformation)if(Math.abs(n.axis[0]*e[0]+n.axis[1]*e[1]+n.axis[2]*e[2])>.95){n.strain+=t;return}this.deformation.push({axis:e,strain:t})}fail(e){this.failed=!0,this.failReason=e,this.integrity=0}deformationMatrix(){const e=[[1,0,0],[0,1,0],[0,0,1]];for(const t of this.deformation){const n=Math.min(t.strain,.6);for(let i=0;i<3;i++)for(let r=0;r<3;r++)e[i][r]+=n*t.axis[i]*t.axis[r]}return e}}const mt=(s,e)=>[s[0]+e[0],s[1]+e[1],s[2]+e[2]],Ot=(s,e)=>[s[0]-e[0],s[1]-e[1],s[2]-e[2]],ht=(s,e)=>[s[0]*e,s[1]*e,s[2]*e],Vn=(s,e)=>s[0]*e[0]+s[1]*e[1]+s[2]*e[2],wt=s=>Math.hypot(s[0],s[1],s[2]),lM=12e4,cM=1.2*150;class uM{constructor(e){this.def=e,this.bodies=e.bodies.map(l=>({def:l,pos:[0,0,0],vel:[0,0,0],rot:new Ce,spinAxis:[0,0,1]})),this.updateBodies(0);const t=this.bodies.findIndex(l=>l.def.name===e.start.near);this.targetIndex=t;const n=this.bodies[t],i=e.start.direction,r=wt(i);this.pos=mt(n.pos,ht(i,e.start.distance/r)),this.w=[...n.vel];const o=Ot(n.pos,this.pos),a=new Le().lookAt(new w(0,0,0),new w(...o).normalize(),new w(0,0,1));this.q.setFromRotationMatrix(a)}t=0;tau=0;pos=[0,0,0];w=[0,0,0];q=new Yt;bodies=[];structure=new mf;targetIndex=0;thrustG=1;assist=!1;warpLimited=!1;lastThrustWorld=[0,0,0];notices=[];env={rho:0,pressure:0,dynPressure:0,hullTemp:3,heatFlux:0,starFlux:0};probeMode=!1;get vel(){const e=Math.sqrt(1+Vn(this.w,this.w)/(Qe*Qe));return ht(this.w,1/e)}bodyIndex(e){return this.bodies.findIndex(t=>t.def.name===e)}updateBodies(e){for(const t of this.bodies){const n=t.def;if(n.parent){const l=this.bodies[this.bodyIndex(n.parent)],c=2*Math.PI/n.orbitPeriod,u=(n.orbitPhase??0)+c*e,h=n.orbitRadius,f=l.def.obliquity??0,d=Math.cos(f),p=Math.sin(f),v=h*Math.cos(u),g=h*Math.sin(u),m=-h*c*Math.sin(u),_=h*c*Math.cos(u),y=l.def.kind!=="star";t.pos=mt(l.pos,y?[v,g*d,g*p]:[v,g,0]),t.vel=mt(l.vel,y?[m,_*d,_*p]:[m,_,0])}else t.pos=[0,0,0],t.vel=[0,0,0];const i=n.obliquity??0,r=2*Math.PI*e/n.rotationPeriod,o=new Ce().set(1,0,0,0,Math.cos(i),-Math.sin(i),0,Math.sin(i),Math.cos(i)),a=new Ce().set(Math.cos(r),-Math.sin(r),0,Math.sin(r),Math.cos(r),0,0,0,1);t.rot=o.multiply(a),t.spinAxis=[0,-Math.sin(i),Math.cos(i)]}}gravity(e){let t=[0,0,0];for(const n of this.bodies){const i=Ot(e,n.pos),r=wt(i),o=Ai*n.def.mass;if(t=mt(t,ht(i,-o/(r*r*r))),n.def.J2){const a=n.spinAxis,l=Vn(i,a)/r,c=n.def.radius,u=1.5*n.def.J2*o*c*c/r**4;t=mt(t,mt(ht(i,u*(5*l*l-1)/r),ht(a,-2*u*l)))}}return t}potential(e){let t=0;for(const n of this.bodies)t-=Ai*n.def.mass/wt(Ot(e,n.pos));return t}tidalWorld(e){const t=[[0,0,0],[0,0,0],[0,0,0]];for(const n of this.bodies){const i=Ot(e,n.pos),r=wt(i),o=Ai*n.def.mass/r**3;for(let a=0;a<3;a++)for(let l=0;l<3;l++)t[a][l]+=o*((a===l?1:0)-3*i[a]*i[l]/(r*r))}return t}altitude(e,t){const n=Ot(t,e.pos),i=wt(n),r=e.def.flattening??0,o=Vn(n,e.spinAxis)/i,a=e.def.radius*(1-r*o*o);return i-a}atmosphereAt(e,t){for(const n of this.bodies){const i=n.def.atmosphere;if(!i)continue;const r=this.altitude(n,e);if(r>i.top)continue;const o=i.rho0*Math.exp(Math.min(-r/i.scaleHeight,12)),a=i.p0*Math.exp(Math.min(-r/i.scaleHeight,12)),l=ht(n.spinAxis,2*Math.PI/n.def.rotationPeriod),c=Ot(e,n.pos),u=mt(n.vel,[l[1]*c[2]-l[2]*c[1],l[2]*c[0]-l[0]*c[2],l[0]*c[1]-l[1]*c[0]]),h=Ot(t,u);return{rho:o,pressure:a,vr:h}}return null}deriv(e,t,n){const i=1+Vn(t,t)/(Qe*Qe),r=Math.sqrt(i),o=ht(t,1/r),a=wt(o);let l=n;if(a>0){const h=ht(o,1/a);l=mt(n,ht(h,(r-1)*Vn(h,n)))}let c=mt(ht(l,1/r),ht(this.gravity(e),r));const u=this.atmosphereAt(e,o);if(u){const h=wt(u.vr);c=mt(c,ht(u.vr,-.5*u.rho*h*cM/lM))}return[o,c]}rk4(e,t){const n=this.pos,i=this.w,[r,o]=this.deriv(n,i,t),[a,l]=this.deriv(mt(n,ht(r,e/2)),mt(i,ht(o,e/2)),t),[c,u]=this.deriv(mt(n,ht(a,e/2)),mt(i,ht(l,e/2)),t),[h,f]=this.deriv(mt(n,ht(c,e)),mt(i,ht(u,e)),t);this.pos=mt(n,ht(mt(mt(r,ht(a,2)),mt(ht(c,2),h)),e/6)),this.w=mt(i,ht(mt(mt(o,ht(l,2)),mt(ht(u,2),f)),e/6))}bodyAccel(e){this.updateBodies(this.t+60);const n=[...e.vel];this.updateBodies(this.t-60);const i=[...e.vel];return this.updateBodies(this.t),ht(Ot(n,i),1/120)}update(e,t,n){this.notices=[];const i=.6,r=new Yt().setFromEuler(new Xt(n.rot[0]*i*e,n.rot[1]*i*e,n.rot[2]*i*e,"XYZ"));this.q.multiply(r).normalize();const o=e*t,a=this.bodies[this.targetIndex],l=new w(...n.thrust).multiplyScalar(this.thrustG*An).applyQuaternion(this.q);let c=[l.x,l.y,l.z];if(this.assist&&wt(n.thrust)<.001){const f=this.bodyAccel(a),d=this.gravity(this.pos),p=Math.max(5,o*4),v=Ot(this.vel,a.vel);let g=Ot(Ot(f,d),ht(v,1/p));const m=30*An,_=wt(g);_>m&&(g=ht(g,m/_),this.notices.push("Station-keeping saturated (30 g limit)")),c=g}this.lastThrustWorld=c;let u=o,h=0;for(this.warpLimited=!1;u>0;){let f=u;for(const v of this.bodies){const g=wt(Ot(this.pos,v.pos));f=Math.min(f,.01*Math.sqrt(g*g*g/(Ai*v.def.mass)));const m=Math.max(this.altitude(v,this.pos),1),_=wt(Ot(this.vel,v.vel))+1;f=Math.min(f,Math.max(.05*m/_,.002))}if(wt(c)>0&&(f=Math.min(f,2+.01*wt(this.vel)/wt(c))),++h>600){this.warpLimited=!0;break}this.updateBodies(this.t),this.rk4(f,c);const d=this.vel,p=f*Math.sqrt(Math.max(1+2*this.potential(this.pos)/(Qe*Qe)-Vn(d,d)/(Qe*Qe),0));this.t+=f,this.tau+=p,u-=f}this.updateBodies(this.t),this.updateEnvironment(e,o)}updateEnvironment(e,t){const n=this.vel,i=this.atmosphereAt(this.pos,n);let r=0,o=0,a=0;if(i){const p=wt(i.vr);r=17e-5*Math.sqrt(i.rho/1.5)*p**3,o=i.pressure,a=.5*i.rho*p*p}let l=0;for(const p of this.bodies){if(p.def.kind!=="star")continue;const v=wt(Ot(this.pos,p.pos));v<p.def.radius?(this.structure.fail(`Entered the photosphere of ${p.def.name}`),l+=er*p.def.Teff**4):l+=er*p.def.Teff**4*(p.def.radius/v)**2}const c=Math.pow((l+r)/(.9*er)+3**4,.25);for(const p of this.bodies)p.def.kind==="rocky"&&this.altitude(p,this.pos)<0&&this.structure.fail(`Impact on ${p.def.name}`);this.env={rho:i?.rho??0,pressure:o,dynPressure:a,hullTemp:c,heatFlux:r,starFlux:l};const u=this.tidalWorld(this.pos),h=new Ce().setFromMatrix4(new Le().makeRotationFromQuaternion(this.q)).elements,f=(p,v)=>h[v*3+p],d=[[0,0,0],[0,0,0],[0,0,0]];for(let p=0;p<3;p++)for(let v=0;v<3;v++){let g=0;for(let m=0;m<3;m++)for(let _=0;_<3;_++)g+=f(m,p)*u[m][_]*f(_,v);d[p][v]=g}this.structure.invulnerable=this.probeMode,this.structure.update(d,t,{hullTemp:c,pressure:o,dynPressure:a})}telemetry(){const e=this.bodies[this.targetIndex],t=Ot(this.pos,e.pos),n=wt(t),i=Ot(this.vel,e.vel),r=this.vel,o=wt(i),a=1/Math.sqrt(1-Vn(r,r)/(Qe*Qe)),l=Math.sqrt(Math.max(1+2*this.potential(this.pos)/(Qe*Qe)-Vn(r,r)/(Qe*Qe),0)),c=this.structure,u=[...this.notices];return this.env.rho>0&&u.push(`In ${e.def.name}'s atmosphere: ρ = ${this.env.rho.toExponential(2)} kg/m³, ${(this.env.pressure/1e5).toFixed(2)} bar`),c.hullTemp>1200&&u.push(`HULL HEATING ${c.hullTemp.toFixed(0)} K (equilibrium ${this.env.hullTemp.toFixed(0)} K)`),{mode:"newtonian",properTime:this.tau,coordTime:this.t,dTauDt:l,thrustG:this.thrustG,assist:this.assist?"STATION-KEEP":"OFF",speed:o,gamma:a,speedFrame:`rel. ${e.def.name}`,target:{name:e.def.name,distance:n,altitude:this.altitude(e,this.pos),angularDiameterDeg:2*Math.asin(Math.min(1,e.def.radius/n))*180/Math.PI,closingSpeed:-Vn(i,t)/n},gravity:wt(this.gravity(this.pos)),tidal:{eig:c.tidalEig,shipDiffAccel:c.shipDiffAccel,crewDiffAccel:c.crewDiffAccel},structure:{stress:c.stress,integrity:c.integrity,plasticStrain:c.deformation.reduce((h,f)=>Math.max(h,f.strain),0),hullTemp:c.hullTemp,pressure:this.env.pressure,failed:c.failed,crew:c.crew,instrumentsDown:[...c.instrumentsDown]},notices:u,physics:{established:["Newtonian gravity + Jupiter J2 (weak field, v ≪ c)","Special-relativistic ship kinematics & aberration/Doppler of starlight","Weak-field time dilation dτ/dt = √(1 + 2Φ/c² − v²/c²)","Radiative equilibrium hull heating","Exponential-atmosphere drag & pressure"],approximated:["Circular analytic orbits (real radii/periods)","Procedural cloud/surface detail","Single-scattering haze with 10 samples","Glare: CIE disability-glare law, not a full eye model"],speculative:[]}}}}function hM(s,e,t,n=400){if(t<=e)return 0;const i=1e-5*t,r=d=>df(s,d),o=r(t),a=(r(t+i).Omega-r(t-i).Omega)/(2*i);let l=0;const c=Math.log(e),u=Math.log(t);let h=0;for(let d=0;d<=n;d++){const p=Math.exp(c+(u-c)*d/n),v=1e-5*p,g=r(p),m=(r(p+v).L-r(Math.max(p-v,e)).L)/(p+v-Math.max(p-v,e)),_=(g.E-g.Omega*g.L)*m*p;d>0&&(l+=.5*(_+h)*((u-c)/n)),h=_}const f=o.E-o.Omega*o.L;return-a/(f*f)*l/(4*Math.PI*t)}function fM(s,e,t,n,i=256){const r=ff(s),o=1-df(s,r).E,a=t*Ly(e)/(o*Qe*Qe),l=oc(e),c=new Float64Array(i),u=new Float64Array(i);let h=0,f=r;for(let d=0;d<i;d++){const p=r*Math.pow(n/r,d/(i-1));c[d]=p;const v=hM(s,r,p,200),g=a*Qe*Qe*v/(l*l);u[d]=Math.pow(Math.max(g,0)/er,.25),u[d]>h&&(h=u[d],f=p)}return{rIn:r,rOut:n,r:c,T:u,Tmax:h,rTmax:f,efficiency:o,mdot:a}}const to={ok:!1,dir:[0,0,-1],travelT:1/0,g:0,DA:1/0,emitDirShip:[0,0,1],residual:1/0};function dM(s,e){const t=Wn(s),n=[-t[0],-t[1],-t[2]];let i=tr(e,n);Math.hypot(...i)<1e-9&&(i=tr([1,0,0],n)),i=Wn(i);const r=tr(n,i),o=[[i[0],r[0],n[0]],[i[1],r[1],n[1]],[i[2],r[2],n[2]]];return pM(o)}function pM(s){const e=s[0][0]+s[1][1]+s[2][2];let t,n,i,r;if(e>0){const a=.5/Math.sqrt(e+1);r=.25/a,t=(s[2][1]-s[1][2])*a,n=(s[0][2]-s[2][0])*a,i=(s[1][0]-s[0][1])*a}else if(s[0][0]>s[1][1]&&s[0][0]>s[2][2]){const a=2*Math.sqrt(1+s[0][0]-s[1][1]-s[2][2]);r=(s[2][1]-s[1][2])/a,t=.25*a,n=(s[0][1]+s[1][0])/a,i=(s[0][2]+s[2][0])/a}else if(s[1][1]>s[2][2]){const a=2*Math.sqrt(1+s[1][1]-s[0][0]-s[2][2]);r=(s[0][2]-s[2][0])/a,t=(s[0][1]+s[1][0])/a,n=.25*a,i=(s[1][2]+s[2][1])/a}else{const a=2*Math.sqrt(1+s[2][2]-s[0][0]-s[1][1]);r=(s[1][0]-s[0][1])/a,t=(s[0][2]+s[2][0])/a,n=(s[1][2]+s[2][1])/a,i=.25*a}const o=Math.hypot(t,n,i,r);return[t/o,n/o,i/o,r/o]}const tr=(s,e)=>[s[1]*e[2]-s[2]*e[1],s[2]*e[0]-s[0]*e[2],s[0]*e[1]-s[1]*e[0]],Wn=s=>{const e=Math.hypot(s[0],s[1],s[2])||1;return[s[0]/e,s[1]/e,s[2]/e]};class mM{constructor(e,t,n=[0,0,0]){this.k=e,this.pos=t;const i=_n(e,t[0],t[1],t[2]),r=eM(i);if(!r)throw new Error("observer must be outside the ergoregion");const o=Pn(i,r),a=[n[0]-t[0],n[1]-t[1],n[2]-t[2]],l=dM(a,Math.abs(Wn(a)[2])>.95?[0,1,0]:[0,0,1]);this.q=l,this.tetrad=fi(e,t,o,l),this.refTetrad=fi(e,t,o,[0,0,0,1]),this.rPlus=Lo(e)}tetrad;refTetrad;q;rPlus;cache=new WeakMap;hint=0;lastDir=null;solvesThisFrame=0;maxSolvesPerFrame=8;s=new Float64Array(8);d=new Float64Array(8);prev=new Float64Array(8);shoot(e,t){const{k:n,tetrad:i}=this,r=i.e,o=[0,0,0,0];for(let p=0;p<4;p++)o[p]=-r[0][p]+e[0]*r[1][p]+e[1]*r[2][p]+e[2]*r[3][p];const a=Pn(i.point,o),l=this.s;l.set([0,this.pos[0],this.pos[1],this.pos[2],a[0],a[1],a[2],a[3]]);const c=vn(n.a,t[0],t[1],t[2]),u=3*Math.max(Math.hypot(...this.pos),Math.hypot(t[0],t[1],t[2]),20),h=()=>Math.hypot(l[1]-t[0],l[2]-t[1],l[3]-t[2]);let f=h();const d=this.prev;for(let p=0;p<2e4;p++){rs(n.M,n.a,l,this.d);const v=Math.hypot(this.d[1],this.d[2],this.d[3]),g=vn(n.a,l[1],l[2],l[3]),m=Math.max(Math.min(.02*Math.max(g,.3),.25*f),1e-12)/v;d.set(l),jy(n.M,n.a,l,m);const _=h();if(_>f){const x=d[1],E=d[2],A=d[3],R=l[1]-x,L=l[2]-E,b=l[3]-A,M=R*R+L*L+b*b;let P=M>0?((t[0]-x)*R+(t[1]-E)*L+(t[2]-A)*b)/M:0;P=Math.min(1,Math.max(0,P));const D=[x+P*R,E+P*L,A+P*b],O=V=>d[V]+P*(l[V]-d[V]);return{ok:!0,closest:D,t:O(0),p:[O(4),O(5),O(6),O(7)],miss:[D[0]-t[0],D[1]-t[1],D[2]-t[2]]}}f=_;const y=vn(n.a,l[1],l[2],l[3]);if(y>u||c>this.rPlus&&y<this.rPlus*(1+1e-7))break}return{ok:!1,closest:[0,0,0],t:0,p:[0,0,0,0],miss:[1e9,1e9,1e9]}}straightGuess(e){const t=[0,e[0]-this.pos[0],e[1]-this.pos[1],e[2]-this.pos[2]],n=this.tetrad.point,i=this.tetrad.e,r=o=>{const a=Pn(n,i[o]);return a[0]*t[0]+a[1]*t[1]+a[2]*t[2]+a[3]*t[3]};return Wn([r(1),r(2),r(3)])}solve(e){const t=this.cache.get(e);if(t)return t;const{k:n}=this,i=[e.x,e.y,e.z];if(vn(n.a,i[0],i[1],i[2])<=this.rPlus)return this.cache.set(e,to),to;this.solvesThisFrame++;const o=Math.hypot(i[0]-this.pos[0],i[1]-this.pos[1],i[2]-this.pos[2]),a=1e-7*Math.max(o,1);let l=this.lastDir??this.straightGuess(i),c=this.shoot(l,i);c.ok||(l=this.straightGuess(i),c=this.shoot(l,i));const u=1e-6;let h=[[0,0],[0,0],[0,0]];for(let M=0;M<14&&c.ok;M++){const P=Wn(tr(l,Math.abs(l[1])<.9?[0,1,0]:[1,0,0])),D=tr(l,P),O=this.shoot(Wn([l[0]+u*P[0],l[1]+u*P[1],l[2]+u*P[2]]),i),V=this.shoot(Wn([l[0]+u*D[0],l[1]+u*D[1],l[2]+u*D[2]]),i);if(!O.ok||!V.ok||(h=[0,1,2].map($=>[(O.miss[$]-c.miss[$])/u,(V.miss[$]-c.miss[$])/u]),Math.hypot(...c.miss)<a))break;const B=h[0][0]**2+h[1][0]**2+h[2][0]**2,W=h[0][1]**2+h[1][1]**2+h[2][1]**2,K=h[0][0]*h[0][1]+h[1][0]*h[1][1]+h[2][0]*h[2][1],G=-(h[0][0]*c.miss[0]+h[1][0]*c.miss[1]+h[2][0]*c.miss[2]),le=-(h[0][1]*c.miss[0]+h[1][1]*c.miss[1]+h[2][1]*c.miss[2]),de=B*W-K*K;if(Math.abs(de)<1e-300)break;let pe=(G*W-le*K)/de,Ne=(B*le-K*G)/de;const Xe=Math.hypot(pe,Ne);Xe>.2&&(pe*=.2/Xe,Ne*=.2/Xe);const qe=Wn([l[0]+pe*P[0]+Ne*D[0],l[1]+pe*P[1]+Ne*D[1],l[2]+pe*P[2]+Ne*D[2]]),je=this.shoot(qe,i);if(!je.ok)break;l=qe,c=je}const f=Math.hypot(...c.miss);if(!c.ok||f>Math.max(.001*o,1e-4))return this.cache.set(e,to),to;this.lastDir=l;const d=_n(n,i[0],i[1],i[2]),p=mr(d,e.u),v=c.p[0]*p[0]+c.p[1]*p[1]+c.p[2]*p[2]+c.p[3]*p[3],g=v>0?1/v:0,m=h[0][0]**2+h[1][0]**2+h[2][0]**2,_=h[0][1]**2+h[1][1]**2+h[2][1]**2,y=h[0][0]*h[0][1]+h[1][0]*h[1][1]+h[2][0]*h[2][1],x=Math.sqrt(Math.sqrt(Math.max(m*_-y*y,0)))||o,E=fi(n,i,e.u,e.q),A=mr(d,c.p),R=M=>{const P=Pn(d,E.e[M]);return-(P[0]*A[0]+P[1]*A[1]+P[2]*A[2]+P[3]*A[3])},L=Wn([R(1),R(2),R(3)]),b={ok:!0,dir:l,travelT:-c.t,g,DA:x,emitDirShip:L,residual:f};return this.cache.set(e,b),b}arrival(e){const t=this.solve(e);return t.ok?e.t+t.travelT:1/0}imageAt(e,t){const n=t.length;if(n===0)return null;this.solvesThisFrame=0;let i=Math.min(this.hint,n-1);const r=()=>this.solvesThisFrame<this.maxSolvesPerFrame||this.cache.has(t[Math.min(i+1,n-1)]);if(this.arrival(t[i])>e){let f=0,d=i;if(this.arrival(t[0])>e)return null;for(;d-f>1;){const p=f+d>>1;this.arrival(t[p])<=e?f=p:d=p}i=f}else for(;i+1<n&&r()&&this.arrival(t[i+1])<=e;)i++;this.hint=i;const o=t[i],a=this.solve(o);if(!a.ok)return null;let l=null,c=null,u=0;if(i+1<n){const f=this.solve(t[i+1]);if(f.ok){l=t[i+1],c=f;const d=o.t+a.travelT,p=l.t+f.travelT;u=p>d?Math.min(1,Math.max(0,(e-d)/(p-d))):0}}const h=o.tau+(l?u*(l.tau-o.tau):0);return{a:o,b:l,frac:u,sol:a,solB:c,tauEmit:h}}}class gM{constructor(e){this.k=e,this.rPlus=Lo(e),this.rMinus=hf(e)}s=new Float64Array(8);tau=0;q=[0,0,0,1];thrustBody=[0,0,0];rPlus;rMinus;history=[];maxHistory=12e4;terminated=null;lastRecordTau=-1/0;lastRecordLog=1/0;get r(){return vn(this.k.a,this.s[1],this.s[2],this.s[3])}get pos(){return[this.s[1],this.s[2],this.s[3]]}get uCov(){return[this.s[4],this.s[5],this.s[6],this.s[7]]}get insideHorizon(){return this.r<this.rPlus}placeAtRest(e){const t=os(this.k,e[0],e[1],e[2]);if(!t)throw new Error("cannot start inside horizon");const n=_n(this.k,e[0],e[1],e[2]),i=Pn(n,t);this.s.set([0,e[0],e[1],e[2],i[0],i[1],i[2],i[3]]),this.tau=0,this.history=[],this.terminated=null,this.lastRecordTau=-1/0,this.record(!0)}setVelocityRelZamo(e){const t=this.pos,n=os(this.k,t[0],t[1],t[2]);if(!n)return;const i=_n(this.k,t[0],t[1],t[2]),r=fi(this.k,t,Pn(i,n),[0,0,0,1]),o=e[0]*e[0]+e[1]*e[1]+e[2]*e[2],a=1/Math.sqrt(1-o),l=[0,0,0,0];for(let u=0;u<4;u++)l[u]=a*(r.e[0][u]+e[0]*r.e[1][u]+e[1]*r.e[2][u]+e[2]*r.e[3][u]);const c=Pn(i,l);this.s[4]=c[0],this.s[5]=c[1],this.s[6]=c[2],this.s[7]=c[3],Yu(this.k,this.s)}tetrad(){return fi(this.k,this.pos,this.uCov,this.q)}deriv(e,t){rs(this.k.M,this.k.a,e,t);const n=this.thrustBody;if(n[0]===0&&n[1]===0&&n[2]===0)return;const i=fi(this.k,[e[1],e[2],e[3]],[e[4],e[5],e[6],e[7]],this.q),r=[0,0,0,0];for(let a=0;a<4;a++)r[a]=n[0]*i.e[1][a]+n[1]*i.e[2][a]+n[2]*i.e[3][a];const o=Pn(i.point,r);for(let a=0;a<4;a++)t[4+a]+=o[a]}k1=new Float64Array(8);k2=new Float64Array(8);k3=new Float64Array(8);k4=new Float64Array(8);tmp=new Float64Array(8);rk4(e){const{s:t,k1:n,k2:i,k3:r,k4:o,tmp:a}=this;this.deriv(t,n);for(let l=0;l<8;l++)a[l]=t[l]+.5*e*n[l];this.deriv(a,i);for(let l=0;l<8;l++)a[l]=t[l]+.5*e*i[l];this.deriv(a,r);for(let l=0;l<8;l++)a[l]=t[l]+e*r[l];this.deriv(a,o);for(let l=0;l<8;l++)t[l]+=e/6*(n[l]+2*i[l]+2*r[l]+o[l]);Yu(this.k,t)}maxSubstep(){const e=this.r,t=this.rPlus;let n=.01*Math.pow(Math.max(e,.05),1.5);const i=Math.abs(e-t);i<1&&(n=Math.min(n,Math.max(.04*i,2e-7))),e<t&&(n=Math.min(n,Math.max(.02*(e-this.rMinus),1e-7)));const r=Math.hypot(...this.thrustBody);return r>0&&(n=Math.min(n,.02/r)),n}advance(e,t=400){if(this.terminated)return 0;let n=0;for(let i=0;i<t&&n<e;i++){const r=Math.min(this.maxSubstep(),e-n);this.rk4(r),n+=r,this.tau+=r,this.record(!1);const o=this.r;if(this.k.a!==0&&o<this.rMinus*1.02+1e-6){this.terminated="inner-horizon";break}if(o<.02*this.rPlus){this.terminated="singularity";break}}return n}record(e){const t=this.r,n=Math.log(Math.abs(t-this.rPlus)+1e-300),i=Math.abs(t-this.rPlus)<2,r=.02*Math.pow(Math.max(t,1),1.5);if(!e){if(i){if(Math.abs(n-this.lastRecordLog)<.03&&this.tau-this.lastRecordTau<r)return}else if(this.tau-this.lastRecordTau<r)return}this.lastRecordTau=this.tau,this.lastRecordLog=n;const o=this.s;this.history.push({tau:this.tau,t:o[0],x:o[1],y:o[2],z:o[3],u:[o[4],o[5],o[6],o[7]],q:[...this.q],thrust:Math.min(1,Math.hypot(...this.thrustBody)>0?1:0)}),this.history.length>this.maxHistory&&this.history.splice(0,this.history.length-this.maxHistory)}preroll(e){const t=this.thrustBody;this.thrustBody=[0,0,0];const n=Float64Array.from(this.s);let i=0;for(let o=0;o<2e4&&i<e;o++){const a=Math.min(this.maxSubstep(),e-i);if(this.rk4(-a),i+=a,this.r<this.rPlus*1.5)break}this.s[0],this.history=[],this.lastRecordTau=-1/0,this.tau=-i,this.record(!0);let r=0;for(let o=0;o<4e4&&r<i;o++){const a=Math.min(this.maxSubstep(),i-r);this.rk4(a),r+=a,this.tau+=a,this.record(!1)}this.s.set(n),this.tau=0,this.thrustBody=t}localSpeed(){const e=this.pos,t=_n(this.k,e[0],e[1],e[2]),n=this.tetrad().e[0],i=os(this.k,e[0],e[1],e[2]),r=i??pf(t).n,o=Math.max(1,tM(t,n,r));return{gamma:o,v:Math.sqrt(1-1/(o*o)),frame:i?"ZAMO":"KS-normal"}}zamoVelocityInBody(){const e=this.pos,t=os(this.k,e[0],e[1],e[2]);if(!t)return null;const n=nM(this.tetrad(),t);return[n[1]/n[0],n[2]/n[0],n[3]/n[0]]}}function vM(s,e){const t=os(s,e[0],e[1],e[2]);if(!t)return null;const n=vn(s.a,e[0],e[1],e[2]),i=1e-6*Math.max(n,1),r=[e[0]+i*t[1],e[1]+i*t[2],e[2]+i*t[3]],o=os(s,r[0],r[1],r[2]);if(!o)return null;const a=mo(s,e[0],e[1],e[2]),l=[0,0,0,0];for(let c=0;c<4;c++){let u=(o[c]-t[c])/i;for(let h=0;h<4;h++)for(let f=0;f<4;f++)u+=a[c*16+h*4+f]*t[h]*t[f];l[c]=u}return l}class xM{constructor(e){this.def=e,this.k={M:1,a:e.spin},this.massKg=e.massSolar*rc,this.Lm=oc(this.massKg),this.Tm=Py(this.massKg),this.rPlus=Lo(this.k),this.rMinus=hf(this.k),this.diskOn=e.disk,this.disk=fM(this.k,this.massKg,e.eddington,e.diskOuter,192),this.ship=new gM(this.k),this.resetShip();const t=e.startTheta-.25,n=-.85,i=e.observerR;this.observer=new mM(this.k,[i*Math.sin(t)*Math.cos(n),i*Math.sin(t)*Math.sin(n),i*Math.cos(t)]);const[r,o,a]=e.orientation;this.skyRot=new Ce().setFromMatrix4(new Le().makeRotationFromEuler(new Xt(r,o,a)))}k;massKg;Lm;Tm;rPlus;rMinus;disk;ship;observer;structure=new mf;thrustG=1;assist=!1;warpLimited=!1;notices=[];horizonCrossTau=null;observerT=0;probeMode=!1;diskOn;skyRot;E=[[0,0,0],[0,0,0],[0,0,0]];hoverAccel=0;tidalTimer=0;events=[];resetShip(){const{def:e}=this,t=e.startR,n=e.startTheta,i=[t*Math.sin(n),0,t*Math.cos(n)];this.ship.placeAtRest(i);const r=Math.min(Math.sqrt(1/Math.max(t-2,1)),.9)*(e.startOrbitFraction??.98);this.ship.setVelocityRelZamo([0,r,0]);const o=[-i[0],-i[1],-i[2]];this.ship.q=gf(o,[0,0,1]),this.ship.history=[],this.ship.preroll(1.6*(e.observerR+e.startR)),this.structure.reset(),this.horizonCrossTau=null,this.observerT=0,this.events=[]}update(e,t,n,i){this.notices=[];const r=this.ship,o=.6*e,a=new Yt(...r.q);a.multiply(new Yt().setFromEuler(new Xt(n.rot[0]*o,n.rot[1]*o,n.rot[2]*o,"XYZ"))).normalize(),r.q=[a.x,a.y,a.z,a.w];const l=e*t/this.Tm,c=this.Lm/(Qe*Qe);let u=[n.thrust[0]*this.thrustG*An*c,n.thrust[1]*this.thrustG*An*c,n.thrust[2]*this.thrustG*An*c];const h=r.insideHorizon?null:vM(this.k,r.pos);if(h){const g=_n(this.k,...r.pos);this.hoverAccel=Math.sqrt(Math.max(jt(g,h,h),0))*Qe*Qe/this.Lm}else this.hoverAccel=1/0;if(this.assist&&Math.hypot(...n.thrust)<.001){const g=r.zamoVelocityInBody();if(!g||!h)this.notices.push("No stationary frame exists inside the horizon: station-keeping impossible");else{const m=r.tetrad(),_=m.point,y=[1,2,3].map(L=>jt(_,m.e[L],h)),x=1/Math.max(l*5,1e-9);let E=[y[0]+x*g[0],y[1]+x*g[1],y[2]+x*g[2]];const A=30*An*c,R=Math.hypot(E[0],E[1],E[2]);R>A&&(E=E.map(L=>L*A/R),this.notices.push(`Hovering here needs ${(this.hoverAccel/An).toExponential(2)} g — engines saturated`)),u=E}}r.thrustBody=u;const f=1500;let d=l;i&&(this.observerT+=l*this.observerRate(),d=Math.max(0,Math.min(l*4,this.observerT-r.s[0]>0?l*2:0)));const p=r.insideHorizon,v=r.advance(d,f);if(this.warpLimited=v<d*.999&&!r.terminated,i||(this.observerT=Math.max(this.observerT,r.s[0])),!p&&r.insideHorizon&&this.horizonCrossTau===null&&(this.horizonCrossTau=r.tau,this.events.push("horizon")),this.tidalTimer-=e,this.tidalTimer<=0||t>1){this.tidalTimer=.05;const g=r.tetrad(),m=oM(this.k,r.pos,g),_=1/(this.Tm*this.Tm);this.E=m.map(y=>y.map(x=>x*_))}this.structure.invulnerable=this.probeMode,this.structure.update(this.E,v*this.Tm,{hullTemp:this.hullTemp(),pressure:0,dynPressure:0})}observerRate(){const e=_n(this.k,...this.ship.pos),t=mr(e,this.ship.uCov);return Math.min(Math.max(t[0],1),50)}hullTemp(){if(!this.diskOn)return 3;const e=this.disk.efficiency*this.disk.mdot*Qe*Qe,t=Math.max(this.ship.r,this.disk.rIn)*this.Lm,n=e/(4*Math.PI*t*t);return Math.pow(n/er+81,.25)}viewState(e){const t=e?this.observer.pos:this.ship.pos,n=e?this.observer.refTetrad:fi(this.k,t,this.ship.uCov,[0,0,0,1]),i=e?this.observer.q:this.ship.q,r=new Le().makeRotationFromQuaternion(new Yt(i[0],i[1],i[2],i[3])),o=new Ce().setFromMatrix4(r),a=n.point;return{ref:n.e,pos:[t[0],t[1],t[2]],att:o,f:a.f,l:[a.lx,a.ly,a.lz],t:e?this.observerT:this.ship.s[0]}}tetradForCamera(e){return e?{e:this.observer.tetrad.e,pos:this.observer.pos,t:this.observerT}:{e:this.ship.tetrad().e,pos:this.ship.pos,t:this.ship.s[0]}}starlightShift(e){const t=this.ship.tetrad(),n=[0,0,0,0].map((r,o)=>-t.e[0][o]+e[0]*t.e[1][o]+e[1]*t.e[2][o]+e[2]*t.e[3][o]),i=Pn(t.point,n);return i[0]>0?1/i[0]:1/0}telemetry(){const e=this.ship,t=_n(this.k,...e.pos),n=mr(t,e.uCov),i=e.r,r=e.localSpeed(),o=this.structure,a=[...this.notices];e.insideHorizon&&a.push("INSIDE THE EVENT HORIZON — every future-directed path leads to smaller r"),e.terminated==="inner-horizon"&&a.push("Reached the inner (Cauchy) horizon: simulation stops (see legend)"),e.terminated==="singularity"&&a.push("Approached r → 0: classical GR breaks down here");const l=i>3?2*Math.asin(Math.min(1,3*Math.sqrt(3)*Math.sqrt(Math.max(1-2/i,0))/i))*180/Math.PI:180,c=(()=>{const f=e.pos,d=[n[1],n[2],n[3]];return(vn(this.k.a,f[0]+1e-6*d[0],f[1]+1e-6*d[1],f[2]+1e-6*d[2])-i)/1e-6})(),u={established:["Ship follows Kerr geodesics + engine 4-force (Kerr–Schild, through the horizon)","Light paths: lensing, multiple images, shadow, photon ring","Colour/brightness shifts: g = E_obs/E_emit (gravity + Doppler + aberration), T → gT","Tidal stress from the Riemann tensor in the ship frame","External observer: light-travel delay, freezing and e^(−κt) fading"],approximated:["Thin Novikov–Thorne blackbody disk; no corona, jets or radiative transfer","Ray tracer: RK4 at cube-map resolution; weak-field tail beyond r_far","Background sky is procedural, same for every system","Ship attitude referenced to boosted Kerr–Schild frame (no gyroscope precession)","Observer image size from ray Jacobian; primary image only"],speculative:[]};return e.insideHorizon&&u.speculative.push("Sky regions whose light would come from the white hole / other universe of eternal Kerr have no physical source: shown black"),(e.terminated==="inner-horizon"||this.k.a>0&&i<this.rMinus*1.3)&&u.speculative.push("Beyond the inner horizon: mass-inflation instability; what an observer meets is unknown — not rendered"),this.k.a===0&&i<.3&&u.speculative.push("Near r = 0 quantum gravity is needed; nothing is shown as fact"),{mode:"kerr",properTime:e.tau*this.Tm,coordTime:e.s[0]*this.Tm,dTauDt:1/n[0],thrustG:this.thrustG,assist:this.assist?"HOLD ZAMO":"OFF",speed:r.v*Qe,gamma:r.gamma,speedFrame:r.frame,target:{name:this.def.name.split(" (")[0],distance:i*this.Lm,altitude:(i-this.rPlus)*this.Lm,angularDiameterDeg:l,closingSpeed:-c*Qe},gravity:this.hoverAccel,tidal:{eig:o.tidalEig,shipDiffAccel:o.shipDiffAccel,crewDiffAccel:o.crewDiffAccel},structure:{stress:o.stress,integrity:o.integrity,plasticStrain:o.deformation.reduce((h,f)=>Math.max(h,f.strain),0),hullTemp:o.hullTemp,pressure:0,failed:o.failed,crew:o.crew,instrumentsDown:[...o.instrumentsDown]},bh:{massSolar:this.def.massSolar,spin:this.k.a,rOverM:i,rPlusOverM:this.rPlus,distToHorizonM:(i-this.rPlus)*this.Lm,inside:e.insideHorizon,horizonCrossTau:this.horizonCrossTau===null?void 0:this.horizonCrossTau*this.Tm,hoverAccelG:this.hoverAccel/An,gravRedshiftAhead:this.starlightShift([0,0,-1]),gravRedshiftBehind:this.starlightShift([0,0,1]),terminated:e.terminated??void 0},notices:a,physics:u}}info(){return{isco:ff(this.k),horizonKm:this.rPlus*this.Lm/1e3,Tmax:this.disk.Tmax}}}function gf(s,e){const t=new Le().lookAt(new w(0,0,0),new w(s[0],s[1],s[2]).normalize(),new w(e[0],e[1],e[2])),n=new Yt().setFromRotationMatrix(t);return[n.x,n.y,n.z,n.w]}const _M=5.2044*Rl,yM={name:"Sun",kind:"star",mass:rc,radius:Al,rotationPeriod:25.38*En,obliquity:.1265,Teff:5772,style:"sun"},ju=(s,e,t)=>({kind:"newtonian",id:s==="Sun"?"sun":"jupiter",name:s==="Sun"?"The Sun (close approach)":"Jupiter",blurb:s==="Sun"?"Start 0.1 AU from the photosphere. Granulation cells are the size of countries; the disc is 13° across.":"Start 3.2 million km out. Jupiter is 143,000 km wide; Io, Europa, Ganymede and Callisto orbit at true scale.",bodies:[yM,{name:"Jupiter",kind:"gasgiant",mass:189819e22,radius:71492e3,flattening:.06487,J2:.014736,parent:"Sun",orbitRadius:_M,orbitPeriod:11.862*af,orbitPhase:.6,rotationPeriod:9.925*Cy,obliquity:.0546,albedo:.52,style:"jupiter",atmosphere:{scaleHeight:27e3,rho0:.16,p0:1e5,top:4e5}},{name:"Io",kind:"rocky",mass:89319e18,radius:1821600,parent:"Jupiter",orbitRadius:4217e5,orbitPeriod:1.769138*En,orbitPhase:.3,rotationPeriod:1.769138*En,albedo:.63,style:"io"},{name:"Europa",kind:"rocky",mass:47998e18,radius:1560800,parent:"Jupiter",orbitRadius:671034e3,orbitPeriod:3.551181*En,orbitPhase:2.1,rotationPeriod:3.551181*En,albedo:.67,style:"europa"},{name:"Ganymede",kind:"rocky",mass:14819e19,radius:2634100,parent:"Jupiter",orbitRadius:1070412e3,orbitPeriod:7.154553*En,orbitPhase:4,rotationPeriod:7.154553*En,albedo:.43,style:"ganymede"},{name:"Callisto",kind:"rocky",mass:10759e19,radius:2410300,parent:"Jupiter",orbitRadius:1882709e3,orbitPeriod:16.689018*En,orbitPhase:5.3,rotationPeriod:16.689018*En,albedo:.22,style:"callisto"}],start:{near:s,distance:e,direction:t,velocityMatch:s},skyFrame:"ecliptic",notes:["Positions use circular orbits with real radii/periods (phases illustrative).","Cloud bands, Great Red Spot and moon surfaces are procedural, not mapped imagery."]}),MM=[ju("Jupiter",32e8,[-.6,-.78,.14]),ju("Sun",Al+.1*Rl,[-.3,.95,.05]),{kind:"newtonian",id:"betelgeuse",name:"Betelgeuse (red supergiant)",blurb:"About 760 solar radii — if it replaced the Sun its surface would lie beyond the asteroid belt. Start 14 AU out.",bodies:[{name:"Betelgeuse",kind:"star",mass:18*rc,radius:764*Al,rotationPeriod:36*af,Teff:3600,style:"supergiant"}],start:{near:"Betelgeuse",distance:14*Rl,direction:[.2,-.95,.25],velocityMatch:"Betelgeuse"},skyFrame:"random",notes:["Radius ≈ 764 R☉, Teff ≈ 3600 K, M ≈ 18 M☉ (literature values carry large uncertainties).","Giant convection cells are procedural; real Betelgeuse also has an extended dusty envelope not modelled here."]},{kind:"kerr",id:"stellar",name:"Stellar-mass black hole (10 M☉)",blurb:"Horizon radius ≈ 26 km. You start 22,000 km out; tides kill the pilot near 1,500 km and break the ship near 850 km.",massSolar:10,spin:.7,disk:!0,eddington:1e-13,diskOuter:40,orientation:[.3,1.1,.4],startR:1500,startTheta:1.35,observerR:2e3,notes:["Quiescent: accretion 10⁻¹³ Eddington so the disk (~10⁴ K) does not vaporise you. An actively accreting stellar hole (~10⁷ K, X-rays) would."]},{kind:"kerr",id:"sgra",name:"Sagittarius A* (4.3 million M☉)",blurb:"Horizon ≈ 0.08 AU across. You can cross it intact; the tides only kill you ~30 s of proper time later.",massSolar:43e5,spin:.9,disk:!0,eddington:3e-9,diskOuter:30,orientation:[.1,.5,-.3],startR:30,startTheta:1.05,observerR:140,notes:["Sgr A* really has a faint, hot, radiatively inefficient flow, not a thin disk. The thin disk (3×10⁻⁹ Eddington, ~3,500 K peak) is illustrative — toggle it off for realism.","Spin of Sgr A* is not well measured; a = 0.9 is a choice."]},{kind:"kerr",id:"m87",name:"M87* (6.5 billion M☉)",blurb:"Horizon ≈ 250 AU across — larger than the orbit of Pluto. One orbit at the ISCO takes days.",massSolar:65e8,spin:.94,disk:!0,eddington:1e-5,diskOuter:45,orientation:[.6,-.4,.2],startR:35,startTheta:1.1,observerR:180,notes:["Mass from the Event Horizon Telescope (2019). Spin and disk are illustrative."]},{kind:"kerr",id:"ton618",name:"TON 618-class ultramassive hole (6.6×10¹⁰ M☉)",blurb:"Horizon ≈ 2,600 AU across. Tidal forces at the horizon are gentler than standing on Earth.",massSolar:66e9,spin:.6,disk:!0,eddington:3e-4,diskOuter:60,orientation:[-.3,.9,.7],startR:40,startTheta:1.15,observerR:220,notes:["Mass estimate for TON 618 is uncertain (≈4–7×10¹⁰ M☉). The real object is a quasar near the Eddington limit whose light would vaporise a ship at these distances; accretion here is 3×10⁻⁴ Eddington."]}];class Vs{constructor(e,t,n){this.w=e,this.h=t,this.canvas=document.createElement("canvas"),this.canvas.width=e,this.canvas.height=t,this.ctx=this.canvas.getContext("2d"),this.texture=new Gl(this.canvas),this.texture.colorSpace=St,this.texture.anisotropy=4;const i=new Kt({map:this.texture,transparent:!0,toneMapped:!1,depthWrite:!1});this.mesh=new Ye(new Zn(n,n*t/e),i),this.mesh.renderOrder=10}canvas;ctx;texture;mesh;failed=!1;flicker=0;begin(e,t="#5fd7ff"){const{ctx:n,w:i,h:r}=this;return n.clearRect(0,0,i,r),n.fillStyle="rgba(6, 12, 18, 0.82)",SM(n,4,4,i-8,r-8,18),n.fill(),n.strokeStyle=t,n.globalAlpha=.6,n.lineWidth=3,n.stroke(),n.globalAlpha=1,n.fillStyle=t,n.font="bold 30px ui-monospace, Menlo, Consolas, monospace",n.fillText(e,24,46),n.fillRect(24,58,i-48,2),98}line(e,t,n,i="#e8f4ff",r=26){const{ctx:o,w:a}=this;o.font=`${r}px ui-monospace, Menlo, Consolas, monospace`,o.fillStyle="#8fa9bf",o.fillText(t,24,e),o.fillStyle=i;const l=o.measureText(n).width;return o.fillText(n,a-24-l,e),e+r+10}text(e,t,n="#e8f4ff",i=24){const{ctx:r,w:o}=this;r.font=`${i}px ui-monospace, Menlo, Consolas, monospace`,r.fillStyle=n;const a=t.split(" ");let l="";for(const c of a){const u=l?l+" "+c:c;r.measureText(u).width>o-48?(r.fillText(l,24,e),e+=i+6,l=c):l=u}return l&&(r.fillText(l,24,e),e+=i+6),e}bar(e,t,n,i){const{ctx:r,w:o}=this;r.font="22px ui-monospace, Menlo, Consolas, monospace",r.fillStyle="#8fa9bf",r.fillText(t,24,e);const a=250,l=o-24;return r.fillStyle="rgba(255,255,255,0.08)",r.fillRect(a,e-18,l-a,20),r.fillStyle=i,r.fillRect(a,e-18,(l-a)*Math.max(0,Math.min(1,n)),20),e+34}end(){if(this.failed){const{ctx:e,w:t,h:n}=this;e.fillStyle="rgba(0,0,0,0.85)",e.fillRect(0,0,t,n),e.fillStyle="#ff5050",e.font="bold 36px ui-monospace, monospace",e.fillText("INSTRUMENT FAILURE",40,n/2);for(let i=0;i<40;i++)e.fillStyle=`rgba(255,255,255,${Math.random()*.15})`,e.fillRect(0,Math.random()*n,t,2)}this.texture.needsUpdate=!0}}function SM(s,e,t,n,i,r){s.beginPath(),s.moveTo(e+r,t),s.arcTo(e+n,t,e+n,t+i,r),s.arcTo(e+n,t+i,e,t+i,r),s.arcTo(e,t+i,e,t,r),s.arcTo(e,t,e+n,t,r),s.closePath()}const ys=s=>{const e=Math.abs(s);return e<1e3?`${s.toFixed(0)} m`:e<1e6?`${(s/1e3).toFixed(e<1e4?2:1)} km`:e<1e9?`${(s/1e3).toFixed(0).replace(/\B(?=(\d{3})+(?!\d))/g,",")} km`:e<1496e10?`${(s/1e9).toFixed(2)} million km`:`${(s/1496e8).toFixed(1)} AU`},Rn=s=>{const e=Math.abs(s);return isFinite(s)?e<.001?`${(s*1e6).toFixed(1)} µs`:e<1?`${(s*1e3).toFixed(1)} ms`:e<120?`${s.toFixed(2)} s`:e<7200?`${(s/60).toFixed(1)} min`:e<172800?`${(s/3600).toFixed(2)} h`:e<3156e4*2?`${(s/86400).toFixed(1)} d`:`${(s/3156e4).toFixed(2)} yr`:"∞"},Cl=s=>s>.01*299792458?`${(s/299792458).toFixed(4)} c`:s>1e4?`${(s/1e3).toFixed(1)} km/s`:`${s.toFixed(1)} m/s`,It=(s,e=2)=>{if(!isFinite(s))return"∞";if(s===0)return"0";const t=Math.floor(Math.log10(Math.abs(s)));return t>=-2&&t<4?s.toFixed(Math.max(0,e-Math.max(t,0))):`${(s/10**t).toFixed(e)}e${t}`},Gs="#7dffb0",ai="#ffcf5f",bn="#ff6b6b",no="#5fd7ff",io="#ff8cf0";class bM{nav=new Vs(768,512,.42);rel=new Vs(768,512,.42);str=new Vs(768,512,.42);status=new Vs(1280,160,.78);legend=new Vs(768,900,.36);timer=0;next=0;attach(e){e.left.add(this.nav.mesh),e.center.add(this.rel.mesh),e.right.add(this.str.mesh),e.status.add(this.status.mesh),e.legend.add(this.legend.mesh)}update(e,t,n,i){if(this.timer-=e,this.timer>0)return;this.timer=.04;const r=new Set(t.structure.instrumentsDown);this.nav.failed=r.has("navigation"),this.rel.failed=r.has("relativity"),this.str.failed=r.has("structure"),this.status.failed=r.has("status"),this.legend.failed=r.has("legend");const o=[()=>this.drawNav(t),()=>this.drawRel(t),()=>this.drawStr(t),()=>this.drawStatus(t),()=>this.drawStatus(t),()=>this.drawLegend(t)];o[this.next%o.length](),this.next++}drawNav(e){const t=this.nav;let n=t.begin("NAVIGATION");e.target&&(n=t.line(n,"Target",e.target.name,no),n=t.line(n,"Distance (centre)",ys(e.target.distance)),n=t.line(n,e.mode==="kerr"?"Above horizon":"Altitude",ys(e.target.altitude),e.target.altitude<0?bn:"#e8f4ff"),n=t.line(n,e.mode==="kerr"?"Shadow size (approx.)":"Angular diameter",`${e.target.angularDiameterDeg.toFixed(e.target.angularDiameterDeg<1?4:1)}°`,ai,34),n=t.line(n,"Closing speed",Cl(e.target.closingSpeed))),n=t.line(n,`Speed (${e.speedFrame})`,Cl(e.speed)),n=t.line(n,"Engine / assist",`${e.thrustG} g / ${e.assist}`),t.line(n,"Time warp",`×${It(e.warp,0)}${e.warpLimited?" (limited)":""}`,e.warpLimited?ai:"#e8f4ff"),t.end()}drawRel(e){const t=this.rel;let n=t.begin("RELATIVITY",io);if(n=t.line(n,"Proper time τ (you)",Rn(e.properTime),no),n=t.line(n,"Coordinate time t",Rn(e.coordTime)),n=t.line(n,"dτ/dt",e.dTauDt>.999999?e.dTauDt.toFixed(9):It(e.dTauDt,4)),n=t.line(n,"Lorentz γ (local)",e.gamma<1.0001?e.gamma.toFixed(7):e.gamma.toFixed(3)),e.bh){const i=e.bh;n=t.line(n,"r / M",i.rOverM.toFixed(i.rOverM<10?4:1),i.inside?bn:"#e8f4ff"),n=t.line(n,"Hover needs",isFinite(i.hoverAccelG??1/0)?`${It(i.hoverAccelG,2)} g`:"impossible",isFinite(i.hoverAccelG??1/0)?"#e8f4ff":bn),n=t.line(n,"Starlight ahead/behind",`×${It(i.gravRedshiftAhead,3)} / ×${It(i.gravRedshiftBehind,3)}`),i.horizonCrossTau!==void 0&&(n=t.line(n,"Crossed horizon at τ",Rn(i.horizonCrossTau),io)),i.inside&&t.text(n+4,"INSIDE EVENT HORIZON",bn,30)}else t.text(n+4,`1 s of your time = ${(1/e.dTauDt).toFixed(12)} s far away`,"#8fa9bf",22);t.end()}drawStr(e){const t=this.str,n=e.structure;let i=t.begin("STRUCTURE & TIDES",n.failed?bn:Gs);const r=e.tidal.eig;i=t.line(i,"Tidal eigenvalues s⁻²",`${It(r[0],1)} ${It(r[1],1)} ${It(r[2],1)}`,"#e8f4ff",22),i=t.line(i,"Δa across ship",`${It(e.tidal.shipDiffAccel/An,2)} g`),i=t.line(i,"Δa head–seat (pilot)",`${It(e.tidal.crewDiffAccel/An,2)} g`);const o=n.stress<.5?Gs:n.stress<1?ai:bn;i=t.bar(i+6,`Stress ${(n.stress*100).toFixed(n.stress<.01?4:0)}%`,Math.min(n.stress,1.5)/1.5,o),i=t.bar(i,`Integrity ${(n.integrity*100).toFixed(0)}%`,n.integrity,n.integrity>.6?Gs:n.integrity>.25?ai:bn),i=t.line(i,"Plastic strain",`${(n.plasticStrain*100).toFixed(2)}%`),i=t.line(i,"Hull temperature",`${n.hullTemp.toFixed(0)} K`,n.hullTemp>2e3?bn:n.hullTemp>900?ai:"#e8f4ff"),n.pressure>0&&(i=t.line(i,"Pressure",`${(n.pressure/1e5).toFixed(2)} bar`));const a=["nominal","aware"].includes(n.crew)?Gs:n.crew==="strained"?ai:bn;t.line(i,"Pilot",n.crew.toUpperCase(),a),t.end()}drawStatus(e){const t=this.status,{ctx:n,w:i}=t;if(n.clearRect(0,0,i,t.h),n.fillStyle="rgba(6,12,18,0.78)",n.fillRect(0,0,i,t.h),n.font="bold 30px ui-monospace, monospace",n.fillStyle=e.view==="external"?io:no,n.fillText(`${e.system}  ·  ${e.view==="external"?"EXTERNAL OBSERVER VIEW":"PILOT VIEW"}`,20,40),n.font="24px ui-monospace, monospace",(e.structure.failed?["SHIP DESTROYED — press Backspace / reset, or P for unmanned probe"]:e.notices).slice(0,3).forEach((o,a)=>{n.fillStyle=a===0&&(e.structure.failed||o.startsWith("INSIDE"))?bn:ai,n.fillText(o,20,80+a*30)}),e.bh?.observer){const o=e.bh.observer;n.fillStyle="#e8f4ff";const a=o.seen?`Light now arriving left the ship at τ = ${Rn(o.tauEmit)}  ·  delay ${Rn(o.delay)}  ·  g = ${It(o.g,3)}  ·  telescope ×${It(o.telescopeZoom,0)}`:"No light from the ship has reached the observer yet";n.fillText(a,20,150)}t.end()}drawLegend(e){const t=this.legend;let n=t.begin("WHAT YOU ARE SEEING",no);n=t.text(n,"■ Established physics",Gs,24);for(const i of e.physics.established)n=t.text(n,"· "+i,"#cfe9d8",19);n=t.text(n+8,"■ Real-time approximations",ai,24);for(const i of e.physics.approximated)n=t.text(n,"· "+i,"#efe1bd",19);n=t.text(n+8,"■ Speculative / unknown",io,24),e.physics.speculative.length===0&&(n=t.text(n,"· nothing speculative on screen","#c9a9c4",19));for(const i of e.physics.speculative)n=t.text(n,"· "+i,"#f3c9ec",19);t.end()}}function TM(s){const e=[];e.push(`<b>${s.system}</b> — ${s.view==="external"?'<span class="mag">EXTERNAL OBSERVER VIEW</span>':"PILOT VIEW"}`),s.target&&e.push(`${s.target.name}: ${ys(s.target.distance)} · ${s.mode==="kerr"?"above horizon":"alt"} ${ys(s.target.altitude)} · <b>${s.target.angularDiameterDeg.toFixed(2)}°</b> across`),e.push(`speed ${Cl(s.speed)} (${s.speedFrame}) · γ ${s.gamma.toFixed(s.gamma<1.001?7:3)} · engine ${s.thrustG} g · assist ${s.assist} · warp ×${It(s.warp,0)}${s.warpLimited?" (limited)":""}`),e.push(`τ ${Rn(s.properTime)} · t ${Rn(s.coordTime)} · dτ/dt ${s.dTauDt.toPrecision(8)}`),s.bh&&e.push(`r = ${s.bh.rOverM.toFixed(4)} M (r₊ = ${s.bh.rPlusOverM.toFixed(3)} M) · hover needs ${isFinite(s.bh.hoverAccelG??1/0)?It(s.bh.hoverAccelG,2)+" g":"∞"} ${s.bh.inside?' · <span class="bad">INSIDE HORIZON</span>':""}`),e.push(`tides Δa ship ${It(s.tidal.shipDiffAccel/9.81,2)} g · pilot ${It(s.tidal.crewDiffAccel/9.81,2)} g · stress ${(s.structure.stress*100).toFixed(2)}% · integrity ${(s.structure.integrity*100).toFixed(0)}% · hull ${s.structure.hullTemp.toFixed(0)} K · pilot ${s.structure.crew}`);for(const t of s.notices.slice(0,3))e.push(`<span class="warn">${t}</span>`);if(s.structure.failed&&e.push('<span class="bad">SHIP DESTROYED. Backspace = reset, P = continue as unmanned probe</span>'),s.bh?.observer){const t=s.bh.observer;e.push(t.seen?`observer receives light emitted at τ = ${Rn(t.tauEmit)} · delay ${Rn(t.delay)} · g = ${It(t.g,3)}`:"observer: no light from ship yet")}return e.join("<br>")}class EM{thrust=[0,0,0];rot=[0,0,0];actions=new Set;look={yaw:0,pitch:0};keys=new Set;prevButtons=new Map;dragging=!1;constructor(e){window.addEventListener("keydown",t=>{t.target?.tagName!=="INPUT"&&(this.keys.has(t.code)||this.onKey(t.code),this.keys.add(t.code),["Space","ArrowUp","ArrowDown","ArrowLeft","ArrowRight"].includes(t.code)&&t.preventDefault())}),window.addEventListener("keyup",t=>this.keys.delete(t.code)),window.addEventListener("blur",()=>this.keys.clear()),e.addEventListener("pointerdown",t=>{this.dragging=!0,e.setPointerCapture(t.pointerId)}),e.addEventListener("pointerup",()=>this.dragging=!1),e.addEventListener("pointermove",t=>{this.dragging&&(this.look.yaw-=t.movementX*.003,this.look.pitch=$t.clamp(this.look.pitch-t.movementY*.003,-1.4,1.4))})}onKey(e){const t={KeyV:"toggleView",Period:"warpUp",Comma:"warpDown",KeyH:"toggleAssist",KeyM:"menu",BracketRight:"thrustUp",BracketLeft:"thrustDown",KeyG:"pointTarget",KeyT:"nextTarget",Backspace:"reset",KeyP:"probe",KeyB:"dual",KeyK:"disk",F1:"help",Slash:"help"};t[e]&&this.actions.add(t[e]);const n=e.match(/^Digit([1-9])$/);n&&this.actions.add(`dest${parseInt(n[1])-1}`)}k(e){return this.keys.has(e)?1:0}poll(e,t=new Set){const n=i=>this.k(i);if(this.thrust=[n("KeyD")-n("KeyA"),n("KeyR")+n("Space")-n("KeyF")-n("ControlLeft"),n("KeyS")-n("KeyW")],this.rot=[n("ArrowUp")-n("ArrowDown"),n("ArrowLeft")-n("ArrowRight"),n("KeyQ")-n("KeyE")],!!e){for(const i of e.inputSources){const r=i.gamepad;if(!r)continue;const o=i.handedness,a=h=>Math.abs(r.axes[h]??0)>.12?r.axes[h]:0,l=h=>!!r.buttons[h]?.pressed,c=h=>r.buttons[h]?.value??0,u=(h,f)=>{const d=`${o}${h}`,p=l(h);p&&!this.prevButtons.get(d)&&this.actions.add(f),this.prevButtons.set(d,p)};o==="left"?(this.thrust[0]+=a(2),this.thrust[2]+=a(3),t.has("left")||(this.thrust[2]+=c(0)),l(1)&&(this.rot[2]+=1),u(3,"toggleAssist"),u(4,"warpDown"),u(5,"menu")):o==="right"&&(this.rot[1]-=a(2),this.rot[0]-=a(3),t.has("right")||(this.thrust[2]-=c(0)),l(1)&&(this.rot[2]-=1),u(3,"pointTarget"),u(4,"toggleView"),u(5,"warpUp"))}this.thrust=this.thrust.map(i=>$t.clamp(i,-1,1)),this.rot=this.rot.map(i=>$t.clamp(i,-1,1))}}take(){const e=this.actions;return this.actions=new Set,e}}const Aa='ui-sans-serif, system-ui, "Segoe UI", Roboto, sans-serif',ot={bg:"rgba(8, 14, 22, 0.94)",card:"rgba(22, 36, 52, 0.95)",cardHover:"rgba(40, 74, 104, 0.98)",cardActive:"rgba(28, 82, 64, 0.98)",line:"#2c5576",text:"#eaf3fb",dim:"#9db4c8",accent:"#6fd6ff",warm:"#ffc66b",good:"#7dffb0"};class ac{constructor(e,t,n,i){this.w=e,this.h=t,this.paint=i,this.canvas.width=e,this.canvas.height=t,this.ctx=this.canvas.getContext("2d"),this.texture=new Gl(this.canvas),this.texture.colorSpace=St,this.texture.anisotropy=8;const r=new Kt({map:this.texture,transparent:!0,toneMapped:!1,depthWrite:!1,depthTest:!1});this.mesh=new Ye(new Zn(n,n*t/e),r),this.mesh.renderOrder=50,this.mesh.userData.panel=this}canvas=document.createElement("canvas");ctx;texture;mesh;buttons=[];hover=null;lastHover=null;dirty=!0;refresh(e=!1){!e&&!this.dirty&&this.hover===this.lastHover||(this.lastHover=this.hover,this.dirty=!1,this.buttons=[],this.paint(this),this.texture.needsUpdate=!0)}hit(e){const t=e.x*this.w,n=(1-e.y)*this.h;return this.buttons.find(i=>t>=i.x&&t<=i.x+i.w&&n>=i.y&&n<=i.y+i.h)??null}background(e){const{ctx:t,w:n,h:i}=this;t.clearRect(0,0,n,i),t.fillStyle=ot.bg,Zu(t,6,6,n-12,i-12,28),t.fill(),t.strokeStyle=ot.line,t.lineWidth=4,t.stroke(),e&&(t.fillStyle=ot.accent,t.font=`700 52px ${Aa}`,t.fillText(e,48,86))}text(e,t,n,i,r=ot.text,o=400,a){const{ctx:l}=this;if(l.font=`${o} ${i}px ${Aa}`,l.fillStyle=r,!a)return l.fillText(e,t,n),n+i*1.25;const c=e.split(" ");let u="";for(const h of c){const f=u?`${u} ${h}`:h;l.measureText(f).width>a&&u?(l.fillText(u,t,n),n+=i*1.25,u=h):u=f}return u&&l.fillText(u,t,n),n+i*1.25}button(e,t,n,i,r,o,a={}){const{ctx:l}=this,c=this.hover===e;l.fillStyle=c?ot.cardHover:a.active?ot.cardActive:ot.card,Zu(l,t,n,i,r,18),l.fill(),l.lineWidth=c?5:2,l.strokeStyle=c?ot.accent:a.active?ot.good:ot.line,l.stroke();const u=a.size??34;if(a.sub)this.text(o,t+24,n+22+u,u,a.color??ot.text,700,i-48),this.text(a.sub,t+24,n+30+u*2.2,Math.round(u*.68),ot.dim,400,i-48);else{l.font=`700 ${u}px ${Aa}`,l.fillStyle=a.color??ot.text;const h=l.measureText(o).width;l.fillText(o,t+(i-h)/2,n+r/2+u*.36)}this.buttons.push({id:e,x:t,y:n,w:i,h:r})}}function Zu(s,e,t,n,i,r){s.beginPath(),s.moveTo(e+r,t),s.arcTo(e+n,t,e+n,t+i,r),s.arcTo(e+n,t+i,e,t+i,r),s.arcTo(e,t+i,e,t,r),s.arcTo(e,t,e+n,t,r),s.closePath()}class wM{constructor(e,t,n,i){this.renderer=e,this.camera=n;for(let o=0;o<2;o++){const a=e.xr.getController(o),l=new Et().setFromPoints([new w(0,0,0),new w(0,0,-1)]),c=new wo(l,new Vl({color:7329535,transparent:!0,opacity:.85,toneMapped:!1,depthTest:!1}));c.renderOrder=60,c.scale.z=.6;const u=new Ye(new di(.006,12,8),new Kt({color:16777215,toneMapped:!1,depthTest:!1}));u.renderOrder=61,u.visible=!1,a.add(c),t.add(a),t.add(u);const h={ray:c,dot:u,target:a,hand:"none",hovering:null};a.addEventListener("connected",f=>{h.hand=f.data.handedness??"none"}),a.addEventListener("disconnected",()=>h.hand="none"),a.addEventListener("selectstart",()=>this.click(h)),this.pointers.push(h)}let r=null;i.addEventListener("pointerdown",o=>r={x:o.clientX,y:o.clientY}),i.addEventListener("pointerup",o=>{if(!r||Math.hypot(o.clientX-r.x,o.clientY-r.y)>6)return;const a=i.getBoundingClientRect(),l=new ne((o.clientX-a.left)/a.width*2-1,-((o.clientY-a.top)/a.height)*2+1);this.raycaster.setFromCamera(l,this.camera);const c=this.cast();if(c){const u=c.panel.hit(c.uv);u&&this.onClick(c.panel,u.id)}}),i.addEventListener("pointermove",o=>{if(this.renderer.xr.isPresenting)return;const a=i.getBoundingClientRect(),l=new ne((o.clientX-a.left)/a.width*2-1,-((o.clientY-a.top)/a.height)*2+1);this.raycaster.setFromCamera(l,this.camera);const c=this.cast();for(const u of this.panels)u.hover=c&&c.panel===u?c.panel.hit(c.uv)?.id??null:null;i.style.cursor=c&&c.panel.hit(c.uv)?"pointer":""})}panels=[];pointers=[];raycaster=new Mm;onClick=()=>{};busyHands=new Set;cast(){const e=this.panels.filter(i=>Ra(i.mesh)).map(i=>i.mesh),n=this.raycaster.intersectObjects(e,!1)[0];return!n||!n.uv?null:{panel:n.object.userData.panel,uv:n.uv,point:n.point,distance:n.distance}}click(e){if(!e.hovering)return;const t=e.hovering.hover;t&&this.onClick(e.hovering,t)}update(){this.busyHands.clear();const e=this.renderer.xr.isPresenting,t=this.panels.some(n=>Ra(n.mesh));if(e)for(const n of this.panels)n.hover=null;for(const n of this.pointers){if(n.ray.visible=e&&n.hand!=="none",n.dot.visible=!1,n.hovering=null,!e||n.hand==="none")continue;const i=n.target.matrixWorld,r=new w().setFromMatrixPosition(i),o=new w(0,0,-1).applyMatrix4(new Le().extractRotation(i)).normalize();this.raycaster.set(r,o);const a=t?this.cast():null;if(a){n.ray.scale.z=a.distance,n.dot.visible=!0,n.dot.position.copy(a.point),n.hovering=a.panel;const l=a.panel.hit(a.uv);l&&(a.panel.hover=l.id),(n.hand==="left"||n.hand==="right")&&this.busyHands.add(n.hand),n.ray.material.opacity=.95}else n.ray.scale.z=.35,n.ray.material.opacity=.35}for(const n of this.panels)Ra(n.mesh)&&n.refresh()}}function Ra(s){let e=s;for(;e;){if(!e.visible)return!1;e=e.parent}return!0}const AM={jupiter:"True-scale gas giant and its four big moons",sun:"Skim the photosphere — watch your hull heat",betelgeuse:"A star wider than the asteroid belt",stellar:"Small hole, brutal tides: spaghettification",sgra:"Our galaxy’s black hole — cross the horizon intact",m87:"A horizon wider than Pluto’s orbit",ton618:"Ultramassive: hovering near it takes ~1 g"},RM=s=>s>=1e3?`×10^${Math.round(Math.log10(s))}`:`×${s}`;function CM(s){return new ac(1600,1240,1.05,e=>{const t=s();e.background("Where to?"),e.text("Pick a destination, or change how you fly. Point and pull the trigger.",48,136,30,ot.dim);const n=740,i=116,r=14,o=48,a=170;t.systems.forEach((f,d)=>{const p=d%2,v=Math.floor(d/2),g=f.id===t.current;e.button(`dest:${d}`,o+p*(n+r+12),a+v*(i+r),n,i,`${d+1}. ${f.name.replace(/ \(.*\)$/,"")}${g?"  ✓ here":""}`,{sub:AM[f.id]??f.blurb,active:g,size:34})});let l=a+4*(i+r)+26;e.text("Flight",48,l+6,30,ot.warm,700),l+=26;const c=360,u=92,h=f=>48+f*(c+20);e.button("view",h(0),l,c,u,t.view==="external"?"External observer":"Pilot view",{active:t.view==="external",size:30}),e.button("assist",h(1),l,c,u,t.assist?"Station-keep: ON":"Station-keep: off",{active:t.assist,size:30}),e.button("point",h(2),l,c,u,"Point at target",{size:30}),e.button("reset",h(3),l,c,u,"Restart here",{size:30}),l+=u+18,e.button("warp-",h(0),l,170,u,"Time −",{size:30}),e.button("warpv",h(0)+190,l,170,u,RM(t.warp),{size:30,color:ot.warm}),e.button("warp+",h(1),l,170,u,"Time +",{size:30}),e.button("thr-",h(1)+190,l,170,u,"Engine −",{size:28}),e.button("thrv",h(2),l,170,u,`${t.thrustG} g`,{size:30,color:ot.warm}),e.button("thr+",h(2)+190,l,170,u,"Engine +",{size:28}),e.button("quality",h(3),l,c,u,`Quality: ${t.quality}`,{size:30}),l+=u+18,t.isBlackHole&&(e.button("disk",h(0),l,c,u,t.diskOn?"Accretion disk: ON":"Accretion disk: off",{active:t.diskOn,size:30}),e.button("probe",h(1),l,c,u,t.probe?"Unmanned probe: ON":"Unmanned probe: off",{active:t.probe,size:30})),e.button("help",h(2),l,c,u,"How to fly",{size:30}),e.button("close",h(3),l,c,u,"Close menu",{size:30,color:ot.accent})})}function PM(){return new ac(1600,1060,1,s=>{s.background(),s.text("LIGHTCONE",56,104,72,ot.accent,800),s.text("You are in a ship that obeys real physics. Planets and stars are true size; black holes bend light and time exactly as general relativity says.",56,168,32,ot.text,400,1490);let e=290;s.text("How to fly",56,e,36,ot.warm,700),e+=54;const t=[["Left stick","slide / move forward-back"],["Left trigger","reverse thrust"],["Left grip","roll left"],["X","slow time down"],["Y","open the menu"],["Stick click","station-keep"]],n=[["Right trigger","main engine"],["Right stick","turn the ship"],["Right grip","roll right"],["B","speed time up"],["A","pilot ⇄ external observer"],["Stick click","point at target"]],i=(r,o)=>{let a=e;for(const[l,c]of r)s.text(l,o,a,30,ot.accent,700),s.text(c,o+250,a,30,ot.text),a+=46};s.text("LEFT CONTROLLER",56,e,24,ot.dim,700),s.text("RIGHT CONTROLLER",820,e,24,ot.dim,700),e+=46,i(t,56),i(n,820),e+=296,s.text("Distances are real, so things take real time: use time warp (B) to cross them. Point at any menu with either controller and pull the trigger.",56,e,28,ot.dim,400,1490),s.button("start",56,900,700,110,"Start flying",{size:40,color:ot.good}),s.button("menu",844,900,700,110,"Choose a destination",{size:40,color:ot.accent})})}function Ju(){return new ac(420,140,.2,s=>{s.ctx.clearRect(0,0,s.w,s.h),s.button("open",6,6,408,128,"☰  MENU",{size:48,color:ot.accent})})}const Qu='ui-sans-serif, system-ui, "Segoe UI", Roboto, sans-serif';class LM{sprite;canvas=document.createElement("canvas");ctx;texture;key="";last=0;constructor(){this.canvas.width=768,this.canvas.height=160,this.ctx=this.canvas.getContext("2d"),this.texture=new Gl(this.canvas),this.texture.colorSpace=St;const e=new Rh({map:this.texture,depthTest:!1,depthWrite:!1,toneMapped:!1,transparent:!0});this.sprite=new Jd(e),this.sprite.renderOrder=40,this.sprite.center.set(0,.5)}set(e,t,n){const i=`${e}|${t}|${n}`;if(i===this.key)return;const r=performance.now();if(this.key&&r-this.last<250&&this.key.startsWith(`${e}|`))return;this.last=r,this.key=i;const{ctx:o,canvas:a}=this;o.clearRect(0,0,a.width,a.height),o.strokeStyle=n,o.lineWidth=6,o.beginPath(),o.moveTo(4,80),o.lineTo(56,80),o.stroke(),o.shadowColor="rgba(0,0,0,0.9)",o.shadowBlur=10,o.font=`700 54px ${Qu}`,o.fillStyle=n,o.fillText(e,70,70),o.font=`400 36px ${Qu}`,o.fillStyle="#d8e6f2",o.fillText(t,70,122),o.shadowBlur=0,this.texture.needsUpdate=!0}}class IM{group=new Ht;labels=new Map;used=new Set;angularSize=.05;enabled=!0;begin(){this.used.clear()}put(e,t,n,i,r="#7fe0ff",o=0){if(!this.enabled)return;let a=this.labels.get(e);a||(a=new LM,this.labels.set(e,a),this.group.add(a.sprite)),this.used.add(e),a.set(n,i,r);const l=40,c=t.clone().normalize();if(o>0){const h=new w().crossVectors(c,new w(0,1,0));h.lengthSq()<1e-6&&h.set(1,0,0),c.addScaledVector(h.normalize(),Math.tan(Math.min(o,.6))).normalize()}a.sprite.position.copy(c).multiplyScalar(l);const u=l*Math.tan(this.angularSize);a.sprite.scale.set(u*4.8,u,1),a.sprite.visible=!0}end(){for(const[e,t]of this.labels)this.used.has(e)||(t.sprite.visible=!1)}}const so=[1,10,100,1e3,1e4,1e5,1e6,1e7,1e8],Ws=[.1,.3,1,3,10,30],ro=3;class DM{constructor(e){this.container=e,this.deck=vy(this.cockpit.shared)}renderer;scene=new Ii;camera=new Dt(75,1,.02,1e5);celestial=new Ht;cockpit=new gy;deck;hud=new bM;input;exposure=new hy;exposureU={value:1};bb;sky;dome;dualScene=new Ii;systems=MM.map(e=>({...e}));current;nWorld=null;nView=null;kWorld=null;kView=null;view="pilot";warpIdx=0;thrustIdx=2;quality="high";dual=!1;last=0;overlayTimer=0;frameAvg=16;slowFrames=0;fastAdapt=0;flash=null;overlay=document.getElementById("overlay");ui;uiRoot=new Ht;menuPanel;welcomePanel;menuButtons=[];labels=new IM;async start(){const e=new s_({antialias:!0,powerPreference:"high-performance"});this.renderer=e,e.setPixelRatio(Math.min(window.devicePixelRatio,2)),e.setSize(window.innerWidth,window.innerHeight),e.toneMapping=oh,e.toneMappingExposure=1,e.outputColorSpace=St,e.xr.enabled=!0,e.xr.setReferenceSpaceType("local"),e.xr.setFoveation(1),this.container.appendChild(e.domElement);const t=new URLSearchParams(location.search),n=t.get("tm");n==="agx"&&(e.toneMapping=rh),n==="aces"&&(e.toneMapping=sh),t.get("quality")&&t.get("quality")in Hs&&(this.quality=t.get("quality"));const i=_s.createButton(e);document.body.appendChild(i),e.xr.addEventListener("sessionstart",()=>{(this.quality==="high"||this.quality==="ultra")&&this.setQuality("medium");const a=e.xr.getSession();a?.updateTargetFrameRate&&a.supportedFrameRates&&Array.from(a.supportedFrameRates).includes(72)&&a.updateTargetFrameRate(72).catch(()=>{}),this.welcomePanel.mesh.visible=!0,this.welcomePanel.dirty=!0}),this.input=new EM(e.domElement);const r=new J_;for(let a=0;a<2;a++){const l=e.xr.getControllerGrip(a);l.add(r.createControllerModel(l)),this.scene.add(l)}window.addEventListener("resize",()=>this.resize()),this.resize(),await new Promise(a=>setTimeout(a,30)),this.bb=sy(),this.sky=ay(e,t.get("sky")?parseInt(t.get("sky")):this.quality==="low"?512:1024),this.dome=new uy(this.sky.texture,this.bb),this.dome.material.uniforms.uExposure=this.exposureU,this.camera.layers.enable(ro),this.scene.add(this.camera),this.scene.add(this.celestial),this.celestial.add(this.dome.mesh),this.scene.add(this.cockpit.group),this.scene.add(this.deck),this.cockpit.body.traverse(a=>{const l=a;l.isMesh&&l.material.uniforms?.uEmissive?.value.lengthSq()===0&&a.layers.enable(ro)}),this.hud.attach(this.cockpit.panelAnchors),this.deck.visible=!1,this.setupUI(),this.buildPanel();let o=this.systems.find(a=>a.id===(t.get("sys")??"sgra"))??this.systems[0];o.kind==="newtonian"&&t.get("dist")&&(o={...o,start:{...o.start,distance:parseFloat(t.get("dist"))}}),o.kind==="kerr"&&t.get("r")&&(o={...o,startR:parseFloat(t.get("r"))}),o.kind==="kerr"&&t.get("th")&&(o={...o,startTheta:parseFloat(t.get("th"))}),o.kind==="kerr"&&t.get("orbit")&&(o={...o,startOrbitFraction:parseFloat(t.get("orbit"))}),o.kind==="kerr"&&t.get("disk")==="0"&&(o={...o,disk:!1}),this.loadSystem(o),t.get("view")==="external"&&this.setView("external"),t.get("meter")==="sync"&&(this.exposure.sync=!0),t.get("probe")==="1"&&((this.kWorld??this.nWorld).probeMode=!0),t.get("warp")&&(this.warpIdx=Math.max(0,so.indexOf(parseFloat(t.get("warp"))))),document.getElementById("loading").remove(),e.setAnimationLoop(a=>this.frame(a))}setupUI(){this.scene.add(this.uiRoot),this.scene.add(this.labels.group),this.menuPanel=CM(()=>{const n=this.kWorld??this.nWorld;return{systems:this.systems,current:this.current?.id??"",view:this.view,isBlackHole:!!this.kWorld,diskOn:this.kWorld?.diskOn??!1,assist:n?.assist??!1,probe:n?.probeMode??!1,warp:so[this.warpIdx],thrustG:Ws[this.thrustIdx],quality:this.quality}}),this.menuPanel.mesh.position.set(0,-.06,-.82),this.menuPanel.mesh.rotation.x=-.12,this.menuPanel.mesh.visible=!1,this.welcomePanel=PM(),this.welcomePanel.mesh.position.set(0,-.02,-.9),this.welcomePanel.mesh.rotation.x=-.06,this.uiRoot.add(this.menuPanel.mesh,this.welcomePanel.mesh);const e=Ju();this.cockpit.panelAnchors.menu.add(e.mesh);const t=Ju();t.mesh.position.set(-.05,-.62,-.92),t.mesh.rotation.x=-.6,this.deck.add(t.mesh),this.menuButtons=[e,t],this.ui=new wM(this.renderer,this.scene,this.camera,this.renderer.domElement),this.ui.panels=[this.welcomePanel,this.menuPanel,e,t],this.ui.onClick=(n,i)=>this.onUIClick(n,i)}get uiOpen(){return this.menuPanel.mesh.visible||this.welcomePanel.mesh.visible}showMenu(e){this.menuPanel.mesh.visible=e,e&&(this.welcomePanel.mesh.visible=!1),this.menuPanel.dirty=!0}onUIClick(e,t){if(e===this.welcomePanel){this.welcomePanel.mesh.visible=!1,t==="menu"&&this.showMenu(!0);return}if(this.menuButtons.includes(e)){this.showMenu(!this.menuPanel.mesh.visible);return}const n={view:"toggleView",assist:"toggleAssist",point:"pointTarget",reset:"reset","warp-":"warpDown","warp+":"warpUp","thr-":"thrustDown","thr+":"thrustUp",disk:"disk",probe:"probe"};if(t.startsWith("dest:")){const i=parseInt(t.slice(5));this.showMenu(!1),this.loadSystem(this.systems[i])}else if(t==="close")this.showMenu(!1);else if(t==="help")this.showMenu(!1),this.welcomePanel.mesh.visible=!0,this.welcomePanel.dirty=!0;else if(t==="quality"){const i=["low","medium","high","ultra"];this.setQuality(i[(i.indexOf(this.quality)+1)%i.length])}else n[t]&&this.handle(new Set([n[t]]));this.menuPanel.dirty=!0}updateLabels(){this.labels.begin();const e=t=>t*180/Math.PI;if(this.nWorld&&this.nView){const t=this.nWorld,n=new Ce().setFromMatrix4(new Le().makeRotationFromQuaternion(t.q)).transpose();t.bodies.forEach((i,r)=>{const o=new w(i.pos[0]-t.pos[0],i.pos[1]-t.pos[1],i.pos[2]-t.pos[2]),a=o.length(),l=Math.asin(Math.min(1,i.def.radius/a)),c=t.altitude(i,t.pos),u=r===t.targetIndex;!u&&e(l)<.05&&i.def.kind!=="star"||this.labels.put(`b${r}`,o.applyMatrix3(n),i.def.name,`${ys(Math.max(c,0))} away · ${e(2*l).toFixed(e(l)<1?2:0)}° wide`,u?"#ffd27a":"#7fe0ff",Math.min(l*1.05,.5)+.01)})}else if(this.kWorld){const t=this.kWorld,n=this.view==="external",i=n?t.observer.tetrad:t.ship.tetrad(),r=n?t.observer.pos:t.ship.pos,o=[0,-r[0],-r[1],-r[2]],a=new w(...[1,2,3].map(h=>jt(i.point,i.e[h],o))),l=this.current.name.replace(/ \(.*\)$/,""),c=t.telemetry(),u=c.bh?.inside?"you are inside its event horizon":`horizon ${ys(c.bh.distToHorizonM)} away`;if(this.labels.put("bh",a,l,n?"seen from the observation deck":u,"#ffd27a",.25),n&&this.kView?.image){const h=this.kView.observerTelemetry();this.labels.put("ship",this.kView.marker.position.clone(),"Your ship",`as it was ${Rn(h.delay)} ago`,"#ff8cf0",.03)}}this.labels.end()}resize(){const e=window.innerWidth,t=window.innerHeight;this.camera.aspect=e/t,this.camera.updateProjectionMatrix(),this.renderer?.setSize(e,t)}loadSystem(e){if(this.nView?.group.removeFromParent(),this.nView?.dispose(),this.kView?.telescopePanel.removeFromParent(),this.kView?.marker.removeFromParent(),this.kView?.dome.mesh.removeFromParent(),this.kView?.dome2.mesh.removeFromParent(),this.kView?.dispose(),this.nWorld=this.nView=this.kWorld=this.kView=null,this.current=e,this.warpIdx=0,e.kind==="kerr"){this.kWorld=new xM(e),this.kView=new iM(this.kWorld,this.bb,this.sky.texture,Hs[this.quality]),this.deck.add(this.kView.telescopePanel),this.celestial.add(this.kView.marker),this.celestial.add(this.kView.dome.mesh),this.dualScene.add(this.kView.dome2.mesh),this.dome.mesh.visible=!1,this.kView.marker.layers.enable(0),this.kWorld.thrustG=Ws[this.thrustIdx];const t=cs(this.kWorld.disk.Tmax*.6).L*(e.disk?Math.min(.3,(e.diskOuter/e.startR)**2):0)+.002;this.exposure.snapTo(t)}else this.dome.mesh.visible=!0,this.nWorld=new uM(e),this.nView=new Ny(this.nWorld,this.bb,this.exposureU),this.celestial.add(this.nView.group),this.nView.setOctaves(Hs[this.quality].octaves),this.nWorld.thrustG=Ws[this.thrustIdx],this.exposure.snapTo(.05),this.setView("pilot");this.fastAdapt=2.5,this.celestial.traverse(t=>t.layers.enable(ro)),this.kView?.marker.layers.disable(ro),this.syncPanel(),this.say(`${e.name}: ${e.blurb}`)}setView(e){e==="external"&&!this.kWorld&&(this.say("The EXTERNAL OBSERVER view is available at black holes."),e="pilot"),this.view=e;const t=e==="external";if(this.cockpit.group.visible=!t,this.deck.visible=t,this.kView&&(this.kView.marker.visible=t),t)this.deck.add(this.hud.status.mesh),this.hud.status.mesh.position.set(.05,-.62,-1),this.hud.status.mesh.rotation.set(-.6,0,0),this.deck.add(this.hud.legend.mesh),this.hud.legend.mesh.position.set(.68,-.38,-.8),this.hud.legend.mesh.rotation.set(-.3,-.5,0);else{this.cockpit.panelAnchors.status.add(this.hud.status.mesh),this.cockpit.panelAnchors.legend.add(this.hud.legend.mesh);for(const n of[this.hud.status.mesh,this.hud.legend.mesh])n.position.set(0,0,0),n.rotation.set(0,0,0)}}setQuality(e){this.quality=e,this.kView?.setQuality(Hs[e]),this.nView?.setOctaves(Hs[e].octaves),document.getElementById("quality").value=e}say(e,t=6){this.flash={text:e,until:performance.now()+t*1e3}}handle(e){const t=this.nWorld??this.kWorld;if(t)for(const n of e)switch(n){case"toggleView":this.setView(this.view==="pilot"?"external":"pilot");break;case"warpUp":this.warpIdx=Math.min(so.length-1,this.warpIdx+1);break;case"warpDown":this.warpIdx=Math.max(0,this.warpIdx-1);break;case"thrustUp":case"thrustDown":this.thrustIdx=$t.clamp(this.thrustIdx+(n==="thrustUp"?1:-1),0,Ws.length-1),t.thrustG=Ws[this.thrustIdx];break;case"toggleAssist":t.assist=!t.assist;break;case"pointTarget":this.pointAtTarget();break;case"nextTarget":this.nWorld&&(this.nWorld.targetIndex=(this.nWorld.targetIndex+1)%this.nWorld.bodies.length);break;case"reset":this.loadSystem(this.current);break;case"probe":t.probeMode=!t.probeMode,t.probeMode&&(t.structure.failed=!1,t.structure.integrity=Math.max(t.structure.integrity,.01),this.say("UNMANNED PROBE MODE: structural limits ignored so you can keep watching. Not a survivable trajectory."));break;case"dual":this.dual=!this.dual&&!!this.kWorld;break;case"disk":this.kWorld&&this.kView&&(this.kWorld.diskOn=!this.kWorld.diskOn,this.kView.setDisk(this.kWorld.diskOn));break;case"menu":this.showMenu(!this.menuPanel.mesh.visible);break;case"help":document.getElementById("panel").classList.toggle("hidden");break;default:if(n.startsWith("dest")){const i=parseInt(n.slice(4));this.systems[i]&&this.loadSystem(this.systems[i])}}}pointAtTarget(){if(this.nWorld){const e=this.nWorld,t=e.bodies[e.targetIndex],n=new w(t.pos[0]-e.pos[0],t.pos[1]-e.pos[1],t.pos[2]-e.pos[2]).normalize();e.q.setFromRotationMatrix(new Le().lookAt(new w,n,new w(0,0,1)))}else if(this.kWorld){const e=this.kWorld.ship.pos;this.kWorld.ship.q=gf([-e[0],-e[1],-e[2]],[0,0,1])}}frame(e){const t=$t.clamp((e-this.last)/1e3,0,.1);this.last=e;const n=this.renderer,i=n.xr.getSession();this.ui.update(),this.input.poll(i,this.ui.busyHands);const r=this.input.take();this.uiOpen&&(this.input.thrust=[0,0,0],this.input.rot=[0,0,0]),this.handle(r);const o=so[this.warpIdx],a={thrust:this.input.thrust,rot:this.input.rot};this.kWorld?this.kWorld.update(t,o,a,this.view==="external"):this.nWorld.update(t,o,a),this.autoWarp();const l=n.xr.isPresenting;l||this.camera.quaternion.setFromEuler(new Xt(this.input.look.pitch,this.input.look.yaw,0,"YXZ"));const c=l?n.xr.getCamera().quaternion:this.camera.quaternion,u=l?.0011:$t.degToRad(this.camera.fov)/(window.innerHeight*n.getPixelRatio()),h=this.exposure.exposure;this.exposureU.value=h;const f=this.cockpit.shared;if(f.uExposure.value=h,this.kWorld&&this.kView){const g=this.view==="external";this.kView.renderSky(n,g,h),f.uEnv.value=this.kView.probe.target.texture,f.uEnvMode.value=1,f.uEnvMip.value=4,f.uKeyE.value.set(0,0,0),f.uFillE.value.set(0,0,0),g&&this.kView.updateExternal(n,h)}else if(this.nWorld&&this.nView){const g=this.nView.update(u);this.dome.useStatic(this.nView.skyRotBodyToGal,this.nView.betaBody,h),this.dome.material.uniforms.uExposure=this.exposureU,f.uEnvMode.value=0,f.uKeyDir.value.copy(g.keyDir),f.uKeyE.value.copy(g.keyE),f.uFillDir.value.copy(g.fillDir),f.uFillE.value.copy(g.fillE)}const p=(this.kWorld??this.nWorld).structure.deformationMatrix();this.cockpit.setDeformation(new Le().set(p[0][0],p[0][1],p[0][2],0,p[1][0],p[1][1],p[1][2],0,p[2][0],p[2][1],p[2][2],0,0,0,0,1)),this.exposure.meter(n,this.scene,c),this.fastAdapt>0||this.exposure.sync?(this.fastAdapt-=t,this.exposure.update(this.exposure.sync?1:t*6)):this.exposure.update(t),this.updateLabels();const v=this.telemetry(o);if(this.hud.update(t,v,this.systems,this.current.id),this.overlayTimer-=t,this.overlayTimer<=0&&!l){this.overlayTimer=.15;let g=TM(v);this.flash&&performance.now()<this.flash.until&&(g=`<div class="warn">${this.flash.text}</div>`+g),this.overlay.innerHTML=g}n.render(this.scene,this.camera),this.dual&&!l&&this.kView&&this.renderDual(h),this.adaptQuality(t,l)}renderDual(e){const t=this.renderer;this.kView.renderOther(t,this.view==="external",e);const n=window.innerWidth,i=window.innerHeight,r=Math.round(n*.32),o=Math.round(i*.32);t.setScissorTest(!0),t.setScissor(n-r-10,10,r,o),t.setViewport(n-r-10,10,r,o);const a=this.camera.clone();a.aspect=r/o,a.updateProjectionMatrix();const l=t.autoClear;t.autoClear=!0,t.render(this.dualScene,a),t.autoClear=l,t.setScissorTest(!1),t.setViewport(0,0,n,i)}adaptQuality(e,t){this.frameAvg=this.frameAvg*.95+e*1e3*.05;const n=t?1e3/72:1e3/45;if(this.frameAvg>n*1.25){if(++this.slowFrames>90){const i=["ultra","high","medium","low"],r=i.indexOf(this.quality);r<i.length-1&&(this.setQuality(i[r+1]),this.say(`Quality reduced to ${i[r+1]} to hold frame rate`,3)),this.slowFrames=0}}else this.slowFrames=0}autoWarp(){const e=this.kWorld??this.nWorld,t=e.structure;this.kWorld?(this.kWorld.events.includes("horizon")&&(this.warpIdx=0,this.say("You crossed the event horizon. Locally, nothing marked the moment — but no signal from here can ever get out.",9)),this.kWorld.events=[],this.kWorld.ship.terminated&&(this.warpIdx=0)):this.nWorld&&(this.nWorld.env.rho>1e-6||this.nWorld.env.hullTemp>1500)&&(this.warpIdx=Math.min(this.warpIdx,1)),(t.stress>.3||t.failed)&&this.warpIdx>0&&!e.probeMode&&(this.warpIdx=0)}telemetry(e){const t=this.kWorld??this.nWorld,n=t.telemetry();return n.system=this.current.name,n.view=this.view,n.warp=e,n.warpLimited=t.warpLimited,t.probeMode&&n.notices.unshift("UNMANNED PROBE MODE (structural limits ignored)"),this.kView&&n.bh&&this.view==="external"&&(n.bh.observer=this.kView.observerTelemetry()),this.kWorld&&this.view==="pilot"&&n.notices.push("V / A-button: switch to EXTERNAL OBSERVER view"),n}buildPanel(){const e=document.getElementById("dests");this.systems.forEach((c,u)=>{const h=document.createElement("button");h.textContent=`${u+1}. ${c.name}`,h.title=c.blurb,h.dataset.id=c.id,h.onclick=()=>this.loadSystem(this.systems[u]),e.appendChild(h)});const t=document.getElementById("spin"),n=document.getElementById("mass"),i=document.getElementById("disk"),r=document.getElementById("acc"),o=document.getElementById("tilt"),a=()=>{document.getElementById("tiltv").textContent=`${(parseFloat(o.value)*180/Math.PI).toFixed(0)}°`,document.getElementById("spinv").textContent=parseFloat(t.value).toFixed(3),document.getElementById("massv").textContent=(10**parseFloat(n.value)).toExponential(2),document.getElementById("accv").textContent=(10**parseFloat(r.value)).toExponential(0)};t.oninput=n.oninput=r.oninput=o.oninput=a,document.getElementById("applyBh").onclick=()=>{if(this.current.kind!=="kerr")return;const c=this.systems.indexOf(this.current),u=document.getElementById("acc"),h=document.getElementById("tilt"),f=this.current.orientation,d={...this.current,spin:parseFloat(t.value),massSolar:10**parseFloat(n.value),disk:i.checked,eddington:10**parseFloat(u.value),orientation:[parseFloat(h.value),f[1],f[2]]};this.systems[c]=d,this.loadSystem(d)};const l=document.getElementById("quality");l.value=this.quality,l.onchange=()=>this.setQuality(l.value)}syncPanel(){document.querySelectorAll("#dests button").forEach(t=>t.classList.toggle("cur",t.dataset.id===this.current.id));const e=document.getElementById("bh");e.style.display=this.current.kind==="kerr"?"block":"none",this.current.kind==="kerr"&&(document.getElementById("spin").value=String(this.current.spin),document.getElementById("mass").value=String(Math.log10(this.current.massSolar)),document.getElementById("disk").checked=this.current.disk,document.getElementById("acc").value=String(Math.log10(this.current.eddington)),document.getElementById("tilt").value=String(this.current.orientation[0]),document.getElementById("spin").dispatchEvent(new Event("input")))}}const vf=new DM(document.getElementById("app"));vf.start().catch(s=>{console.error(s);const e=document.getElementById("loading");e&&(e.textContent=`Failed to start: ${s?.message??s}`)});window.lightcone=vf;
//# sourceMappingURL=index-Cgw9bG4f.js.map
