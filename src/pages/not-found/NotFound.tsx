import TopBar from "../../components/TopBar";
import PageWrapper from "../../components/shared/PageWrapper";

const NotFoundPage = () => {
  return (
    <PageWrapper header={"Not found"} title="Sorry, this is awkward 😕.">
      <div className="mb-8 max-w-sm bg-white p-4 text-gray-900">
        404, Sorry, but the page you are looking for does not exists. Please,
        make sure the link is not broken. If you copied it from an external
        source please make sure it is correct. If you are not sure why this is
        happening you can contact us by following{" "}
        <a href="" className="text-blue-500">
          this
        </a>{" "}
        link.
      </div>
    </PageWrapper>
  );
};

export default NotFoundPage;
