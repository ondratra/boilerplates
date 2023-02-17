/** @jsxRuntime automatic */
/** @jsxImportSource react */

import { ContractExtendedInfo } from '../ContractExtendedInfo'
import { addScopedStyles } from '../hooks/scopedStyles'
import { default as stylesRaw } from './deployedContract.css?inline'

export function DeployedContract(props: ContractExtendedInfo & { index: number } & { children: React.ReactNode }) {
  const styles = addScopedStyles('DeployedContract', stylesRaw)

  return (
    <div className={styles.deployedContractContainer}>
      <b>Deployed contract #{props.index + 1}</b>
      <div>
        Contract name: {props.name} <br />
        Contract address: {props.contract.address}
      </div>

      <div className={styles.detailContainer}>{props.children}</div>
    </div>
  )
}
