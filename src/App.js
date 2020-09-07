import './App.css';
import './index.css';
import React, { memo, useState } from 'react'
import { useSpring, a, animated } from 'react-spring'
import { useMeasure, usePrevious } from './helpers'
import { Global, Frame, Title, Content, toggle } from './styles'
import * as Icons from './icons'


const Tree = memo(({ children, name, style, defaultOpen = false }) => {
  const [isOpen, setOpen] = useState(defaultOpen);
  const previous = usePrevious(isOpen);
  const [bind, { height: viewHeight }] = useMeasure();
  const { height, opacity, transform } = useSpring({
    from: { height: 0, opacity: 0, transform: 'translate3d(20px,0,0)' },
    to: { height: isOpen ? viewHeight : 0, opacity: isOpen ? 1 : 0, transform: `translate3d(${isOpen ? 0 : 20}px,0,0)` }
  })
  const Icon = Icons[`${children ? (isOpen ? 'Minus' : 'Plus') : 'Close'}SquareO`];
  return (
    <Frame>
      <Icon style={{ ...toggle, opacity: children ? 1 : 0.3 }} onClick={() => setOpen(!isOpen)} />
      <Title style={style}>{name}</Title>
      <Content style={{ opacity, height: isOpen && previous === isOpen ? 'auto' : height }}>
        <a.div style={{ transform }} {...bind} children={children} />
      </Content>
    </Frame>
  );
});

// No child version of Tree, with darker text background.
const DescriptiveTree = ( ({children, name, style, defaultOpen=false}) => {
  const [isOpen, setOpen] = useState(defaultOpen);
  const previous = usePrevious(isOpen);
  const [bind, { height: viewHeight }] = useMeasure();

  const { height, opacity, transform } = useSpring({
    from: { height: 0, opacity: 0, transform: 'translate3d(20px,0,0)' },
    to: { height: isOpen ? viewHeight : 0, opacity: isOpen ? 1 : 0, transform: `translate3d(${isOpen ? 0 : 20}px,0,0)` }
  })


  const Icon = Icons[`${isOpen ? 'Minus' : 'Plus'}SquareO`];
  return(
    <Frame >
      <Icon style={{ ...toggle }} onClick={() => setOpen(!isOpen)} />
      <Title>{name}</Title>
      <Content style={{ opacity, height: isOpen && previous === isOpen ? 'auto' : height }}>
        <a.div style={{ transform }} {...bind} children={children} />
      </Content>
    </Frame>
  );
}); 

function App() {
  const props = useSpring({opacity: 1, from: {opacity: 0}});
  
  return (
    <div className="App">
      <header className="App-header">
      
          <Tree name="hello world">
            <Tree name ="start here">
              Hello! My name is Austin Kim and I am looking for Software Engineering roles. I graduated with a CS and Biology Double Major in 2017 from Macalester College in Minnesota.
              <Tree name="resume"></Tree>
            </Tree>
            <Tree name="about me">
              <Tree name="projects">
                <DescriptiveTree name="try me"/>
                <Tree name="frontend"></Tree>
                <Tree name="backend"></Tree>
                <Tree name="hobby">
                  <Tree name="music discord bot"></Tree>
                  <Tree name="M3u8 Live Broadcast Player">Under Development</Tree>

                </Tree>
              </Tree>
              <Tree name="my websites">
                <Tree name="Github"><a href="https://github.com/kimx5230">Click Here</a></Tree>
                <Tree name="LinkedIn"></Tree>
                <Tree name="Email Me"></Tree>
              </Tree>
            </Tree>
            <Tree name="about this layout">
              This layout is borrowed from a <a href="https://codesandbox.io/embed/lp80n9z7v9">react-spring</a> example. This portfolio was made to play around with react-spring.
            </Tree>
          </Tree>
        
      </header>
    </div>
  );
}

export default App;
