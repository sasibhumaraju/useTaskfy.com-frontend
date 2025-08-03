import { Filter, Icon, Icons, Navbar } from '../../components';
import { ButtonType, Constants, IconSizes, NavType } from '../../strings/constants';
import Style from './pagebody.module.css';

function Pagebody({pageNavs, paramClicks, intialActiveParamIndex=0, filters, selectedFilter, setSelectedFilter, children }) {
  
  return (
    <div className={Style.pagebody}>
        <div className={Style.pagebodyHeader}>
          { pageNavs && <div className={Style.pagebodyNav}>
                    <Navbar direction={Constants.HORIZONTAL} type={NavType.NAV} buttonType={ButtonType.LIGHT} links={pageNavs} >                      
                </Navbar>
                </div> }
        
          { paramClicks && <div className={Style.pagebodyActionButtons}>
               <Navbar direction={Constants.HORIZONTAL} type={NavType.NAV} bordered={true} buttonType={ButtonType.LIGHT} links={paramClicks} intialActiveIndex={intialActiveParamIndex}>                      
                </Navbar>
            </div>}

         {filters && <Filter filters={filters} selectedFilter={selectedFilter} setSelectedFilter={setSelectedFilter} />}
        </div>

        <div className={Style.pagebodyContent}>
          {children}
        </div>
    </div>
     
  )
}

export default Pagebody