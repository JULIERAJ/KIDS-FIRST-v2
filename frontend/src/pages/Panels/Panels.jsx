import React from 'react';
import { useSelector } from 'react-redux';

import Co_Parent from '../../components/info/Co_Parent';
import Kids from '../../components/info/Kids';
import Parent from '../../components/info/Parent';

const Panels = () => {
  const panelStage = useSelector((state) => state.PanelStage);
  return (
    <>
      <section>
        <div className='progressbar'>
          <div
            className={
              panelStage === 1
                ? 'progress-step progress-step-active'
                : 'progress-step'
            }
            data-title='Parent'></div>
          <div
            className={
              panelStage === 2
                ? 'progress-step progress-step-active'
                : 'progress-step'
            }
            data-title='Co_Parent'></div>
          <div
            className={
              panelStage === 3
                ? 'progress-step progress-step-active'
                : 'progress-step'
            }
            data-title='Kids'></div>
        </div>

        <div className='page-wrapper'>
          {panelStage === 1 && (
            // parent Page
            <div className='wrap'>
              <Parent
                pageTitle={'Parent Info:'} // Panel title
                submitButtonText={'Next'} // submit next button display text
                previousButton={false} // show/hide previous button
              />
            </div>
          )}

          {panelStage === 2 && (
            // Co-Parent Page
            <div className='wrap'>
              <Co_Parent
                pageTitle={'Co_Parent Info:'} // Panel title
                submitButtonText={'Next'} // submit next button display text
                previousButton={true} // show/hide previous button
              />
            </div>
          )}

          {panelStage === 3 && (
            // Kids Page
            <div className='wrap'>
              <Kids
                pageTitle={'Kids Info:'} //  Panel title
                submitButtonText={'Submit'} // submit next button display text
                previousButton={true} // show/hide previous button
              />
            </div>
          )}
        </div>
      </section>
    </>
  );
};

export default Panels;
