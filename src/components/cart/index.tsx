import {
  SyntheticEvent,
  createRef,
  useEffect,
  useRef,
  useState,
} from "react";
import { CartType } from "../../graphql/cart";
import CartItem from "./item";
import { useSetRecoilState } from "recoil";
import { checkedCartState } from "../../recoils/cart";
import WillPay from "./willPay";

const CartList = ({ items }: { items: CartType[] }) => {
  const setCheckedCartDta = useSetRecoilState(
    checkedCartState
  );
  const formRef = useRef<HTMLFormElement>(null);
  const checkboxRefs = items.map(() =>
    createRef<HTMLInputElement>()
  );
  const [formData, setFormData] = useState<FormData>(null);

  const handleCheckboxChanged = (e: SyntheticEvent) => {
    if (!formRef.current) return;
    const targetInput = e.target as HTMLInputElement;
    const data = new FormData(formRef.current);
    const selectedCount = data.getAll("select-item").length;

    if (targetInput.classList.contains("select-all")) {
      // select-all 선택시
      const allChecked = targetInput.checked;
      checkboxRefs.forEach((inputElem) => {
        inputElem.current!.checked = allChecked;
      });
    } else {
      // 개별 아이템 선택시
      const allChecked = selectedCount === items.length;
      formRef.current.querySelector<HTMLInputElement>(
        ".select-all"
      )!.checked = allChecked;
    }
  };

  useEffect(() => {
    const checkedItems = checkboxRefs.reduce<CartType[]>(
      (res, ref, i) => {
        if (ref.current!.checked) res.push(items[i]);
        return res;
      },
      []
    );
    setCheckedCartDta(checkedItems);
  }, [items, formData]);

  return (
    <div>
      <form ref={formRef} onChange={handleCheckboxChanged}>
        <label>
          <input
            className="select-all"
            name="select-all"
            type="checkbox"
          />
          전체선택
        </label>
        <ul className="cart">
          {items.map((item, i) => (
            <CartItem
              {...item}
              key={item.id}
              ref={checkboxRefs[i]}
            />
          ))}
        </ul>
      </form>
      <WillPay />
    </div>
  );
};

export default CartList;
