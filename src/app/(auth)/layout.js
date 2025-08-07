import hero from "@/assets/images/auth-hero.png";
import bg from "@/assets/images/auth-bg.png";
import Image from "next/image";

function AuthLayout({ children }) {
  return (
    <section className="flex justify-center py-20 max-w-screen mx-auto px-10">
      <Image
        src={bg}
        alt=""
        height={2000}
        width={2000}
        className="h-full w-full fixed top-0 left-0 right-0 -z-1 opacity-50 object-cover"
      />
      <div className="fixed top-0 left-0 bottom-0 right-0 z-10 bg-white opacity-10 dark:bg-slate-950 dark:opacity-40"></div>
      <div className="relative z-20 grid grid-cols-1 md:grid-cols-2 w-full lg:w-2/3 xl:w-3/5 shadow-md rounded-xl bg-white shadow-blue-100 dark:shadow-slate-700 min-h-[70vh] dark:bg-slate-800">
        <div className="py-12 px-10">{children}</div>
        <Image
          src={hero}
          alt=""
          height={1200}
          width={1200}
          className="h-full object-cover w-auto rounded-r-xl hidden md:block"
        />
      </div>
    </section>
  );
}

export default AuthLayout;
