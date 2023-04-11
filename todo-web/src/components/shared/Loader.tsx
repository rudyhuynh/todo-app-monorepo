import "./Loader.css";

type LoaderPropsType = { loading: boolean };

export const Loader = ({ loading }: LoaderPropsType) => {
  return loading ? (
    <div className="progress">
      <div className="indeterminate"></div>
    </div>
  ) : null;
};
