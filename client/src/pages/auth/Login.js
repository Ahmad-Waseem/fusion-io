export default function LoginPage() {
    return (
      <div className="h-full w-full flex flex-col lg:flex-row">
        <div className="hidden lg:flex w-1/2 bg-gradient-to-br from-blue-600 to-purple-700 items-center justify-center text-white text-3xl font-bold">
          Welcome Back 👋
        </div>
  
        <div className="w-full lg:w-1/2 h-full flex items-center justify-center bg-white p-8">
          <div className="w-full max-w-md space-y-6">
            <h2 className="text-2xl text-center text-gray-800">Login to Your Account</h2>
            
            <form className="space-y-4">
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
                <input
                  id="email"
                  type="email"
                  className="mt-1 block w-full px-4 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="you@example.com"
                />
              </div>
  
              <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
                <input
                  id="password"
                  type="password"
                  className="mt-1 block w-full px-4 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="••••••••"
                />
              </div>
  
              <div className="flex justify-between text-sm text-gray-600">
                <label className="flex items-center">
                  <input type="checkbox" className="mr-2" />
                  Remember me
                </label>
                <a href="#" className="text-blue-500 hover:underline">Forgot password?</a>
              </div>
  
              <button
                type="submit"
                className="w-full py-2 px-4 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-md shadow-sm"
              >
                Login
              </button>
            </form>
  
            <p className="text-center text-sm text-gray-600">
              Don’t have an account?{" "}
              <a href="#" className="text-blue-500 hover:underline">
                Sign up
              </a>
            </p>
          </div>
        </div>
      </div>
    );
  }
  