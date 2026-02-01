import { memo } from 'react';
import { Shipment, ShipmentStatus } from '../../types';
import styles from './ShipmentGrid.module.css';

interface ShipmentGridProps {
  shipments: Shipment[];
  onShipmentClick: (shipment: Shipment) => void;
  onSort: (field: string) => void;
  sortField: string;
  sortDirection: string;
}

function ShipmentGrid({ shipments, onShipmentClick, onSort, sortField, sortDirection }: ShipmentGridProps) {
  const renderSortIcon = (field: string) => {
    if (sortField !== field) {
      // Unsorted column - show both arrows dimmed
      return (
        <span className={styles.grid__sortIcons}>
          <span className={styles.grid__sortIcon}>↑</span>
          <span className={styles.grid__sortIcon}>↓</span>
        </span>
      );
    }
    // Sorted column - highlight active direction
    return (
      <span className={styles.grid__sortIcons}>
        <span className={`${styles.grid__sortIcon} ${sortDirection === 'ASC' ? styles['grid__sortIcon--active'] : styles['grid__sortIcon--inactive']}`}>↑</span>
        <span className={`${styles.grid__sortIcon} ${sortDirection === 'DESC' ? styles['grid__sortIcon--active'] : styles['grid__sortIcon--inactive']}`}>↓</span>
      </span>
    );
  };

  const getStatusClass = (status: ShipmentStatus) => {
    switch (status) {
      case ShipmentStatus.PENDING:
        return styles['grid__status--pending'];
      case ShipmentStatus.IN_TRANSIT:
        return styles['grid__status--in-transit'];
      case ShipmentStatus.DELIVERED:
        return styles['grid__status--delivered'];
      case ShipmentStatus.CANCELLED:
        return styles['grid__status--cancelled'];
      default:
        return '';
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    });
  };

  if (shipments.length === 0) {
    return <div className={styles.grid__empty}>No shipments found</div>;
  }

  return (
    <div className={styles.grid}>
      <table className={styles.grid__table}>
        <thead className={styles.grid__header}>
          <tr>
            <th
              className={`${styles.grid__headerCell} ${sortField === 'id' ? styles['grid__headerCell--active'] : ''}`}
              onClick={() => onSort('id')}
            >
              <span className={styles.grid__headerContent}>
                <span>ID</span>
                {renderSortIcon('id')}
              </span>
            </th>
            <th
              className={`${styles.grid__headerCell} ${sortField === 'shipperName' ? styles['grid__headerCell--active'] : ''}`}
              onClick={() => onSort('shipperName')}
            >
              <span className={styles.grid__headerContent}>
                <span>Shipper</span>
                {renderSortIcon('shipperName')}
              </span>
            </th>
            <th
              className={`${styles.grid__headerCell} ${sortField === 'carrierName' ? styles['grid__headerCell--active'] : ''}`}
              onClick={() => onSort('carrierName')}
            >
              <span className={styles.grid__headerContent}>
                <span>Carrier</span>
                {renderSortIcon('carrierName')}
              </span>
            </th>
            <th
              className={`${styles.grid__headerCell} ${sortField === 'pickupLocation' ? styles['grid__headerCell--active'] : ''}`}
              onClick={() => onSort('pickupLocation')}
            >
              <span className={styles.grid__headerContent}>
                <span>Pickup Location</span>
                {renderSortIcon('pickupLocation')}
              </span>
            </th>
            <th
              className={`${styles.grid__headerCell} ${sortField === 'deliveryLocation' ? styles['grid__headerCell--active'] : ''}`}
              onClick={() => onSort('deliveryLocation')}
            >
              <span className={styles.grid__headerContent}>
                <span>Delivery Location</span>
                {renderSortIcon('deliveryLocation')}
              </span>
            </th>
            <th
              className={`${styles.grid__headerCell} ${sortField === 'pickupDate' ? styles['grid__headerCell--active'] : ''}`}
              onClick={() => onSort('pickupDate')}
            >
              <span className={styles.grid__headerContent}>
                <span>Pickup Date</span>
                {renderSortIcon('pickupDate')}
              </span>
            </th>
            <th
              className={`${styles.grid__headerCell} ${sortField === 'deliveryDate' ? styles['grid__headerCell--active'] : ''}`}
              onClick={() => onSort('deliveryDate')}
            >
              <span className={styles.grid__headerContent}>
                <span>Delivery Date</span>
                {renderSortIcon('deliveryDate')}
              </span>
            </th>
            <th
              className={`${styles.grid__headerCell} ${sortField === 'status' ? styles['grid__headerCell--active'] : ''}`}
              onClick={() => onSort('status')}
            >
              <span className={styles.grid__headerContent}>
                <span>Status</span>
                {renderSortIcon('status')}
              </span>
            </th>
            <th
              className={`${styles.grid__headerCell} ${sortField === 'rate' ? styles['grid__headerCell--active'] : ''}`}
              onClick={() => onSort('rate')}
            >
              <span className={styles.grid__headerContent}>
                <span>Rate</span>
                {renderSortIcon('rate')}
              </span>
            </th>
            <th
              className={`${styles.grid__headerCell} ${sortField === 'trackingNumber' ? styles['grid__headerCell--active'] : ''}`}
              onClick={() => onSort('trackingNumber')}
            >
              <span className={styles.grid__headerContent}>
                <span>Tracking #</span>
                {renderSortIcon('trackingNumber')}
              </span>
            </th>
          </tr>
        </thead>
        <tbody className={styles.grid__body}>
          {shipments.map((shipment) => (
            <tr
              key={shipment.id}
              className={styles.grid__row}
              onClick={() => onShipmentClick(shipment)}
            >
              <td className={styles.grid__cell}>{shipment.id}</td>
              <td className={styles.grid__cell}>{shipment.shipperName}</td>
              <td className={styles.grid__cell}>{shipment.carrierName}</td>
              <td className={styles.grid__cell}>{shipment.pickupLocation}</td>
              <td className={styles.grid__cell}>{shipment.deliveryLocation}</td>
              <td className={styles.grid__cell}>{formatDate(shipment.pickupDate)}</td>
              <td className={styles.grid__cell}>{formatDate(shipment.deliveryDate)}</td>
              <td className={styles.grid__cell}>
                <span className={`${styles.grid__status} ${getStatusClass(shipment.status)}`}>
                  {shipment.status.replace('_', ' ')}
                </span>
              </td>
              <td className={styles.grid__cell}>
                ${shipment.rate.toLocaleString()}
              </td>
              <td className={styles.grid__cell}>{shipment.trackingNumber}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default memo(ShipmentGrid);
