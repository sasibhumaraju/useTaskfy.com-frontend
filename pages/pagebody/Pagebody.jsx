import { Filter, Icon, Icons, Navbar } from '../../components';
import { ButtonType, Constants, IconSizes, NavType } from '../../strings/constants';
import Style from './pagebody.module.css';

function  Pagebody({
      pageNavs1, 
      pageNavs2, 
      intialActiveIndex1=0, 
      intialActiveIndex2=0, 
      filtersList, 
      selectedFiltersList, 
      setSelectedFiltersList, 
      children, 
      pageBodyContentVerticalPadding="17px", 
      pageBodyContentHorizontalPadding="0px",
      loadingElement1,
      loadingElement2
    }) {
  
  return (
      <div className={Style.pagebody}>
        <div className={Style.pagebodyHeader}>

          { pageNavs1 && <div className={Style.pagebodyNav}>
              <Navbar direction={Constants.HORIZONTAL} type={NavType.NAV} buttonType={ButtonType.LIGHT} links={pageNavs1} intialActiveIndex={intialActiveIndex1} />  
          </div>}
          { !pageNavs1 && loadingElement1}

          { pageNavs2 && <div className={Style.pagebodyActionButtons}>
              <Navbar direction={Constants.HORIZONTAL} type={NavType.NAV} bordered={true} buttonType={ButtonType.LIGHT} links={pageNavs2} intialActiveIndex={intialActiveIndex2}/>         
          </div>}
          { !pageNavs2 && loadingElement2}

          {filtersList && <Filter filters={filtersList} selectedFilter={selectedFiltersList} setSelectedFilter={setSelectedFiltersList} />}

        </div>

        <div className={Style.pagebodyContent} style={{padding: `${pageBodyContentVerticalPadding} ${pageBodyContentHorizontalPadding}`}}>
          {children}
        </div>

      </div>
  )
}

export default Pagebody