const Loader = () => {
  return (
    <>
      <div className='terminalLoader h-[110px]'>
        <div className='terminalLoader-header'>
          <div className='buttons'>
            <span className='close' />
            <span className='minimize' />
            <span className='maximize' />
          </div>
          <div className='title'>Status</div>
        </div>
        <div className='terminalLoader-body'>
          <div className='terminalLoader-loader'>
            <span className='loader-text'>Loading</span>
            <span id='dot1' className='dot'>
              .
            </span>
            <span id='dot2' className='dot'>
              .
            </span>
            <span id='dot3' className='dot'>
              .
            </span>
          </div>
        </div>
      </div>
    </>
  );
};

export default Loader;
