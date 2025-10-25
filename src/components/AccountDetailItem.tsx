interface AccountDetailItemProps {
  label: string;
  value: string;
  isBold?: boolean;
}

const AccountDetailItem = ({ label, value, isBold = true }: AccountDetailItemProps) => {
  return (
    <div>
      <p className="text-[10px] text-muted-foreground mb-0.5">{label}</p>
      <p className={`text-sm ${isBold ? 'font-semibold' : 'font-normal'}`} style={{ color: '#000000' }}>
        {value}
      </p>
    </div>
  );
};

export default AccountDetailItem;
