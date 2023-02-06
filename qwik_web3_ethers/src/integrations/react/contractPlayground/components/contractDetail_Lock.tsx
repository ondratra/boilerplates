/** @jsxRuntime automatic */
/** @jsxImportSource react */

import { useEffect, useState } from 'react'

import { ContractExtendedInfo } from '../ContractExtendedInfo'
import { addScopedStyles } from '../hooks/scopedStyles'
import { noGasLimit } from '../utils'
import { default as stylesRaw } from './contractDetail_Lock.css?inline'

interface ContractDetailInfo_Lock {
  unlockTimestamp: number
  owner: string
  alreadyUnlocked: boolean
}

export function ContractDetail_Lock(props: { contract: ContractExtendedInfo }) {
  const [contractData, onContractDataChange] = useState<ContractDetailInfo_Lock | null>(null)
  const [withdrawErrorOccured, onWithdrawErrorOccuredChange] = useState<boolean>(false)

  const loadContractInfo = async () => {
    const currentContractData: ContractDetailInfo_Lock = {
      unlockTimestamp: (await props.contract.contract.unlockTime()).toNumber(),
      owner: await props.contract.contract.owner(),
      alreadyUnlocked: !!(await props.contract.contract.queryFilter('Withdrawal')).length,
    }

    onContractDataChange(currentContractData)
  }

  useEffect(() => {
    loadContractInfo()
  }, [])

  const onWithdrawClick = async () => {
    try {
      const transaction = await props.contract.contract.withdraw({ ...noGasLimit })
      await transaction.wait()
    } catch (e: any) {
      if (e.message.match("You can't withdraw yet")) {
        onWithdrawErrorOccuredChange(true)
      }

      return
    }

    onWithdrawErrorOccuredChange(false)
    await loadContractInfo()
  }

  const mbWithdrawButton =
    !contractData || !contractData.alreadyUnlocked ? (
      <div>
        <button
          onClick={() => {
            onWithdrawClick()
          }}
        >
          Withdraw from the Lock
        </button>
        {withdrawErrorOccured ? <div>Transaction failed: You can't withdraw yet</div> : null}
      </div>
    ) : null

  return (
    <div>
      Unlock possible at timestamp:{' '}
      {contractData ? (
        <span>
          {contractData.unlockTimestamp} (<LockWithdrawCountdown timestamp={contractData.unlockTimestamp} />)
        </span>
      ) : (
        'Loading...'
      )}
      <br />
      Owner: {contractData ? contractData.owner : 'Loading...'}
      <br />
      Is already unlocked: {contractData ? (contractData.alreadyUnlocked ? 'true' : 'false') : 'Loading...'}
      <hr />
      {mbWithdrawButton}
    </div>
  )
}

function LockWithdrawCountdown(props: { timestamp: number }) {
  const [countdown, onCountdownChange] = useState('')
  const styles = addScopedStyles('LockWithdrawCountdown', stylesRaw)

  const calculateRemainingTime = () => {
    const currentTime = new Date()
    const unlockTime = new Date(props.timestamp * 1000)

    if (currentTime > unlockTime) {
      return 'Can be unlocked now'
    }

    const remainingSeconds = Math.ceil((unlockTime.getTime() - currentTime.getTime()) / 1000)
    return 'in ' + remainingSeconds + ' sec'
  }

  useEffect(() => {
    setTimeout(() => {
      onCountdownChange(calculateRemainingTime())
    }, 1000)
  }, [countdown])

  return <span className={styles.countdown}>{countdown}</span>
}
