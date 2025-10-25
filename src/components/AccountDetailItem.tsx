interface AccountDetailItemProps {
  label: string;
  value: string;
  isBold?: boolean;
}

const AccountDetailItem = ({ label, value, isBold = true }: AccountDetailItemProps) => {
  return (
    <div>
      <p className="text-xs text-muted-foreground mb-1">{label}</p>
      <p className={`text-base text-foreground ${isBold ? 'font-semibold' : 'font-normal'}`}>
        {value}
      </p>
    </div>
  );
};

export default AccountDetailItem;
